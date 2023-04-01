import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { archivedState, backlogState, completedState, pausedState, startedState } from '../shared/constants/goal-states';
import { ToastrMessagesService } from '../shared/utils/services/toastr-messages.service';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { GoalTaskModel, goalTypes } from './models/goal-model';
import { ActiveGoalService } from './services/logic-handlers/active-goal.service';
import { CaptureGoalService } from './services/logic-handlers/capture-goal.service';
import { GoalCommentService } from './services/logic-handlers/goal-comment.service';
import { GoalManagementService } from './services/api/goal-management.service';
import { GoalValidationHandlerService } from './services/validations/goal-validation-handler.service';
import { maxCustomToastrTimeout, maxPauseCount, maxToastrTimeout } from '../shared/constants/goal-boundaries';
import { getCompletedTasks, getPastTenseFromGoalState, getPresentTenseFromGoalState, getRandomCustomPauseMessage, getRandomCustomSuccessMessage } from './services/helpers/goal-service.helpers';

@Component({
  selector: 'app-goal-management',
  templateUrl: './goal-management.component.html',
  styleUrls: ['./goal-management.component.css'],
})
export class GoalManagementComponent implements OnInit, OnDestroy {
  modalRef: MdbModalRef<ViewSelectedGoalComponent> | null = null;
  goalStates = {
    backlog: backlogState,
    started: startedState,
    paused: pausedState,
    completed: completedState,
    archived: archivedState
  }

  constructor(
    private goalService: GoalManagementService,
    private activeGoalPopupService: ActiveGoalService,
    private captureGoalService: CaptureGoalService,
    private goalCommentService: GoalCommentService,
    private toastrMessageService: ToastrMessagesService,
    private goalValidationsService: GoalValidationHandlerService
  ) { }

  ngOnInit(): void { }

  onDropGoal = (event: CdkDragDrop<Array<any>>): void => {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    else {
      const previousContainerLinks: Array<string> =
        event.previousContainer.connectedTo.toString().split(',');

      // Checking if the current card is movable to the target container
      if (previousContainerLinks.includes(event.container.id)) {
        // Handling Goal Activity Logic
        switch (event.container.id) {
          case archivedState:
            const userCommentSubscription: Subscription = this.goalCommentService.onCapturedUserComment(archivedState)
              .subscribe((userComment: string | null) => {
                // Unsubscribing from the observer listener to avoid mulitple emits
                userCommentSubscription.unsubscribe();

                if (userComment) {
                  if (event.previousContainer.data[event.previousIndex].goalStatus === startedState) {
                    // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
                    this.activeGoalPopupService.deactivateCurrentActiveGoal();
                  }

                  // Set the user comment for archiving a goal!
                  event.previousContainer.data[event.previousIndex].comment.push({
                    comment: userComment,
                    commentType: archivedState,
                    goalId: event.previousContainer.data[event.previousIndex].id
                  })

                  // Changing the goal metadata
                  event.previousContainer.data[event.previousIndex].goalStatus = archivedState;
                  event.previousContainer.data[event.previousIndex].pausedCount = 0;
                  event.previousContainer.data[event.previousIndex].timeRemaining = event.previousContainer.data[event.previousIndex].duration;
                  event.previousContainer.data[event.previousIndex]?.tasks?.forEach((element: GoalTaskModel) => {
                    element.complete = false;
                  });

                  // Updating goal changes in the database
                  this.updateGoalChanges(event)
                }
              })
            break;
          case pausedState:
            // If the [pauseLimit] has been reached!
            if (parseInt(event.previousContainer.data[event.previousIndex].pausedCount) > 0
              && parseInt(event.previousContainer.data[event.previousIndex].pausedCount) % maxPauseCount === 0) {
              const userCommentSubscription: Subscription = this.goalCommentService.onCapturedUserComment(pausedState)
                .subscribe((userComment: string | null) => {
                  // Unsubscribing from the observer listener to avoid mulitple emits
                  userCommentSubscription.unsubscribe();

                  if (userComment) {
                    // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
                    this.activeGoalPopupService.deactivateCurrentActiveGoal();

                    event.previousContainer.data[event.previousIndex].comment.push({
                      comment: userComment,
                      commentType: pausedState,
                      goalId: event.previousContainer.data[event.previousIndex].id
                    })

                    // Changing the goal state
                    event.previousContainer.data[event.previousIndex].goalStatus = pausedState;

                    // Incrementing the [pauseCount]
                    event.previousContainer.data[event.previousIndex].pausedCount += 1;

                    // Updating goal changes in the database
                    this.updateGoalChanges(event)

                    this.toastrMessageService.showInfoMessage(
                      "Encouragement",
                      getRandomCustomPauseMessage(),
                      maxCustomToastrTimeout)
                  }
                })
            } else {
              // Deactivate the active session of the currently running goal!!
              this.activeGoalPopupService.deactivateCurrentActiveGoal();

              // Changing the goal state
              event.previousContainer.data[event.previousIndex].goalStatus = pausedState;

              // Incrementing the [pauseCount]
              event.previousContainer.data[event.previousIndex].pausedCount += 1;

              // Updating goal changes in the database
              this.updateGoalChanges(event)

              this.toastrMessageService.showInfoMessage(
                "Encouragement",
                getRandomCustomPauseMessage(),
                maxCustomToastrTimeout)
            }
            break;
          case startedState:
            // Guard condition
            if (!this.goalValidationsService.canGoalBeStarted(this.getGoalTypeObjectList().started)) return;

            // Changing the goal state
            event.previousContainer.data[event.previousIndex].goalStatus = startedState;

            // Starting the [Active Goal Popup] window
            this.activeGoalPopupService.activateGoalCountDown(
              event.previousContainer.data[event.previousIndex]
            );

            // Updating goal changes in the database
            this.updateGoalChanges(event)
            break;
          case completedState:
            if (event.previousContainer.data[event.previousIndex]?.tasks
              && event.previousContainer.data[event.previousIndex]?.tasks?.length > 0) {
              if (!this.goalValidationsService.canCompleteGoal(
                getCompletedTasks(event.previousContainer.data[event.previousIndex]?.tasks),
                event.previousContainer.data[event.previousIndex]?.tasks
              )) return;
            }

            // If a user decides to archive a goal directly, [Stop the countdown window]
            this.activeGoalPopupService.deactivateCurrentActiveGoal();

            // Change Goal State
            event.previousContainer.data[event.previousIndex].goalStatus = completedState;

            // Updating goal changes in the database
            this.updateGoalChanges(event)

            // Show an encouraging message
            this.toastrMessageService.showSuccessMessage(
              "Congradulations",
              getRandomCustomSuccessMessage(),
              maxCustomToastrTimeout
            )
            break;
          case backlogState:
            // Change Goal State
            event.previousContainer.data[event.previousIndex].goalStatus = backlogState;

            // Updating goal changes in the database
            this.updateGoalChanges(event)
            break;
        }
      }
      else {
        this.toastrMessageService.showErrorMessage(
          "Change Goal State",
          `Invalid goal operation! You cannot ${getPresentTenseFromGoalState(event.container.id)} a goal that is ${getPastTenseFromGoalState(event.previousContainer.id)}`,
          maxToastrTimeout
        )
      }
    }
  };

  updateGoalChanges(event: CdkDragDrop<any[], any[], any>) {
    this.goalService.updateGoal(event.previousContainer.data[event.previousIndex])
      .subscribe((response: any) => {
        console.log(response);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      })
  }

  isPopupOpen(containerId: string): boolean {
    return containerId === startedState;
  }

  addNewGoal() {
    this.captureGoalService.openCaptureGoalDialog();
  }

  ngOnDestroy(): void {
    if (this.activeGoalPopupService.getActiveGoalObject())
      this.goalService.updateGoal(this.activeGoalPopupService.getActiveGoalObject())
  }

  getGoalTypeObjectList(): goalTypes {
    return this.goalService.getGoalTypeObjectList();
  }
}

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { archivedState, backlogState, completedState, pausedState, startedState } from '../shared/constants/goal-states';
import { ToastrMessagesService } from '../shared/utils/toastr-messages.service';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel, goalTypes } from './models/goal-model';
import { ActiveGoalService } from './services/active-goal.service';
import { CaptureGoalService } from './services/capture-goal.service';
import { GoalCommentService } from './services/goal-comment.service';
import { GoalManagementService } from './services/goal-management.service';

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
    private toastrMessage: ToastrMessagesService
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
            const onCommentResponse: Subscription = this.goalCommentService.openCommentDialog(archivedState)
              .subscribe((userComment: string | null) => {
                // Unsubscribing from the observer listener to avoid mulitple emits
                onCommentResponse.unsubscribe();

                if (userComment) {
                  // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
                  this.activeGoalPopupService.deactivateGoal();

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
                  event.previousContainer.data[event.previousIndex]?.tasks?.forEach((element: any) => {
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
              && parseInt(event.previousContainer.data[event.previousIndex].pausedCount) % 3 === 0) {
              const onCommentResponse: Subscription = this.goalCommentService.openCommentDialog(pausedState)
                .subscribe((userComment: string | null) => {
                  // Unsubscribing from the observer listener to avoid mulitple emits
                  onCommentResponse.unsubscribe();

                  if (userComment) {
                    // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
                    this.activeGoalPopupService.deactivateGoal();

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
                  }
                })
            } else {
              // Deactivate the active session of the currently running goal!!
              this.activeGoalPopupService.deactivateGoal();

              // Changing the goal state
              event.previousContainer.data[event.previousIndex].goalStatus = pausedState;

              // Incrementing the [pauseCount]
              event.previousContainer.data[event.previousIndex].pausedCount += 1;

              // Updating goal changes in the database
              this.updateGoalChanges(event)
            }
            break;
          case startedState:
            if (event.container.data.length > 0) {
              this.toastrMessage.showErrorMessage(
                'Starting a Goal',
                `${event.container.data[0].title} is still running`
              );
              return;
            }

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
            // If a user decides to archive a goal directly, [Stop the countdown window]
            this.activeGoalPopupService.deactivateGoal();

            // Change Goal State
            event.previousContainer.data[event.previousIndex].goalStatus = completedState;

            // Updating goal changes in the database
            this.updateGoalChanges(event)
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
        this.toastrMessage.showErrorMessage("Change Goal State", "Invalid goal status change!")
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
    this.captureGoalService.openCaptureGoal();
  }

  ngOnDestroy(): void {
    if (this.activeGoalPopupService.getActiveGoalObject())
      this.goalService.updateGoal(this.activeGoalPopupService.getActiveGoalObject())
  }

  getGoalTypeObjectList(): goalTypes {
    return this.goalService.getGoalTypeObjectList();
  }
}

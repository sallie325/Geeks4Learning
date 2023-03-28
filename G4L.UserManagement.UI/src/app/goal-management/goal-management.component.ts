import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { archivedState, backlogState, completedState, pausedState, startedState } from '../shared/constants/goal-states';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel } from './models/goal-model';
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

  // Why is this here?
  selectedGoal!: GoalModel;

  _backlog: Array<GoalModel> = [];
  _paused: Array<GoalModel> = [];
  _archived: Array<GoalModel> = [];
  _started: Array<GoalModel> = [];
  _completed: Array<GoalModel> = [];

  constructor(
    private goalService: GoalManagementService,
    private activeGoalPopupService: ActiveGoalService,
    private captureGoalService: CaptureGoalService,
    private goalCommentService: GoalCommentService
  ) { }

  ngOnDestroy(): void {
    if (this.activeGoalPopupService.getActiveGoalObject())
      this.goalService.updateGoal(this.activeGoalPopupService.getActiveGoalObject())
  }

  ngOnInit(): void {
    this.goalService.onGoalEmit().subscribe((goal: GoalModel) => {
      switch (goal.goalStatus) {
        case backlogState:
          this._backlog.push(goal);
          break;
        case archivedState:
          this._archived.push(goal);
          break;
        case completedState:
          this._completed.push(goal);
          break;
        case pausedState:
          this._paused.push(goal);
          break;
        case startedState:
          // Restore goal session
          if (this._started.length == 0) {
            // Checking if user has a past session
            if (sessionStorage.getItem('activeGoalSession')) {
              const lastActiveGoalSession = JSON.parse(sessionStorage.getItem('activeGoalSession')!)
              if (goal.id === lastActiveGoalSession.id) goal.timeRemaining = lastActiveGoalSession.timeLeft;
            }
            this._started.push(goal);
            this.activeGoalPopupService.activateGoalCountDown(this._started[0])
          }
          break;
      }
    });
  }

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
            const onCommentResponse: Subscription = this.goalCommentService.openCommentDialog(event.previousContainer.data[event.previousIndex])
              .subscribe((userComment: string | null) => {
                console.log("Archive")
                // Clearing the stream listener to avoid mulitple emits
                onCommentResponse.unsubscribe();

                if (userComment) {
                  // Set the user comment for archiving a goal!
                  event.previousContainer.data[event.previousIndex].comment = userComment;

                  // Changing the goal state
                  event.previousContainer.data[event.previousIndex].goalStatus = archivedState;
                  event.previousContainer.data[event.previousIndex].pausedCount = 0;
                  event.previousContainer.data[event.previousIndex].timeRemaining = event.previousContainer.data[event.previousIndex].duration;
                  event.previousContainer.data[event.previousIndex]?.tasks?.forEach((element: any) => {
                    element.complete = false;
                  });


                  // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
                  this.activeGoalPopupService.deactivateGoal();

                  // Updating goal changes in the database
                  this.updateGoalChanges(event)
                }
              })
            break;
          case pausedState:
            if (
              +(event.previousContainer.data[event.previousIndex].pausedCount) % 3 === 0
            ) {
              const onCommentResponse: Subscription = this.goalCommentService.openCommentDialog(event.previousContainer.data[event.previousIndex])
                .subscribe((userComment: string | null) => {
                  // Clearing the stream listener to avoid mulitple emits
                  onCommentResponse.unsubscribe();

                  if (userComment) {
                    event.previousContainer.data[event.previousIndex].comment.push({
                      comment: userComment,
                      commentType: pausedState,
                      goalId: event.previousContainer.data[event.previousIndex].id
                    })

                    // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
                    this.activeGoalPopupService.deactivateGoal();

                    // Changing the goal state
                    event.previousContainer.data[event.previousIndex].goalStatus = pausedState;

                    // Incrementing the [pauseCount]
                    event.previousContainer.data[event.previousIndex].pausedCount += 1;

                    // Updating goal changes in the database
                    this.updateGoalChanges(event)
                  }
                })
              return;
            }

            // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
            this.activeGoalPopupService.deactivateGoal();

            // Changing the goal state
            event.previousContainer.data[event.previousIndex].goalStatus = pausedState;

            // Incrementing the [pauseCount]
            event.previousContainer.data[event.previousIndex].pausedCount += 1;

            // Updating goal changes in the database
            this.updateGoalChanges(event)
            break;
          case startedState:
            if (event.container.data.length > 0) {
              this.goalService.showErrorMessage(
                'Starting a Goal',
                `${event.container.data[0].title
                } is still active!`
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
    }
  };

  updateGoalChanges(event: CdkDragDrop<any[], any[], any>) {
    console.log(event.previousContainer.data[event.previousIndex])
    this.goalService.updateGoal(event.previousContainer.data[event.previousIndex])
      .subscribe((response: any) => {
        // console.log(response);
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
}

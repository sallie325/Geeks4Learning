import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel, goalStatus } from './models/goal-model';
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
  MAX_PAUSE_COUNT: number = 3;
  modalRef: MdbModalRef<ViewSelectedGoalComponent> | null = null;

  // Goal states
  backlogState: goalStatus = 'backlog';
  startedState: goalStatus = 'started';
  pausedState: goalStatus = 'paused';
  completedState: goalStatus = 'completed';
  archivedState: goalStatus = 'archived';

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
        case 'backlog':
          this._backlog.push(goal);
          break;
        case 'archived':
          this._archived.push(goal);
          break;
        case 'completed':
          this._completed.push(goal);
          break;
        case 'paused':
          this._paused.push(goal);
          break;
        case 'started':
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
          case this.archivedState:
            const onCommentResponse: Subscription = this.goalCommentService.openCommentDialog(event.previousContainer.data[event.previousIndex])
              .subscribe((userComment: string | null) => {
                // Clearing the stream listener to avoid mulitple emits
                onCommentResponse.unsubscribe();

                if (userComment) {
                  // Set the user comment for archiving a goal!
                  event.previousContainer.data[event.previousIndex].comment = userComment;

                  // Changing the goal state
                  event.previousContainer.data[event.previousIndex].goalStatus = this.archivedState;
                  event.previousContainer.data[event.previousIndex].pauseCount = 0;
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
          case this.pausedState:
            if (
              event.previousContainer.data[event.previousIndex].pausedCount ===
              this.MAX_PAUSE_COUNT
            ) {
              this.goalService.showErrorMessage(
                'Pause Limit Exceeded',
                `${event.previousContainer.data[event.previousIndex].title
                } has exceeded its pause limit, and can no longer be paused further!`
              );
              return;
            }

            // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
            this.activeGoalPopupService.deactivateGoal();

            // Changing the goal state
            event.previousContainer.data[event.previousIndex].goalStatus = this.pausedState;

            // Incrementing the [pauseCount]
            event.previousContainer.data[event.previousIndex].pausedCount += 1;

            // Updating goal changes in the database
            this.updateGoalChanges(event)
            break;
          case this.startedState:
            if (event.container.data.length > 0) {
              this.goalService.showErrorMessage(
                'Starting a Goal',
                `${event.container.data[0].title
                } is still active!`
              );
              return;
            }

            // Changing the goal state
            event.previousContainer.data[event.previousIndex].goalStatus = this.startedState;

            // Starting the [Active Goal Popup] window
            this.activeGoalPopupService.activateGoalCountDown(
              event.previousContainer.data[event.previousIndex]
            );

            // Updating goal changes in the database
            this.updateGoalChanges(event)
            break;
          case this.completedState:
            // If a user decides to archive a goal directly, [Stop the countdown window]
            this.activeGoalPopupService.deactivateGoal();

            // Change Goal State
            event.previousContainer.data[event.previousIndex].goalStatus = this.completedState;

            // Updating goal changes in the database
            this.updateGoalChanges(event)
            break;
          case this.backlogState:
            // Change Goal State
            event.previousContainer.data[event.previousIndex].goalStatus = this.backlogState;

            // Updating goal changes in the database
            this.updateGoalChanges(event)
            break;
        }
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
    return containerId === this.startedState;
  }

  addNewGoal() {
    this.captureGoalService.openCaptureGoal();
  }
}

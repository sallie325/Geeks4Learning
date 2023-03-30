import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { encouragingWords } from 'src/app/shared/constants/encouragement';
import { archivedState, pausedState } from 'src/app/shared/constants/goal-states';
import { getTimeFormattedString } from 'src/app/shared/utils/timeFormatting';
import { ToastrMessagesService } from 'src/app/shared/utils/toastr-messages.service';
import { AddExtraGoalTimeComponent } from '../../modals/add-extra-goal-time/add-extra-goal-time.component';
import { ViewSelectedGoalComponent } from '../../modals/views/view-selected-goal/view-selected-goal.component';
import { goalButtonAction, GoalModel, goalTypes, goalStatus } from '../../models/goal-model';
import { GoalManagementService } from '../data/goal-management.service';
import { ActiveGoalService } from './active-goal.service';
import { GoalCommentService } from './goal-comment.service';

@Injectable({
  providedIn: 'root'
})
export class GoalButtonActionService {
  private viewGoalModalRef!: MdbModalRef<ViewSelectedGoalComponent>;
  private extraTimeModalRef!: MdbModalRef<AddExtraGoalTimeComponent>
  private goalProgress: number = 0;

  constructor(
    private goalManagementService: GoalManagementService,
    private toastrMessages: ToastrMessagesService,
    private activeGoalService: ActiveGoalService,
    private goalCommentService: GoalCommentService,
    private modalService: MdbModalService
  ) { }

  public performButtonAction(actionType: goalButtonAction, goal: GoalModel, modalRef: MdbModalRef<ViewSelectedGoalComponent>) {
    this.setViewGoalModalRef(modalRef);

    switch (actionType) {
      case "start":
        this.startGoal(goal)
        break;
      case "pause":
        this.pauseGoal(goal)
        break;
      case "complete":
        this.completeGoal(goal)
        break;
      case "archive":
        this.archiveGoal(goal)
        break;
      case "restore":
        this.restoreGoal(goal)
        break;
      case "resume":
        this.resumeGoal(goal)
        break;
    }
  }

  private setViewGoalModalRef(modalRef: MdbModalRef<ViewSelectedGoalComponent>): void {
    this.viewGoalModalRef = modalRef;
  }

  private getViewGoalModalRef(): MdbModalRef<ViewSelectedGoalComponent> {
    return this.viewGoalModalRef;
  }

  private closeViewGoalModal(): void {
    this.getViewGoalModalRef().close();
  }

  private getGoalTypeObjectList(): goalTypes {
    return this.goalManagementService.getGoalTypeObjectList();
  }

  private startGoal(goal: GoalModel): void {
    // Guard condition
    if (this.getGoalTypeObjectList().started.length > 0) {
      this.toastrMessages.showInfoMessage('Starting a Goal', `${this.getGoalTypeObjectList().started[0].title} is still running`);
      return;
    }

    // Proceed starting the goal
    if (goal.goalStatus === "backlog") {
      goal.goalStatus = "started"

      this.goalManagementService.updateGoal(goal)
        .subscribe((response: GoalModel) => {
          console.log(response)

          // Get backlog index
          const index = this.getGoalTypeObjectList().backlog.findIndex(goalObj => goalObj.id === goal.id);

          // Add goal in the started list
          this.getGoalTypeObjectList().started.push(this.getGoalTypeObjectList().backlog[index])

          // Remove the goal from the previous backlog list
          this.getGoalTypeObjectList().backlog.splice(index, 1);

          // Start the newly created goal in the started list
          this.activeGoalService.activateGoalCountDown(this.getGoalTypeObjectList().started[this.getGoalTypeObjectList().started.length - 1]);

          // Close the modal
          this.closeViewGoalModal();
        })
    }
    else if (goal.goalStatus === "archived") {
      goal.goalStatus = "started"

      this.goalManagementService.updateGoal(goal)
        .subscribe((response: GoalModel) => {
          console.log(response)

          // Get backlog index
          const index = this.getGoalTypeObjectList().archived.findIndex(goalObj => goalObj.id === goal.id);

          // Add goal in the started list
          this.getGoalTypeObjectList().started.push(this.getGoalTypeObjectList().archived[index])

          // Remove the goal from the previous backlog list
          this.getGoalTypeObjectList().archived.splice(index, 1);

          // Start the newly created goal in the started list
          this.activeGoalService.activateGoalCountDown(this.getGoalTypeObjectList().started[this.getGoalTypeObjectList().started.length - 1]);

          // Close the modal
          this.closeViewGoalModal();
        })
    }
  }

  private pauseGoalDBUpdate(goal: GoalModel) {
    // Changing the goal state
    goal.goalStatus = pausedState;

    // Incrementing the [pauseCount]
    goal.pausedCount += 1;

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        // Get backlog index
        const index = this.getGoalTypeObjectList().started.findIndex(goalObj => goalObj.id === goal.id);

        // Add goal in the started list
        this.getGoalTypeObjectList().paused.push(this.getGoalTypeObjectList().started[index])

        // Remove the goal from the previous backlog list
        this.getGoalTypeObjectList().started.splice(index, 1);

        this.activeGoalService.deactivateCurrentActiveGoal();
      })
  }

  private archiveGoalDBUpdate(goal: GoalModel) {
    // Store the previous status for use later
    const previousGoalContainer: goalStatus = goal.goalStatus;

    // Change the goal status 
    goal.goalStatus = archivedState;

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)
        let index: number

        switch (previousGoalContainer) {
          case "backlog":
            // Get backlog index
            index = this.getGoalTypeObjectList().backlog.findIndex(goalObj => goalObj.id === goal.id);

            // Add goal in the started list
            this.getGoalTypeObjectList().archived.push(this.getGoalTypeObjectList().backlog[index])

            // Remove the goal from the previous backlog list
            this.getGoalTypeObjectList().backlog.splice(index, 1);
            break;
          case "started":
            // Get backlog index
            index = this.getGoalTypeObjectList().started.findIndex(goalObj => goalObj.id === goal.id);

            // Add goal in the started list
            this.getGoalTypeObjectList().archived.push(this.getGoalTypeObjectList().started[index])

            // Remove the goal from the previous backlog list
            this.getGoalTypeObjectList().started.splice(index, 1);

            this.activeGoalService.deactivateCurrentActiveGoal();
            break;
          case "paused":
            // Get backlog index
            index = this.getGoalTypeObjectList().paused.findIndex(goalObj => goalObj.id === goal.id);

            // Add goal in the started list
            this.getGoalTypeObjectList().archived.push(this.getGoalTypeObjectList().paused[index])

            // Remove the goal from the previous backlog list
            this.getGoalTypeObjectList().paused.splice(index, 1);
            break;
        }

        this.closeViewGoalModal();

        if (goal.archiveCount % 3 === 0)
          this.toastrMessages.showInfoMessage("Archive Goal", "Your trainer has been notified due to your frequent archiving of your goal");
      })
  }

  private pauseGoal(goal: GoalModel) {
    if (goal.pausedCount > 0 && goal.pausedCount % 3 === 0) {
      // Open the comment dialog
      const onCommentResponse: Subscription = this.goalCommentService.openCommentDialog(pausedState)
        .subscribe((userComment: string | null) => {
          // Unsubscribing from the observer listener to avoid mulitple emits
          onCommentResponse.unsubscribe();

          if (userComment) {
            // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
            this.activeGoalService.deactivateCurrentActiveGoal();

            goal?.comment?.push({
              comment: userComment,
              commentType: "paused",
              goalId: goal.id
            })

            this.pauseGoalDBUpdate(goal);
          }
          // Close the modal
          this.closeViewGoalModal();
        })
    }
    else {
      this.pauseGoalDBUpdate(goal);
      // Close the modal
      this.closeViewGoalModal();
    }
  }

  private archiveGoal(goal: GoalModel) {
    const onCommentResponse: Subscription = this.goalCommentService.openCommentDialog(archivedState)
      .subscribe((userComment: string | null) => {
        // Unsubscribing from the observer listener to avoid mulitple emits
        onCommentResponse.unsubscribe();

        if (userComment) {
          // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
          this.activeGoalService.deactivateCurrentActiveGoal();

          // Set the user comment for archiving a goal!
          goal?.comment?.push({
            comment: userComment,
            commentType: "archived",
            goalId: goal.id
          })

          // Changing the goal metadata
          goal.pausedCount = 0;
          goal.archiveCount += 1;
          goal.timeRemaining = goal.duration;
          goal?.tasks?.forEach((element: any) => {
            element.complete = false;
          });

          // Updating goal changes in the database
          this.archiveGoalDBUpdate(goal)
        }
      })
  }

  private resumeGoal(goal: GoalModel) {
    // Guard condition
    if (this.getGoalTypeObjectList().started.length > 0) {
      this.toastrMessages.showInfoMessage('Starting a Goal', `${this.getGoalTypeObjectList().started[0].title} is still running`);
      return;
    }

    // Change goal status
    goal.goalStatus = "started"

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        // Get backlog index
        const index = this.getGoalTypeObjectList().paused.findIndex(goalObj => goalObj.id === goal.id);

        // Add goal in the started list
        this.getGoalTypeObjectList().started.push(this.getGoalTypeObjectList().paused[index])

        // Remove the goal from the previous backlog list
        this.getGoalTypeObjectList().paused.splice(index, 1);

        // Start the newly created goal in the started list
        this.activeGoalService.activateGoalCountDown(this.getGoalTypeObjectList().started[this.getGoalTypeObjectList().started.length - 1]);

        this.closeViewGoalModal();
      })
  }

  private completeGoal(goal: GoalModel) {
    if (goal?.tasks && goal?.tasks?.length > 0) {
      const completedTasks = goal?.tasks?.filter(task => task.complete === true)

      if (completedTasks.length < goal?.tasks?.length) {
        this.toastrMessages.showInfoMessage("Complete Goal", "Cannot complete this goal without completing all your tasks.")
        return;
      }
    }

    // Change goal status
    goal.goalStatus = "completed"

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        // Get backlog index
        const index = this.getGoalTypeObjectList().started.findIndex(goalObj => goalObj.id === goal.id);

        // Add goal in the started list
        this.getGoalTypeObjectList().completed.push(this.getGoalTypeObjectList().started[index])

        // Remove the goal from the previous backlog list
        this.getGoalTypeObjectList().started.splice(index, 1);

        // Stop the countdown timer
        this.activeGoalService.deactivateCurrentActiveGoal();

        // Close the modal!
        this.closeViewGoalModal();

        // Show an encouraging message
        this.toastrMessages.showSuccessMessage("Congradulations", encouragingWords[Math.floor(Math.random() * encouragingWords.length)], 15000)
      })
  }

  private restoreGoal(goal: GoalModel) {
    // Change goal status
    goal.goalStatus = "backlog"

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        // Get backlog index
        const index = this.getGoalTypeObjectList().archived.findIndex(goalObj => goalObj.id === goal.id);

        // Add goal in the started list
        this.getGoalTypeObjectList().backlog.push(this.getGoalTypeObjectList().archived[index])

        // Remove the goal from the previous backlog list
        this.getGoalTypeObjectList().archived.splice(index, 1);

        // Close the modal!
        this.closeViewGoalModal();
      })
  }

  public calculateTaskCompletion(goal: GoalModel): void {
    if (goal?.tasks && goal?.tasks?.length > 0) {
      const completedTasks = goal?.tasks?.filter(task => task.complete === true)
      this.goalProgress = completedTasks.length / goal?.tasks?.length;
    }
    else
      this.goalProgress = 0;
  }

  public getGoalProgress(): number {
    return this.goalProgress;
  }

  public addMoreGoalTime(goalObject: GoalModel, viewGoalModalRef: MdbModalRef<ViewSelectedGoalComponent>) {
    this.setViewGoalModalRef(viewGoalModalRef);
    
    this.extraTimeModalRef = this.modalService.open(AddExtraGoalTimeComponent, {
      containerClass: 'modal top fade modal-backdrop',
      data: { goal: goalObject },
      ignoreBackdropClick: true,
      modalClass: 'modal-xl modal-dialog-centered w-25',
    });

    this.extraTimeModalRef.onClose.subscribe((extraTime: string | null) => {
      if (extraTime) {
        const [newHours, newMinutes] = extraTime.split(':')
        const [durHours, durMinutes, durSeconds] = goalObject.duration.split(":");
        const [tmHours, tmMinutes, tmSeconds] = goalObject.timeRemaining.split(":");;

        goalObject.duration = getTimeFormattedString(+durHours + (+newHours),
          +durMinutes + (+newMinutes), +durSeconds);
        goalObject.timeRemaining = getTimeFormattedString(+tmHours + (+newHours),
          +tmMinutes + (+newMinutes), +tmSeconds);

        // Update goal in the database
        this.goalManagementService.updateGoal(goalObject)
          .subscribe((response: GoalModel) => {
            console.log(response)

            this.activeGoalService.activateGoalCountDown(goalObject)
            this.getViewGoalModalRef().close();
          })
      }
    })
  }

  public getCloseAddMoreTimeModalRef(): MdbModalRef<AddExtraGoalTimeComponent> {
    return this.extraTimeModalRef;
  }
}

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel, goalStatus } from './models/goal-model';
import { ActiveGoalService } from './services/active-goal.service';
import { GoalManagementService } from './services/goal-management.service';
import { CaptureGoalsComponent } from './capture-goals/capture-goals.component';
import { CaptureGoalService } from './services/capture-goal.service';

@Component({
	selector: 'app-goal-management',
	templateUrl: './goal-management.component.html',
	styleUrls: ['./goal-management.component.css'],
})
export class GoalManagementComponent implements OnInit {
	MAX_PAUSE: number = 3
	// Goal states
	backlogState: goalStatus = 'backlog';
	startedState: goalStatus = 'started';
	pausedState: goalStatus = 'paused';
	completedState: goalStatus = 'completed';
	archivedState: goalStatus = 'archived';
	modal: MdbModalRef<ViewSelectedGoalComponent> | null = null;
	selectedGoal!: GoalModel;

	// Goal collections
	_backlog: Array<GoalModel> = [];
	_paused: Array<GoalModel> = [];
	_archived: Array<GoalModel> = [];
	_started: Array<GoalModel> = [];
	_completed: Array<GoalModel> = [];

  modalDialog : MdbModalRef<CaptureGoalsComponent> | null = null;

	constructor(
		private goalService: GoalManagementService,
		private activeGoalPopupService: ActiveGoalService,
    private captureGoalService: CaptureGoalService
	) { }

	ngOnInit(): void {
		this.goalService.getGoals().subscribe((goal: GoalModel) => {
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
					this._started.push(goal);
					break;
			}
		})
	}

	//TODO Mock function, to remove
	filterGoals() { }

	onDropGoal = (event: CdkDragDrop<Array<any>>): void => {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			const previousContainerLinks: Array<string> =
				event.previousContainer.connectedTo.toString().split(',');

			// Checking if the current card is movable to the target container
			if (previousContainerLinks.includes(event.container.id)) {
				// Handling Goal Activity Logic
				switch (event.container.id) {
					case this.archivedState:
						const response = prompt("[NB] THIS IS A MOCK POPUP WINDOW, THE ACTUAL ONE IS YET TO COME!!\n\nWhy are you archieving this goal?")
						if (response === null) return;
						alert(response)

						if (this.closePopup(event.previousContainer.id))
							this.activeGoalPopupService.deactivateGoal();

						break;
					case this.pausedState:
						if (event.previousContainer.data[event.previousIndex].pausedCount === this.MAX_PAUSE) {
							this.goalService.showErrorMeesage("Pause Limit Exceeded", `${event.previousContainer.data[event.previousIndex].title} has exceeded its pause limit, and can no longer be paused further!`);
							return;
						}

						if (this.closePopup(event.previousContainer.id))
							this.activeGoalPopupService.deactivateGoal();

						event.previousContainer.data[event.previousIndex].pausedCount += 1;
						break;
					case this.startedState:
						if (event.container.data.length > 0) {
							this.goalService.showErrorMeesage("Starting a Goal", `${event.container.data[event.currentIndex].title} is still active!!`)
							return;
						}

						this.activeGoalPopupService.activateGoalCountDown(event.previousContainer.data[event.previousIndex]);
						break;
				}

				transferArrayItem(
					event.previousContainer.data,
					event.container.data,
					event.previousIndex,
					event.currentIndex
				);
			}
		}
	};

	closePopup(containerId: string) {
		if (containerId === this.startedState) return true;
		return false;
	}

	onViewGoal(goalStatus: goalStatus, goalId: number): void {
		alert(`Viewing ${goalStatus} goal in pos [${goalId}]`)
	}

  addNewGoal(){
    this.captureGoalService.openCaptureGoal();
  }
}

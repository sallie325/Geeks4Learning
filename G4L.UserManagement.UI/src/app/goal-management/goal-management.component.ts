import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel, goalTypes } from './models/goal-model';
import { GoalManagementService } from './services/goal-management.service';

@Component({
	selector: 'app-goal-management',
	templateUrl: './goal-management.component.html',
	styleUrls: ['./goal-management.component.css'],
})
export class GoalManagementComponent implements OnInit {
	MAX_PAUSE: number = 3
	// Goal states
	backlogState: goalTypes = 'backlog';
	startedState: goalTypes = 'started';
	pausedState: goalTypes = 'paused';
	completedState: goalTypes = 'completed';
	archivedState: goalTypes = 'archived';
	modal: MdbModalRef<ViewSelectedGoalComponent> | null = null;
	selectedGoal!: GoalModel;

	_backlog: Array<GoalModel> = [];

	_paused: Array<GoalModel> = [];

	_archived: Array<GoalModel> = [];

	_started: Array<GoalModel> = [];
	_completed: Array<GoalModel> = [];

	constructor(
		private goalService: GoalManagementService,
		private toastrService: ToastrService,
	) { }

	ngOnInit(): void {
		this.filterGoals();
	}

	//TODO Mock function, to remove

	filterGoals() {
		this.goalService.getGoals().subscribe(
			(results) => {
				results.forEach((goal) => {
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
				});
			},
			(error) => {
				this.toastrService.error(error.message);
			}
		);
	}

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
						const response = prompt("Why are you archieving this goal?")
						if (response === null) return;
						alert(response)
						break;
					case this.pausedState:
						if (this._started[event.previousIndex].pausedCount === this.MAX_PAUSE) {
							alert("This goal cannot be paused any longer, you must complete it!")
							return;
						}
						this._started[event.previousIndex].pausedCount += 1;
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

	onViewGoal(goalType: goalTypes, goalId: number): void {
		alert(`Viewing ${goalType} goal in pos [${goalId}]`)
	}
}

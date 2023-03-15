import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { GoalModel, goalTypes } from './models/goal-model';

@Component({
	selector: 'app-goal-management',
	templateUrl: './goal-management.component.html',
	styleUrls: ['./goal-management.component.css']
})
export class GoalManagementComponent {
	// Goal states
	backlogState: goalTypes = "backlog"
	startedState: goalTypes = "started"
	pausedState: goalTypes = "paused"
	completedState: goalTypes = "completed"
	archivedState: goalTypes = "archived"

	_backlog: Array<GoalModel> = [
		{
			id: 1,
			title: "Begin OOP Classes",
			description: "I want to start with basics and then build up from there...",
			duration: "2 Hours",
      goalType: "backlog",
			pausedCount: 0,
			tasks: [
				{
					id: 1,
					title: "Setup my environment",
					complete: false
				}
			]
		},
		{
			id: 2,
			title: "Learn Springboot",
			description: "Will start with the basis of springboot today",
			duration: "2 Hours",
			pausedCount: 0,
      goalType: "backlog",
		},
	]

	_paused: Array<GoalModel> = [
		{
			id: 1,
			title: "Solve a Binary Search Algorithm",
			description: "I want to test my understanding of the algorithm",
			duration: "1 Hour",
			pausedCount: 0,
      goalType: "paused"
		},
		{
			id: 2,
			title: "Do a 5 Minute Walk",
			description: "Need this for mind refreshment",
			duration: "1 Hour",
			pausedCount: 0,
      goalType: "paused"
		},
	]

	_archived: Array<GoalModel> = [
		{
			id: 1,
			title: "Solve a Binary Search Algorithm",
			description: "I want to test my understanding of the algorithm",
			duration: "1 Hour",
			pausedCount: 0,
      goalType: "archived"
		},
		{
			id: 2,
			title: "Go to pick N pay",
			description: "Need something to spice-up my lunch",
			duration: "30min",
			pausedCount: 0,
      goalType: "archived"
		},
	]

	_started: Array<GoalModel> = []
	_completed: Array<GoalModel> = []

	constructor() { }

	onDropGoal = (event: CdkDragDrop<Array<any>>): void => {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			const previousContainerLinks: Array<string> = event.previousContainer.connectedTo.toString().split(',')

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
						if (this._started[event.previousIndex].pausedCount === 5) {
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
					event.currentIndex,
				);
			}
		}
	}

	onViewGoal = (goalType: goalTypes, goalID: number) => {
		alert(`Viewing Goal: [${goalType}, ${goalID}]`)
	}
}

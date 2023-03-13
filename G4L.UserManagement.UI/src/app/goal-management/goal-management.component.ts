import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { GoalModel } from './models/goal-model';

@Component({
  selector: 'app-goal-management',
  templateUrl: './goal-management.component.html',
  styleUrls: ['./goal-management.component.css']
})
export class GoalManagementComponent {
  _backlog: Array<GoalModel> = [
    {
      title: "Begin OOP Classes",
      description: "I want to start with basics and then build up from there...",
      duration: "2 Hours"
    },
    {
      title: "Learn Springboot",
      description: "Will start with the basis of springboot today",
      duration: "2 Hours"
    },
  ]

  _paused: Array<GoalModel> = [
    {
      title: "Solve a Binary Search Algorithm",
      description: "I want to test my understanding of the algorithm",
      duration: "1 Hour"
    },
    {
      title: "Go to pick N pay",
      description: "Need something to spice-up my lunch",
      duration: "1 Hour"
    },
  ]

  _archived: Array<GoalModel> = [
    {
      title: "Solve a Binary Search Algorithm",
      description: "I want to test my understanding of the algorithm",
      duration: "1 Hour"
    },
    {
      title: "Go to pick N pay",
      description: "Need something to spice-up my lunch",
      duration: "1 Hour"
    },
  ]

  _started: Array<GoalModel> = []
  _completed: Array<GoalModel> = []

  constructor() { }

  onDropGoal = (event: CdkDragDrop<Array<any>>) => {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

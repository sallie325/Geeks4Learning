import { Component, OnInit } from '@angular/core';
import { GoalModel } from '../../../models/goal-model';

@Component({
  selector: 'app-view-selected-goal',
  templateUrl: './view-selected-goal.component.html',
  styleUrls: ['./view-selected-goal.component.css'],
})
export class ViewSelectedGoalComponent implements OnInit {
  goal!: GoalModel;
  goalProgress!: number;
  goalProgressValue!: number;
  goalStatus!: string;

  constructor() {}

  ngOnInit(): void {
    this.calculateGoalProgress();
    this.getGoalColor();
  }

  calculateGoalProgress() {
    if (this.goal?.tasks) {
      this.goalProgress =
        this.goal.tasks.filter((task) => task.complete).length /
        this.goal.tasks.length;
      this.goalProgressValue = this.goalProgress * 100;
      return;
    }
    //TODO what if no task added how do we calculate the percentage
    this.goalProgress = 0;
    this.goalProgressValue = this.goalProgress * 100;
  }

  getGoalColor() {
    if (this.goal?.goalStatus) this.goalStatus = this.goal?.goalStatus;
  }
}

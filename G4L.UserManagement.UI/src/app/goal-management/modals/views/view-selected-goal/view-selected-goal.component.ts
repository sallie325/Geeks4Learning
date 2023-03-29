import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { activeGoalPopupWindowState } from 'src/app/goal-management/models/active-goal-model';
import { ActiveGoalService } from 'src/app/goal-management/services/active-goal.service';
import { GoalButtonActionService } from 'src/app/goal-management/services/goal-button-action.service';
import { goalButtonAction, GoalModel } from '../../../models/goal-model';

@Component({
  selector: 'app-view-selected-goal',
  templateUrl: './view-selected-goal.component.html',
  styleUrls: ['./view-selected-goal.component.css'],
})
export class ViewSelectedGoalComponent implements OnInit {
  goal!: GoalModel;
  goalStatus!: string;
  progressState: "danger" | "warning" | "success" | "primary" = 'danger'

  constructor(
    private modalRef: MdbModalRef<ViewSelectedGoalComponent>,
    private activeGoalService: ActiveGoalService,
    private goalButtonActonService: GoalButtonActionService
  ) { }

  ngOnInit(): void {
    this.getGoalColor();

    this.goalButtonActonService.calculateTaskCompletion(this.goal);
  }

  getProgress(): number {
    return this.goalButtonActonService.getGoalProgress();
  }

  getProgressValue(): number {
    const percentage = this.getProgress() * 100;

    if (percentage === 100) this.progressState = "success"
    else if (percentage >= 75) this.progressState = "primary"
    else if (percentage >= 50) this.progressState = "warning"
    else this.progressState = "danger"

    return percentage;
  }

  getGoalColor() {
    if (this.goal?.goalStatus) this.goalStatus = this.goal?.goalStatus;
  }

  onCloseModal(): void {
    this.modalRef.close();
  }

  isGoalStarted(): activeGoalPopupWindowState {
    return this.activeGoalService.getActiveGoalPopupWindowState();
  }

  onGoalAction(actionType: goalButtonAction, goal: GoalModel) {
    this.goalButtonActonService.performButtonAction(actionType, goal, this.modalRef);
  }

  addMoreTime() {
    this.goalButtonActonService.addMoreGoalTime(this.goal, this.modalRef)
  }
}

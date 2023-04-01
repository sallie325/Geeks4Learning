import { Component, OnInit } from '@angular/core';
import { toNumber } from 'lodash';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GoalManagementService } from 'src/app/goal-management/services/api/goal-management.service';
import { ActiveGoalService } from 'src/app/goal-management/services/logic-handlers/active-goal.service';
import { GoalButtonActionService } from 'src/app/goal-management/services/logic-handlers/goal-button-action.service';
import { ViewGoalService } from 'src/app/goal-management/services/logic-handlers/view-goal.service';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { getTimeFormattedString } from 'src/app/shared/utils/utils';
import { activeGoalPopupWindowState, goalButtonAction, GoalModel, goalStatus } from '../../../models/goal-model';
import { AddExtraGoalTimeComponent } from '../../add-extra-goal-time/add-extra-goal-time.component';

@Component({
  selector: 'app-view-selected-goal',
  templateUrl: './view-selected-goal.component.html',
  styleUrls: ['./view-selected-goal.component.css'],
})
export class ViewSelectedGoalComponent implements OnInit {
  goal!: GoalModel;
  allowModalClosure!: boolean;
  goalStatus!: goalStatus;
  progressState: "danger" | "warning" | "success" | "primary" = 'danger'
  addTimeModalReference!: MdbModalRef<AddExtraGoalTimeComponent>

  constructor(
    private viewGoalService: ViewGoalService,
    private activeGoalService: ActiveGoalService,
    private goalButtonActonService: GoalButtonActionService,
    private mdbModalService: GoalModalHandlerService<any>,
    private goalManagementApiService: GoalManagementService
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

  closeViewGoalModal(): void {
    this.viewGoalService.closeViewedGoal();
  }

  isGoalStarted(): activeGoalPopupWindowState {
    return this.activeGoalService.getActiveGoalPopupWindowState();
  }

  onGoalAction(actionType: goalButtonAction, goal: GoalModel) {
    this.goalButtonActonService.performButtonAction({
      actionType: actionType,
      goal: goal,
      modalReference: this.viewGoalService.getViewedGoalModalReference()
    });
  }

  addMoreTime() {
    this.mdbModalService.openMdbModal<AddExtraGoalTimeComponent>({
      component: AddExtraGoalTimeComponent,
      data: null,
      ignoreBackdropClick: false,
      width: 50
    })
      .onClose.subscribe((userExtraTime: string | null) => {
        if (userExtraTime) {
          const [newHours, newMinutes] = userExtraTime.split(':')
          const [durHours, durMinutes, durSeconds] = this.goal.duration.split(":");
          const [tmHours, tmMinutes, tmSeconds] = this.goal.timeRemaining.split(":");;

          this.goal.duration = getTimeFormattedString(toNumber(durHours) + toNumber(newHours),
            toNumber(durMinutes) + toNumber(newMinutes), toNumber(durSeconds));

          this.goal.timeRemaining = getTimeFormattedString(toNumber(tmHours) + toNumber(newHours),
            toNumber(tmMinutes) + toNumber(newMinutes), toNumber(tmSeconds));

          // Update goal in the database
          this.goalManagementApiService.updateGoal(this.goal)
            .subscribe((response: GoalModel) => {
              console.log(response)

              this.activeGoalService.activateGoalCountDown(this.goal);
              this.viewGoalService.closeViewedGoal();
            })
        }
      })
  }
}

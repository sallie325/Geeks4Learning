import { Component, Input, OnInit } from '@angular/core';
import { activeGoalPopupWindowState } from '../../models/active-goal-model';
import { GoalModel } from '../../models/goal-model';
import { ActiveGoalService } from '../../services/active-goal.service';
import { ViewGoalService } from '../../services/view-goal.service';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.css'],
})
export class GoalCardComponent implements OnInit {
  @Input()
  goalId!: number | undefined;

  @Input()
  goalTitle!: string;

  @Input()
  goalDescription!: string;

  @Input()
  goalDuration!: string;
  
  @Input()
  goalRemainingTime!: string;

  @Input()
  goalState!: 'backlog' | 'started' | 'paused' | 'completed' | 'archived';

  @Input()
  goal!: GoalModel;

  @Input()
  onViewGoalRef!: any;

  constructor(
    private activeGoalService: ActiveGoalService,
    private viewGoalService: ViewGoalService
  ) { }

  ngOnInit(): void { }

  grab(event: any) {
    const { target } = event;
    target.style.cursor = 'grabbing';
  }

  release(event: any) {
    const { target } = event;
    target.style.cursor = 'grab';
  }

  isGoalStarted(): activeGoalPopupWindowState {
    return this.activeGoalService.getActiveGoalPopupWindowState();
  }

  onViewGoal(goal?: GoalModel): void {
    this.viewGoalService.viewSelectedGoal(goal!)
  }

  onCloseGoal(): void {
    this.viewGoalService.closeViewedGoal()
  }
}

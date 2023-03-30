import { Component, Input, OnInit } from '@angular/core';
import { GoalModel, goalStatus, viewType } from '../../models/goal-model';
import { CaptureGoalService } from '../../services/component-logic/capture-goal.service';
import { GoalButtonActionService } from '../../services/component-logic/goal-button-action.service';
import { GoalManagementService } from '../../services/data/goal-management.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input()
  goal!: GoalModel;

  @Input()
  viewType!: viewType

  @Input()
  goalStatus!: goalStatus

  constructor(
    private goalManagementService: GoalManagementService,
    private captureGoalService: CaptureGoalService,
    private goalButtonActionService: GoalButtonActionService
  ) { }

  ngOnInit(): void { }

  toggleTaskForCompletion(element: any) {
    const { target: { id } } = element;

    if (this.goal.tasks) {
      this.goal.tasks[id].complete = !this.goal?.tasks[id]?.complete

      if (this.viewType === "view") {
        this.goalManagementService.updateGoal(this.goal)
          .subscribe((updatedGoal: GoalModel) => {
            console.log(updatedGoal)
            this.goalButtonActionService.calculateTaskCompletion(updatedGoal);
          })
      }
    }
  }

  removeTask(element: any): void {
    const { target: { id } } = element;

    if (this.goal.tasks) {
      this.goal.tasks.splice(id, 1)

      if (this.viewType === "view") {
        this.goalManagementService.updateGoal(this.goal)
          .subscribe((updatedGoal: GoalModel) => {
            console.log(updatedGoal)
          })
      }
    }
  }

  addMoreTasks(){
    this.captureGoalService.openAddGoalTaskDialog(this.goal, "view");
  }
}

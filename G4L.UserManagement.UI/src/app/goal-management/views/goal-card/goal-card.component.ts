import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewSelectedGoalComponent } from '../../modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel } from '../../models/goal-model';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.css'],
})
export class GoalCardComponent {
  @Input()
  goalTitle!: string;

  @Input()
  goalDescription!: string;

  @Input()
  goalDuration!: string;

  @Input()
  goalState!: 'backlog' | 'started' | 'paused' | 'completed' | 'archived';
  GoalModel!: GoalModel;
  name: any;
  animal: any;

  constructor(public dialog: MatDialog) {}

  grab(event: any) {
    const { target } = event;
    target.style.cursor = 'grabbing';
  }

  release(event: any) {
    const { target } = event;
    target.style.cursor = 'grab';
  }
  onOpenDialog(): void {
    const dialogRef = this.dialog.open(ViewSelectedGoalComponent, {
      data: {
        title: this.goalTitle,
        duration: this.goalDuration,
        description: this.goalDescription,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.goalDescription = result;
    });
  }
}

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../shared/material/material.module';
import { GoalManagementComponent } from './goal-management.component';
import { AddExtraGoalTimeComponent } from './modals/add-extra-goal-time/add-extra-goal-time.component';
import { CreateGoalTaskComponent } from './modals/create-goal-task/create-goal-task.component';
import { CreateGoalComponent } from './modals/create-goal/create-goal.component';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { ActiveGoalCardComponent } from './views/active-goal-card/active-goal-card.component';
import { GoalCardComponent } from './views/goal-card/goal-card.component';
import { GoalColumnHeadersComponent } from './views/goal-column-headers/goal-column-headers.component';
import { GoalColumnListComponent } from './views/goal-column-list/goal-column-list.component';
import { CircularNumberComponent } from './widgets/circular-number/circular-number.component';
import { ContentComponent } from './widgets/circular-number/content/content.component';

@NgModule({
  declarations: [
    GoalManagementComponent,
    GoalCardComponent,
    GoalColumnListComponent,
    GoalColumnHeadersComponent,
    ActiveGoalCardComponent,
    CreateGoalComponent,
    CreateGoalTaskComponent,
    ViewSelectedGoalComponent,
    AddExtraGoalTimeComponent,
    CircularNumberComponent,
    ContentComponent,
  ],
  imports: [CommonModule, MaterialModule, DragDropModule, NgbProgressbarModule],
})
export class GoalManagementModule {}

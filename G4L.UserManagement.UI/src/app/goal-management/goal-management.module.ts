import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalManagementComponent } from './goal-management.component';
import { MaterialModule } from '../shared/material/material.module';
import { GoalCardComponent } from './views/goal-card/goal-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GoalColumnListComponent } from './views/goal-column-list/goal-column-list.component';
import { GoalColumnHeadersComponent } from './views/goal-column-headers/goal-column-headers.component';
import { CreateGoalComponent } from './modals/create-goal/create-goal.component';
import { CreateGoalTaskComponent } from './modals/create-goal-task/create-goal-task.component';
import { ViewSelectedGoalComponent } from './modals/views/view-selected-goal/view-selected-goal.component';
import { AddExtraGoalTimeComponent } from './modals/add-extra-goal-time/add-extra-goal-time.component';
import { CircularNumberComponent } from './widgets/circular-number/circular-number.component';
import { ContentComponent } from './widgets/circular-number/content/content.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { CaptureGoalsComponent } from './modals/capture-goals/capture-goals.component';



@NgModule({
  declarations: [
    GoalManagementComponent,
    GoalCardComponent,
    GoalColumnListComponent,
    GoalColumnHeadersComponent,
    CreateGoalComponent,
    CreateGoalTaskComponent,
    ViewSelectedGoalComponent,
    AddExtraGoalTimeComponent,
    CircularNumberComponent,
    ContentComponent,
    CaptureGoalsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DragDropModule,
    PipesModule
  ]
})
export class GoalManagementModule { }

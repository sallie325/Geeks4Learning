import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalManagementComponent } from './goal-management.component';
import { MaterialModule } from '../shared/material/material.module';
import { GoalCardComponent } from './views/goal-card/goal-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [GoalManagementComponent, GoalCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DragDropModule
  ]
})
export class GoalManagementModule { }

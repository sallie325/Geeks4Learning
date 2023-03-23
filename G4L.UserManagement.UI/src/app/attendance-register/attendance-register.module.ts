import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRegisterComponent } from './attendance-register.component';
import { CaptureGoalsComponent } from '../goal-management/capture-goals/capture-goals.component';
import { TotalPresentAbsentLateCardsComponent } from './total-present-absent-late-cards/total-present-absent-late-cards.component';
import { AdminComponent } from './views/admin/admin.component';
import { TraineeComponent } from './views/trainee/trainee.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AttendanceRegisterComponent,
    CaptureGoalsComponent,
    TotalPresentAbsentLateCardsComponent,
    AdminComponent,
    TraineeComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AttendanceRegisterModule {}

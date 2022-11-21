import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceRegisterComponent } from './attendence-register.component';
import { CaptureGoalsComponent } from './capture-goals/capture-goals.component';
import { TotalPresentAbsentLateCardsComponent } from './total-present-absent-late-cards/total-present-absent-late-cards.component';
import { AdminComponent } from './views/admin/admin.component';
import { TraineeComponent } from './views/trainee/trainee.component';



@NgModule({
  declarations: [ AttendenceRegisterComponent, CaptureGoalsComponent,TotalPresentAbsentLateCardsComponent, AdminComponent,TraineeComponent],
  imports: [
    CommonModule
  ]
})
export class AttendenceRegisterModule { }

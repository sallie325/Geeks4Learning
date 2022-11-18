import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceRegisterComponent } from './attendence-register.component';
import { CaptureGoalsComponent } from './capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from './lunch-time-notification/lunch-time-notification.component';
import { ReviewGoalsComponent } from './review-goals/review-goals.component';
import { TotalPresentAbsentLateCardsComponent } from './total-present-absent-late-cards/total-present-absent-late-cards.component';
import { AdminComponent } from './views/admin/admin.component';
import  {TraineeComponent} from './views/trainee/trainee.component'



@NgModule({
  declarations: [ AttendenceRegisterComponent, CaptureGoalsComponent, LunchTimeNotificationComponent, ReviewGoalsComponent,TotalPresentAbsentLateCardsComponent, AdminComponent,TraineeComponent],
  imports: [
    CommonModule
  ]
})
export class AttendenceRegisterModule { }

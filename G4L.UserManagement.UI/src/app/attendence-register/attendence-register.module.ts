import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceRegisterComponent } from './attendence-register.component';
import { CaptureGoalsComponent } from './capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from './lunch-time-notification/lunch-time-notification.component';
import { ReviewGoalsComponent } from './review-goals/review-goals.component';
import { TraineeAttendanceComponent } from './views/trainee-attendance/trainee-attendance.component';
import { ReviewerComponent } from './views/reviewer/reviewer.component';




@NgModule({
  declarations: [ AttendenceRegisterComponent, CaptureGoalsComponent, LunchTimeNotificationComponent, ReviewGoalsComponent, TraineeAttendanceComponent, ReviewerComponent,],
  imports: [
    CommonModule
  ]
})
export class AttendenceRegisterModule { }

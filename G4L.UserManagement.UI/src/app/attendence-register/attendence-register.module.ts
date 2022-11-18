import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceRegisterComponent } from './attendence-register.component';
import { AdminComponent } from './views/admin/admin.component';
import { TotalPresentAbsentLateCardsComponent } from './total-present-absent-late-cards/total-present-absent-late-cards.component';
import { TraineeComponent } from './views/trainee/trainee.component';



@NgModule({
  declarations: [ AttendenceRegisterComponent, AdminComponent, TotalPresentAbsentLateCardsComponent, TraineeComponent ],
  imports: [
    CommonModule
  ]
})
export class AttendenceRegisterModule { }

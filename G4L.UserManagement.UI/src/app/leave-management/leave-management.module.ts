import { PipesModule } from './../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveManagementComponent } from './leave-management.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MaterialModule } from '../shared/material/material.module';
import { LearnerTableComponent } from './learner-table/learner-table.component';
import { TotalPendingApprovalRejectionComponent } from './total-pending-approval-rejection/total-pending-approval-rejection.component';

@NgModule({
  declarations: [ LeaveManagementComponent, LeaveRequestComponent,LearnerTableComponent,TotalPendingApprovalRejectionComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbModalModule,
    PipesModule,
    MaterialModule,
    FormsModule
  ]
})
export class LeaveManagementModule { }

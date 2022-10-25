import { PipesModule } from './../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveManagementComponent } from './leave-management.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MaterialModule } from '../shared/material/material.module';
import { LeaveBalanceCardComponent } from './leave-balance-card/leave-balance-card.component';
import { ChartsModule } from '../shared/charts/charts.module';
import { NgChartsModule } from 'ng2-charts';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [ LeaveManagementComponent, LeaveRequestComponent, LeaveBalanceCardComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbModalModule,
    PipesModule,
    MaterialModule,
    FormsModule,
    NgChartsModule,
    ChartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ]
})
export class LeaveManagementModule { }

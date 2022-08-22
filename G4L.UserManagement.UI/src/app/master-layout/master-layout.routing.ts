import { UsermanagementModule } from './../usermanagement/usermanagement.module';
import { MasterLayoutComponent } from './master-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { UsermanagementComponent } from '../usermanagement/usermanagement.component';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user-management',
        component: UsermanagementComponent,
        canActivate: [AdminGuard]
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, DashboardModule, UsermanagementModule
  ]
})
export class MasterLayoutRoutingModule {
  static components = [ MasterLayoutComponent ]
}

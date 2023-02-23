import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IkmManagementComponent } from './ikm-management.component';
import { IkmTableComponent } from './components/ikm-table/ikm-table.component';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [ IkmManagementComponent, IkmTableComponent ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class IkmManagementModule { }

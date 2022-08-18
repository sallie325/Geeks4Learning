import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { WidgetComponent } from './widget/widget.component';
import { MiniTableComponent } from './mini-table/mini-table.component';



@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent,
    MiniTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }

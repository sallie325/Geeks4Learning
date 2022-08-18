import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MasterLayoutComponent } from './master-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { MasterLayoutRoutingModule } from './master-layout.routing';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [ MasterLayoutComponent, TopNavComponent, ContentAreaComponent, SideNavComponent ],
  imports: [
    CommonModule,
    MasterLayoutRoutingModule,
    FontAwesomeModule
  ]
})
export class MasterLayoutModule { }

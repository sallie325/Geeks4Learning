import { EnumToArrayPipe } from './../shared/pipes/enum-to-array.pipe';
import { UsermanagementComponent } from './usermanagement.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EnrolComponent } from './enrol/enrol.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { RemoveUnderscorePipe } from '../shared/pipes/remove-underscore.pipe';

@NgModule({
  declarations: [
    UsermanagementComponent,
    LoginComponent,
    RegisterComponent,
    EnrolComponent,
    EnumToArrayPipe,
    RemoveUnderscorePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbModalModule,
  ],
})
export class UsermanagementModule {}

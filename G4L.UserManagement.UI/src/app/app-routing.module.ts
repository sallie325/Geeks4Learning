import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboadComponent } from './admin-dashboad/admin-dashboad.component';
import { LoginComponent } from './login/login.component';
import { UserDashboadComponent } from './user-dashboad/user-dashboad.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './login/guards/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: UserDashboadComponent, canActivate: [AuthGuard]},
    {path: 'admin-dashboard', component: AdminDashboadComponent, canActivate: [AuthGuard]},
    // {path: 'questionnaire', component: QuestionnaireComponent},
    { path: '',   redirectTo: 'login', pathMatch: 'full' }, 
    // redirect to 404 page
    { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

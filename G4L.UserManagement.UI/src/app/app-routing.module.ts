import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboadComponent } from './admin-dashboad/admin-dashboad.component';
import { LoginComponent } from './login/login.component';
import { UserDashboadComponent } from './user-dashboad/user-dashboad.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: UserDashboadComponent},
    {path: 'admin-dashboard', component: AdminDashboadComponent},
    {path: 'questionnaire', component: QuestionnaireComponent},
    { path: '',   redirectTo: 'login', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { authGuardGuard } from './services/auth-guard.guard';
import { InterviewSessionComponent } from './interview-session/interview-session.component';
import { SingleSessionComponent } from './single-session/single-session.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },  
  {
    path: "sessions",
    component: AllSessionsComponent,
    canActivate : [authGuardGuard]
  },
  {
    path: "interviewSession",
    component: InterviewFormComponent,
    canActivate : [authGuardGuard]
  },
  {
    path: "interview-questions",
    component: InterviewSessionComponent,
    canActivate : [authGuardGuard]
  },
  {
    path: "sessions/view/:sessionId",
    component: SingleSessionComponent,
    canActivate : [authGuardGuard]
  },
  {
    path: "register",
    component: RegisterFormComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

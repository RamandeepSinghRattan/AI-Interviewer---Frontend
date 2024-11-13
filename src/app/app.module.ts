import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { DatabaseOperationsService } from './services/database-operations.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { InterviewSessionComponent } from './interview-session/interview-session.component';
import { SessionCardComponent } from './session-card/session-card.component';
import { SingleSessionComponent } from './single-session/single-session.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AllSessionsComponent,
    InterviewSessionComponent,
    SessionCardComponent,
    SingleSessionComponent,
    InterviewFormComponent,
    RegisterFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    provideAnimationsAsync(),
    DatabaseOperationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

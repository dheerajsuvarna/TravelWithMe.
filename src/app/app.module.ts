import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { AlertService, AuthenticationService, UserService, AddTripService } from './services/index';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { UpdateProfileComponent } from './profile-management/update-profile/update-profile.component';

// import { ViewProfileComponent } from './profile-management/view-profile/view-profile.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

import {DropDownDirective} from './shared/dropdown.directive';

import { AddTripComponent } from './add-trip/add-trip.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ResetPasswordChangeComponent } from './reset-password-change/reset-password-change.component';
import {MessagesComponent} from './Messages/messages.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    LandingPageComponent,
    UpdateProfileComponent,
    // ViewProfileComponent,
    TripCardComponent,
    MyTripsComponent,
    EmailVerificationComponent,
    ProfileManagementComponent,
    DropDownDirective,

    AddTripComponent,
    PasswordResetComponent,
    ResetPasswordChangeComponent,
    MessagesComponent,
    EditTripComponent

  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    AddTripService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

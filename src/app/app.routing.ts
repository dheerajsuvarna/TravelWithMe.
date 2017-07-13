import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UpdateProfileComponent } from './profile-management/update-profile/update-profile.component';
// import { ViewProfileComponent } from './profile-management/view-profile/view-profile.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { MyTripsComponent} from './my-trips/my-trips.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component'
// import{ EmailVerificationComponent} from './email-verification/email-verification.component';
import { AddTripComponent} from './add-trip/add-trip.component'
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {ResetPasswordChangeComponent} from './reset-password-change/reset-password-change.component';
import {MessagesComponent} from './Messages/messages.component';
import {SearchTripComponent} from "./search-trip/search-trip.component";

const appRoutes: Routes = [

  { path: 'email-verification/:token', component: EmailVerificationComponent },
  { path: 'reset-password-change/:token', component: ResetPasswordChangeComponent },
  { path: 'reset-password', component: PasswordResetComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'getProfile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
  // { path: 'getProfile', component: ViewProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'mytrips', component: MyTripsComponent, canActivate: [AuthGuard] },
  { path: 'searchtrips', component: SearchTripComponent, canActivate: [AuthGuard] },

  { path: 'profileManagement', component: ProfileManagementComponent, canActivate: [AuthGuard] , children: [
     { path: 'getProfile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
    {path: 'mytrips', component: MyTripsComponent, canActivate: [AuthGuard]},
    {path: 'addtrip', component: AddTripComponent, canActivate: [AuthGuard] },
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
    // {path: 'addtrip', component: AddTripComponent, canActivate: [AuthGuard] },
  ]},

  { path: 'addtrip', component: AddTripComponent, canActivate: [AuthGuard] },



  // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

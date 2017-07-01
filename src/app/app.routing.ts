import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { profileManagementComponent } from './profile-management/profile-management.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { MyTripsComponent} from './my-trips/my-trips.component';
import{EmailVerificationComponent} from './email-verification/email-verification.component'

const appRoutes: Routes = [

  { path: 'email-verification/:token', component: EmailVerificationComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profileEdit', component: profileManagementComponent, canActivate: [AuthGuard] },
  { path: 'viewProfile', component: ViewProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'mytrips', component: MyTripsComponent, canActivate: [AuthGuard] },


  // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

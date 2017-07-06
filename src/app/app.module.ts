import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { AlertService, AuthenticationService, UserService } from './services/index';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { profileManagementComponent } from './profile-management/profile-management.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { MyTripsComponent } from './my-trips/my-trips.component';



import { SourceFilterPipe } from './source-filter.pipe';
import { DestinationFilterPipe } from './destination-filter.pipe';
import { TraveldateFilterPipe } from './traveldate-filter.pipe';
import { ReturndateFilterPipe } from './returndate-filter.pipe';
import { BudgetFilterPipe } from './budget-filter.pipe';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { FilterPipe } from './filter.pipe';
import {SearchPipe} from './search-pipe';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],


  declarations: [
    SourceFilterPipe,
    DestinationFilterPipe,
    ReturndateFilterPipe,
    TraveldateFilterPipe,
    BudgetFilterPipe,
    SearchPipe,
    FilterPipe,
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    LandingPageComponent,
    profileManagementComponent,
    ViewProfileComponent,
    TripCardComponent,
    MyTripsComponent,


    SearchTripComponent,
    SourceFilterPipe,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
  ],
  exports: [FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

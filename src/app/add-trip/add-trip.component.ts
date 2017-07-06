import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {User} from "../models/usermodel";
import { AlertService, UserService, AddTripService } from '../services/index';
//import { FormBuilder, FormGroup , FormControl} from '@angular/forms';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})



export class AddTripComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  loading = false;
  currentUser: User;
  public trip: Trip =new Trip();
  constructor(
   /* private router: Router,
    //private userService: UserService,
    private addTripService: AddTripService,
   */ private alertService: AlertService,
   private addTripService: AddTripService,
  private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    this.currentUser = json.user;
  }

  ngOnInit() {
    this.trip.interests= [Interest.Beach];
    this.trip.tripName = "Beach Party";
    this.trip.budget = 50;
    this.trip.description = "Some description about the trip";
    this.trip.destination = "Ibiza";
    this.trip.source = "Munich";
    this.trip.startDate= "22.07.2017";
    this.trip.endDate= "30.07.2017";
    this.trip.user = this.currentUser;
    this.trip.numOfPeople = 5;
    console.log("inisde init")
    console.log(this.trip)
  }


  addTrip() {
    console.log("inside add trip")
  this.loading = true;
    this.trip.source = this.model.source;
    console.log(this.model.interests);
    this.model.user = this.currentUser;
    console.log(this.model);

    this.addTripService.addTrip(this.model)
      .subscribe(
        data => {
          window.location.reload();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        })
  }

}

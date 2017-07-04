import { Component, OnInit } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {User} from "../models/usermodel";


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  currentUser: User;
  public trip: Trip =new Trip();
  constructor() {
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
    this.trip.user = this.currentUser;
  }
  
  addTrip() {
    //fill this later
  }

}

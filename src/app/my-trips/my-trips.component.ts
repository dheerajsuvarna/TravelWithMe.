import { Component, OnInit } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {User} from "../models/usermodel";

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {
  public trip: Trip =new Trip();
  public trip2: Trip =new Trip();
  user: User = new User();


  public trips: Trip[] = [this.trip,this.trip2,this.trip];
  public tripsIamAttending: Trip[] = [ this.trip2,this.trip];

  constructor() {

  }
  ngOnInit() {
    this.user.firstname = "Bakri";
    this.user.lastname="Bitar";
    this.trip.interests= [Interest.Beach];
    this.trip.tripName = "To the Beach";
    this.trip.budget = 50;
    this.trip.description = "Some description about the trip";
    this.trip.destination = "Miami";
    this.trip.source = "Munich";
    this.trip.date= "22.07.2017";
    this.trip.user = this.user;


    this.trip2.interests= [Interest.Arts];
    this.trip2.tripName = "To the Muesum";
    this.trip2.budget = 30;
    this.trip2.description = "Some description about the trip";
    this.trip2.destination = "Deutsches Museum";
    this.trip2.source = "Munich";
    this.trip2.date= "30.07.2017";
    this.trip2.user = this.user;


  }

}

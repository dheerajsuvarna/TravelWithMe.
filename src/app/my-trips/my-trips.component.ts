import { Component, OnInit } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {User} from "../models/usermodel";
import  {AddTripService} from '../services/addtrip.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {

  public trip: Trip =new Trip();
  public trip2: Trip =new Trip();
  user: User = new User();


  public trips;
  // public tripsIamAttending: Trip[] = [ this.trip2,this.trip];

  constructor(private  tripService:AddTripService ) {

  }
  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    currentUser = json.user;
     this.tripService.myTrips(currentUser).subscribe(
      myTrips => {this.trips= myTrips});

  }

}

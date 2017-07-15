import { Component, OnInit } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {User} from "../models/usermodel";
import  {AddTripService} from '../services/addtrip.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css'],
})
export class MyTripsComponent implements OnInit {

  public trip: Trip =new Trip();
  public trip2: Trip =new Trip();
  user: User = new User();


   public trips;
   public tripsIamAttending;
   public hasTrips;
   public attendsTrips;
  constructor(private  tripService:AddTripService ) {

  }
  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    currentUser = json.user;
     this.tripService.myTrips(currentUser).subscribe(
      myTrips => {
        this.trips= myTrips;
        this.hasTrips = this.trips.length!=0;
        this.trips = this.trips.sort((item1, item2): Number => compareByDate(item1 , item2 ));
      }
      );

     this.tripService.tripsImAttending(currentUser).subscribe(
       tripsImAttending=>
       {
         this.tripsIamAttending = tripsImAttending;
         this.attendsTrips = this.tripsIamAttending.length!=0;
        this.tripsIamAttending = this.tripsIamAttending.sort((item1, item2): Number => compareByDate(item1 , item2 ))
       }
     );
  }
}
function compareByDate(item1 : Trip, item2:Trip){
  if( item2.startDate<item1.startDate)
    return -1;
return +1;

}

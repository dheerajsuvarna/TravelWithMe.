import { Component, OnInit,Input } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {isNullOrUndefined, isUndefined} from "util";
import {showWarningOnce} from "tslint/lib/error";



@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

 @Input() trip:Trip;
  imageURI:String;
  isMyTrip: boolean;
  constructor(  ) {
  }
  ngOnInit() {
    if(!isNullOrUndefined(this.trip)&&!isNullOrUndefined(this.trip.interests ))
      this.imageURI = '../../assets/tripImages/'+this.trip.interests[0]+'.jpg';

    var stringUser  = localStorage.getItem('currentUser');
    var json = JSON.parse(stringUser);
    var currentUser = json.user;
    this.isMyTrip = currentUser._id === this.trip.user;

  }

}

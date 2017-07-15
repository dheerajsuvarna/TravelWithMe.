import { Component, OnInit,Input } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {User} from '../models/usermodel';
import {AddTripService} from '../services/addtrip.service';
import {Interest} from '../../models/Enums/Interest';
import {isNullOrUndefined, isUndefined} from "util";
import {showWarningOnce} from "tslint/lib/error";

import { AlertService,  } from '../services/index';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

 @Input() trip: Trip;
  imageURI: string;
  isMyTrip: boolean;
  currentUser: User;
  tripJoined = false;
  constructor(private  tripService: AddTripService  ,
              private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const temp  = localStorage.getItem('currentUser');
    const json = JSON.parse(temp);
    this.currentUser = json.user;

  }
  ngOnInit() {
    if(!isNullOrUndefined(this.trip)&&!isNullOrUndefined(this.trip.interests ))
      this.imageURI = '../../assets/tripImages/'+this.trip.interests[0]+'.jpg';

    var stringUser  = localStorage.getItem('currentUser');
    var json = JSON.parse(stringUser);
    var currentUser = json.user;
    var a: any;
    a = this.trip.user;

    this.isMyTrip = currentUser._id === a._id;
    if (this.trip.joinUser.indexOf(this.currentUser.email) > -1 ) {
      this.tripJoined = true;
    }

  }
  JoinTrip() {
    console.log('In Join Trip******');
    this.trip.joinUser.push(this.currentUser.email);
    // console.log('selected trip===>', this.trip);
    this.tripService.ManagejoinTrip(this.trip)
      .subscribe(
        trip => {
          console.log('*******In Join Trip******');
          // this.alertService.success('Trip Joined', true);
          console.log(this.trip);
          this.tripJoined = true;
      },
      error => {
        this.alertService.error(error);
        this.trip.joinUser.pop();
        // console.log('Error=====>', error );
      }
    );
  }
  LeaveTrip() {
    const pos = this.trip.joinUser.indexOf(this.currentUser.email);
    if (pos !== -1) {
      this.trip.joinUser.splice(pos, 1);
      this.tripService.ManagejoinTrip(this.trip)
        .subscribe(
          trip => {
            // this.alertService.success('Left ' + this.trip.tripName + ' trip', true);
            console.log(this.trip);
            this.tripJoined = false;
          },
          error => {
            this.alertService.error(error);
            this.trip.joinUser.push(this.currentUser.email);
            // console.log('Error=====>', error );
          }
        );
    } else {
      this.alertService.error('You are not part of this trip');
    }
  }

}

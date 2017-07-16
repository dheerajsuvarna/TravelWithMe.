import { Component, OnInit,Input } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {User} from '../models/usermodel';
import {AddTripService} from '../services/addtrip.service';
import {UserService} from '../services/user.service';


import {isNullOrUndefined} from 'util';


import { AlertService,  } from '../services/index';


import { Router } from '@angular/router';
import {send} from "q";
import {forEach} from "@angular/router/src/utils/collection";

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
  viewUser: User;
  tripJoined = false;
  showUser = false;
  constructor(private  tripService: AddTripService  ,
              private alertService: AlertService,
              private router: Router,
              private userService: UserService) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const temp  = localStorage.getItem('currentUser');
    const json = JSON.parse(temp);
    this.currentUser = json.user;

  }
  ngOnInit() {
    if (!isNullOrUndefined(this.trip)&&!isNullOrUndefined(this.trip.interests ))
      this.imageURI = '../../assets/tripImages/'+this.trip.interests[0] + '.jpg';

    var stringUser  = localStorage.getItem('currentUser');
    var json = JSON.parse(stringUser);
    var currentUser = json.user;
    var a: any;
    a = this.trip.user;

    this.isMyTrip = currentUser._id === a._id;

    for ( let user of this.trip.joinUser) {
      if (user.email === currentUser.email) {
        this.tripJoined = true;
        break;
      }
    }

  }
  JoinTrip() {
    console.log('In Join Trip******');
    const len = this.trip.joinUser.length;
    if (len === this.trip.numOfPeople) {
      return this.alertService.error('This trip is already filled with participants..Please contact creator of this trip');
    }
    const sendData = {
      'trip': this.trip,
      'user': this.currentUser
    };
    // console.log('selected trip===>', this.trip);
    this.tripService.ManagejoinTrip(sendData)
      .subscribe(
        trip => {
          console.log('*******In Join Trip******');
          // this.alertService.success('Trip Joined', true);
          console.log(this.trip);
          this.tripJoined = true;
          // window.location.reload();
      },
      error => {
        this.alertService.error(error);
        // this.trip.joinUser.pop();
        // this.trip.joinUser.pop();
        // console.log('Error=====>', error );
      }
    );
  }
  LeaveTrip() {
    const sendData = {
      'trip': this.trip
    };
   this.tripService.leaveTrip(sendData)
     .subscribe(
       trip => {
         console.log('*******In leave Trip******');
         // this.alertService.success('Trip Joined', true);
         console.log(this.trip);
         this.tripJoined = false;
         // window.location.reload();
       },
       error => {
         this.alertService.error(error);
         // this.trip.joinUser.pop();
         // this.trip.joinUser.pop();
         // console.log('Error=====>', error );
       }
     );

  }


  OpenChat() {

    var o: any;
    o = this.trip;
    var link = '/chat/' + o._id + '/' + this.trip.tripName;
    this.router.navigate([link]);
  }
  getAge(dateString) {
    // console.log("in getAge");
    const today = new Date();
    const birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  viewProfile(user: any) {
    console.log('I am in view Profile of user ', user);
      const sendData = {
        email: user.email
      };
      this.userService.getUserProfile(sendData)
        .subscribe(
          currentUser => {
            this.viewUser = currentUser;
            this.viewUser.age = +this.getAge(this.viewUser.birthdate);
            this.showUser = true;
            console.log('******** Current User: ', this.viewUser);
          },
          error => {
            this.alertService.error(error);
            console.log('Error=====>', error);
          }
        );
  }
  Close() {
    this.showUser = false;
  }

}

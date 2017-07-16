import { Component, OnInit,Input } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {isNullOrUndefined, isUndefined} from "util";
import {showWarningOnce} from "tslint/lib/error";
import { AddTripService, AlertService } from '../services/index';

import {User} from '../models/usermodel';
import {UserService} from '../services/user.service';

import { Router } from '@angular/router';

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
    const len = this.trip.joinUser.length;
    if (len === this.trip.numOfPeople) {
      return this.alertService.error('This trip is already filled with participants..Please contact creator of this trip');
    }
    this.trip.joinUser.push(this.currentUser.email);
    this.trip.joinUser.push(this.currentUser.firstname + ' ' + this.currentUser.lastname);
    // console.log('selected trip===>', this.trip);
    this.tripService.ManagejoinTrip(this.trip)
      .subscribe(
        trip => {
          console.log('*******In Join Trip******');
          // this.alertService.success('Trip Joined', true);
          console.log(this.trip);
          this.tripJoined = true;
          window.location.reload();
      },
      error => {
        this.alertService.error(error);
        this.trip.joinUser.pop();
        this.trip.joinUser.pop();
        // console.log('Error=====>', error );
      }
    );
  }
  LeaveTrip() {
    let pos = this.trip.joinUser.indexOf(this.currentUser.email);
    if (pos !== -1) {
      this.trip.joinUser.splice(pos, 1);
       pos = this.trip.joinUser.indexOf(this.currentUser.firstname + ' ' + this.currentUser.lastname);
      if (pos !== -1) {
        this.trip.joinUser.splice(pos, 1);

        this.tripService.ManagejoinTrip(this.trip)
          .subscribe(
            trip => {
              // this.alertService.success('Left ' + this.trip.tripName + ' trip', true);
              console.log('left trip', this.trip);
              this.tripJoined = false;
            },
            error => {
              this.alertService.error(error);
              this.trip.joinUser.push(this.currentUser.email);
              this.trip.joinUser.push(this.currentUser.firstname + ' ' + this.currentUser.lastname);
              // console.log('Error=====>', error );
            }
          );
      }
      else {
        this.alertService.error('System Error');
      }
    } else {
      this.alertService.error('You are not part of this trip');
    }
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
  viewProfile(user: string) {
    console.log('I am in view Profile of user ', user);

    var pos = this.trip.joinUser.indexOf(user);
    if (pos !== -1) {
      pos = pos - 1;
      if (pos === -1) {
        return this.alertService.error('System Error');
      }
      const sendData = {
        email: this.trip.joinUser[pos]
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
  }
  Close() {
    this.showUser = false;
  }

  deleteTrip(id){
    console.log('hello')
    console.log(this.trip.tripName)
    console.log(id)

    this.tripService.deleteTrip(this.trip)
      .subscribe(
        data => {
          this.alertService.success("successful!");
          location.reload();
          //this.router.navigate(["/mytrips"]);
        },
        error => {
          this.alertService.error(error._body);
          //this.loading = false;
        })

  }

  editTrip(id, tripName){
    console.log('hello')
   // console.log(this.trip.tripName)
    //console.log(id)
    var temp = id.toString();
    //console.log(temp)
   // this.router.navigate(["/edittrip" + atob(id) ]);
    //this.router.navigate(['/edittrip', { tripID: id}]);
    this.router.navigate(['/edittrip'], { queryParams: { tripID: temp, tripName: tripName } });
  }



}

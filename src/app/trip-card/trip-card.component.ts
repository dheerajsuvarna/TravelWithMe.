import { Component, OnInit,Input } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {isNullOrUndefined, isUndefined} from "util";
import {showWarningOnce} from "tslint/lib/error";
import { Router } from '@angular/router';
import { AddTripService, AlertService } from '../services/index';



@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

 @Input() trip:Trip;
  imageURI:String;
  isMyTrip: boolean;
  constructor(
    private addTripService: AddTripService,
    private alertService: AlertService,
    private router: Router
  ) {
  }
  ngOnInit() {
    if(!isNullOrUndefined(this.trip)&&!isNullOrUndefined(this.trip.interests ))
      this.imageURI = '../../assets/tripImages/'+this.trip.interests[0]+'.jpg';

    var stringUser  = localStorage.getItem('currentUser');
    var json = JSON.parse(stringUser);
    var currentUser = json.user;
    this.isMyTrip = currentUser._id === this.trip.user;

  }

  deleteTrip(id){
    console.log('hello')
    console.log(this.trip.tripName)
    console.log(id)

    this.addTripService.deleteTrip(this.trip)
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

}

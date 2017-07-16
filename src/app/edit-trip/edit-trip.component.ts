import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Trip} from '../models/tripmodel';
import {User} from "../models/usermodel";
import { AlertService, UserService, AddTripService } from '../services/index';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  // tripID: string;
  //id: any
  model: any = {};
  loading = false;
  UpdateStatus: string;
  fileValid: boolean;
  currentUser: User;
  currentTrip:Trip;
  tempTrip: Trip;
  private sub: any;
  name: string;
  id: string;


  constructor(
    private alertService: AlertService,
    private addTripService: AddTripService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const temp  = localStorage.getItem('currentUser');
    const json = JSON.parse(temp);
    this.currentUser = json.user;


    //this.tripID = route.snapshot.params['id'];

  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        const tripID: string = params['tripID'];
        const tripName: string = params['tripName'];
        this.id = params['tripID'];
        console.log('this is my id')
        console.log(this.id)
        this.currentUser.firstname = this.id
      });

    this.addTripService.getTrip(this.currentUser).subscribe(
      myTrip => {
        this.currentTrip= myTrip ;
        console.log(this.currentTrip[0].tripName)
        console.log(this.currentUser)
      }
    );

  }

  onNameChange (e) {
    console.log(e);
    this.currentTrip[0].tripName = e
  }

  onSourceChange (e) {
    this.currentTrip[0].source = e
  }

  onDestinationChange (e) {
    this.currentTrip[0].destination = e
  }
  onDescriptionChange (e) {
    this.currentTrip[0].description = e
  }
  onStartChange (e) {
    this.currentTrip[0].startDate = e
  }
  onEndChange (e) {
    this.currentTrip[0].endDate = e
  }
  onBudgetChange (e) {
    this.currentTrip[0].budget = e
  }
  onPeopleChange (e) {
    this.currentTrip[0].numOfPeople = e
  }
  onInterestChange (e) {
    this.currentTrip[0].interests = e
  }




  editTrip(){
    console.log(this.currentTrip)
    console.log(this.currentTrip[0]._id)

    this.UpdateStatus = 'successful';
    this.addTripService.updateTrip(this.currentTrip[0])
      .subscribe(
        data => {
          this.alertService.success('Trip Updated', true);
          this.router.navigate(["/mytrips"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }


}

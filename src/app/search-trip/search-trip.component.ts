import { Component, OnInit } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {User} from '../models/usermodel';
import { FormBuilder, FormGroup , FormControl} from '@angular/forms';
import { AddTripService } from '../services/addtrip.service';

@Component({
  selector: 'app-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.css'],
})
export class SearchTripComponent implements OnInit {
  userForm = new FormGroup({
    source: new FormControl(),
    destination: new FormControl(),
    travelDate: new FormControl(),
    returnDate: new FormControl(),
    switchValue: new FormControl(),
    budget: new FormControl(),
    noofpeople: new FormControl(),
    interests: new FormControl()
  });
  isFlexible: any;
  searchSource: any;
  searchDestination: any;
  searchTravelDate: any;
  searchReturnDate: any;
  searchBudget: any;
  searchNoofpeople: any;
  searchInterests: any;
  myForm: FormGroup;
  model: any = {};
  term: any;
  public today;
  public trip: Trip = new Trip();
  public trip2: Trip = new Trip();
  public trip3: Trip = new Trip();
  public trip4: Trip = new Trip();
  public trip5: Trip = new Trip();
  user: User = new User();
  public triptest;


  /*public trips: Trip[] = [this.trip, this.trip2, this.trip3, this.trip4, this.trip5];*/
  public trips;
  public tripsIamAttending: Trip[] = [ this.trip2, this.trip];
  onFormSubmit(): void {
    this.searchSource = this.userForm.get('source').value;
    this.searchDestination = this.userForm.get('destination').value;
    this.searchTravelDate = this.userForm.get('travelDate').value;
    this.searchReturnDate = this.userForm.get('returnDate').value;
    this.searchBudget = this.userForm.get('budget').value;
    this.searchNoofpeople = this.userForm.get('noofpeople').value;
    this.searchInterests = this.userForm.get('interests').value;
    this.isFlexible = this.userForm.get('switchValue').value;
    console.log("the value should appear here");
    console.log(this.searchInterests);
    this.formatAndValidateInput();
  }
  formatAndValidateInput(): void {
    this.searchSource = this.searchSource.toLowerCase();
    this.searchDestination = this.searchDestination.toLowerCase();
    this.searchInterests = this.searchInterests.toLowerCase();
    this.searchTravelDate = this.searchTravelDate.replace(".","-");
    if (this.searchBudget.isNumber()) {
    }else {
      alert("Please Enter a valid Number for Budget");
    }
  }
  constructor(fb: FormBuilder, private  tripService:AddTripService ) {
    this.myForm = fb.group({
      'firstName' : [''],
      'lastName' : [''],
    });
  }
  ngOnInit() {
    this.isFlexible = false;
    console.log("search Trip Init");
    this.today = new Date().toJSON().slice(0,10).replace(/-/g,'.');
    console.log(this.today);
    /*this.destination.valueChanges.subscribe(value => {
      this.term = value;
    });*/





    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    currentUser = json.user;

    this.tripService.searchTrips(currentUser).subscribe(
      searchTrips => {this.trips = searchTrips});
  }

}

import { Component, OnInit } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {User} from '../models/usermodel';
import { FormBuilder, FormGroup , FormControl} from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import { SearchPipe } from '../search-pipe';

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
    budget: new FormControl(),
    noofpeople: new FormControl(),
    interests: new FormControl()
  });
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
  public trip: Trip = new Trip();
  public trip2: Trip = new Trip();
  public trip3: Trip = new Trip();
  public trip4: Trip = new Trip();
  public trip5: Trip = new Trip();
  user: User = new User();


  public trips: Trip[] = [this.trip, this.trip2, this.trip3, this.trip4, this.trip5];
  public tripsIamAttending: Trip[] = [ this.trip2, this.trip];
  onFormSubmit(): void {
    this.searchSource = this.userForm.get('source').value;
    this.searchDestination = this.userForm.get('destination').value;
    this.searchTravelDate = this.userForm.get('travelDate').value;
    this.searchReturnDate = this.userForm.get('returnDate').value;
    this.searchBudget = this.userForm.get('budget').value;
    this.searchNoofpeople = this.userForm.get('noofpeople').value;
    this.searchInterests = this.userForm.get('interests').value;
  }
  constructor(fb: FormBuilder){
    this.myForm = fb.group({
      'firstName' : [''],
      'lastName' : [''],
    });
  }
  ngOnInit() {

    /*this.destination.valueChanges.subscribe(value => {
      this.term = value;
    });*/

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

    this.trip3.interests= [Interest.Arts];
    this.trip3.tripName = "To the Muesum";
    this.trip3.budget = 30;
    this.trip3.description = "Some description about the trip";
    this.trip3.destination = "Paris";
    this.trip3.source = "Munich";
    this.trip3.date= "30.07.2017";
    this.trip3.user = this.user;

    this.trip4.interests= [Interest.Music];
    this.trip4.tripName = "To Austria";
    this.trip4.budget = 30;
    this.trip4.description = "Some description about the trip";
    this.trip4.destination = "Austria";
    this.trip4.source = "Munich";
    this.trip4.date= "30.07.2017";
    this.trip4.user = this.user;

    this.trip5.interests= [Interest.Music];
    this.trip5.tripName = "To London";
    this.trip5.budget = 30;
    this.trip5.description = "Some description about the trip";
    this.trip5.destination = "London";
    this.trip5.source = "Russia";
    this.trip5.date= "30.07.2017";
    this.trip5.user = this.user;
  }

}

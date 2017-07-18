/**
 * Created by narinmahmuti on 05/07/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Trip } from '../models/tripmodel';
import { User } from '../models/usermodel';

@Injectable()
export class AddTripService {
  constructor(private http: Http) { }

  addTrip(trip:Trip)
  {
    return this.http.post('/api/user/addtrip', trip, this.jwt()).map((response: Response) => response.json());
  }

  getAllParticipants(tripId:String)
  {
    return this.http.get('/api/user/get-all-participants', this.jwtWithParam(tripId)).map((response: Response) => response.json());
  }
  searchTrips( user:User )
  {
    return this.http.get('/api/user/searchtrips', this.jwt()).map((response: Response) => response.json());
  }

  myTrips(user:User)
  {
    return this.http.get('/api/user/mytrips',this.jwt()).map((response: Response) => response.json());
  }

  tripsImAttending(user:User)
  {
    return this.http.get('/api/user/trips-im-attending',this.jwt()).map((response: Response) => response.json());
  }

  // User joins a trip
  ManagejoinTrip(trip: any) {
    console.log('I am in join trip service');
    return this.http.post('/api/user/jointrip', trip, this.jwt()).map((response: Response) => response.json());
  }
  leaveTrip(trip: any) {
    console.log('I am in leave service');
    return this.http.post('/api/user/leavetrip', trip, this.jwt()).map((response: Response) => response.json());
  }

  deleteTrip(trip:Trip) {
    console.log('im in deleteTrip service')
    return this.http.post('/api/user/deletetrip', trip, this.jwt()).map((response: Response) => response.json());
  }



  updateTrip(trip: Trip) {
    return this.http.post('/api/user/updateTrip',  trip, this.jwt()).map((response: Response) => response.json());
  }

  getTrip(user:User){
    return this.http.post('/api/user/gettrip', user, this.jwt()).map((response: Response) => response.json());
  }



  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }




  private jwtWithParam(object : any) {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers,body:object});
    }
  }



}

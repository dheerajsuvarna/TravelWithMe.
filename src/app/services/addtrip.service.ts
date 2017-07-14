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

  searchTrips( trip: Trip )
  {
    console.log("Inside Search Trip Service");
    return this.http.post('/api/user/searchtrips', this.jwt()).map((response: Response) => response.json());
  }

  myTrips(user:User)
  {
    // var data = {
    //   user_id:user.email
    // };
    //
    // var config = {
    //   params: data,
    // };
    return this.http.get('/api/user/mytrips',this.jwt()).map((response: Response) => response.json());
  }
  // User joins a trip
  ManagejoinTrip(trip: Trip) {
    console.log('I am in addtrip service');
    return this.http.post('/api/user/jointrip', trip, this.jwt()).map((response: Response) => response.json());
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

}

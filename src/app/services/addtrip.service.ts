/**
 * Created by narinmahmuti on 05/07/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Trip } from '../models/tripmodel';
//import { User } from '../models/usermodel';

@Injectable()
export class AddTripService {
  constructor(private http: Http) { }

  addTrip(trip:Trip)
  {
    return this.http.post('/api/user/addtrip', trip).map((response: Response) => response.json());
  }


}

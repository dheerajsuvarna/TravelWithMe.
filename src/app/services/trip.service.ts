import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { TripModel } from '../models/trip.model';

@Injectable()
export class tripService {
  constructor(private http: Http) { }

  create(trip: TripModel,userId:string) {
    return this.http.post('/api/trip/addtrip', trip,userId).map((response: Response) => response.json());
  }



}

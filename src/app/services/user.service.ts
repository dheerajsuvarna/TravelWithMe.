import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/usermodel';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  createTemp(user: User) {

    return this.http.post('/api/user/signup', user).map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get('/api/user/getall', this.jwt()).map((response: Response) => response.json());
  }

  editprofile(user: User) {
    return this.http.post('/api/user/editprofile', user).map((response: Response) => response.json());
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

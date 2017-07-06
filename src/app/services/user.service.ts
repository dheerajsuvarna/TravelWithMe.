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

  confirmUser(user: User) {
    return this.http.post('/api/user/email-verification',user).map((response: Response) => response.json());
  }
  onUpdateProfile(user: User) {
    return this.http.post('/api/user/updateProfile',  user, this.jwt()).map((response: Response) => response.json());
  }
  getUserProfile(email: any) {
    return this.http.post('api/user/getProfile', email, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    console.log('in User services - jwt()');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}

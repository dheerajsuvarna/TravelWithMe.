/**
 * Created by narin on 17/06/17.
 */
import { Component, OnInit } from '@angular/core';
import { User } from '../models/usermodel';
import { UserService } from '../services/index';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'profile-management.component.html'
})

export class profileManagementComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: User;
 public test:string = '';

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    this.currentUser = json.user;
  }

  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe( currentUser => {this.currentUser = currentUser} );
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // var temp  = localStorage.getItem('currentUser');
    // var json = JSON.parse(temp);
    // this.currentUser = json.user;
    // this.currentUser.gender= json.gender;
    // this.currentUser.description =json.description;
    // this.currentUser.age= new Number(this.getAge(this.currentUser.birthdate));
  }
  OnUpdateProfile() {
    this.userService.onUpdateProfile(this.model).subscribe();
  }
}

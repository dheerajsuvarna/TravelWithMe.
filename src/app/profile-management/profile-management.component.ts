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

  constructor() {
  constructor(
  private router: Router,
  private userService: UserService,
  private alertService: AlertService)  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    this.currentUser = json.user;
    this.currentUser.gender = json.user.gender;
    this.currentUser.description = json.user.description;
 //   this.currentUser.age= new Number(this.getAge(this.currentUser.birthdate));

  }

  ngOnInit() {
  }

  editprofile(){
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Successfully Updated', true);
          this.router.navigate(['/editprofile']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

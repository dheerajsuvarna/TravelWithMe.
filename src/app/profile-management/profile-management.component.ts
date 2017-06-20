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

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    this.currentUser = json.user
   // this.currentUser.description = "We should bring this value from DB or store it";
    //this.currentUser.age= new Number(this.getAge(this.currentUser.birthdate));

  }

  ngOnInit() {
  }

  editProfile(){
    //fill this accordingly later
  }
}

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
  currentUser: User= null;
 public test:string = '';



  constructor() {
    this.test="sdfsdf";
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
  }

  editProfile(){
    //fill this accordingly later
  }
}

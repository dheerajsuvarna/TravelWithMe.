
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../models/usermodel';
import { UserService } from '../services/index';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile-management.component.html'
})

export class ProfileManagementComponent implements OnInit {
  currentUser: User;
  loadedFeature = '';
  OnNavigate(feature: string) {
    console.log('in management profile');
    this.loadedFeature = feature;

  }
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const  temp  = localStorage.getItem('currentUser');
    const json = JSON.parse(temp);
    this.currentUser = json.user;
    this.loadedFeature = 'My Profile';
  }
  ngOnInit() {
  }

}

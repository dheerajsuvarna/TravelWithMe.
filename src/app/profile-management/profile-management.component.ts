/**
 * Created by narin on 17/06/17.
 */
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
  @Output() featureSelected = new EventEmitter<string>();
  OnSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
    console.log('in management profile');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    this.currentUser = json.user;
  }
  ngOnInit() {
  }

}

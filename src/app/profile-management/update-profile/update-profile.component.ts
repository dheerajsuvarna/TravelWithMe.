/**
 * Created by nilu on 03/07/17.
 */
/**
 * Created by narin on 17/06/17.
 */
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/usermodel';
import { UserService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../services/index';

@Component({
  moduleId:    module.id,
  selector:    'app-update-profile',
  templateUrl: './update-profile.component.html'
})

export class UpdateProfileComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: User;
  UpdateStatus: string;


  getAge(dateString) {
    console.log("in getAge");
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
    console.log('in nkOninit update profile');
    this.getUserProfile();
  }
  getUserProfile() {
    console.log('in getuserprofile', this.currentUser.email);
    var sendData = {
      email : this.currentUser.email
    };
    this.userService.getUserProfile(sendData)
      .subscribe(
        currentUser => {
          this.currentUser = currentUser;
          this.currentUser.age =  Number(this.getAge(this.currentUser.birthdate));
          console.log('******** Current User: ', this.currentUser);
        }
        );
  }
  OnUpdateProfile() {
    console.log('In Update profile');
    this.UpdateStatus = 'successful';
    console.log('*****in UodateProfile', this.currentUser);
    this.userService.onUpdateProfile(this.currentUser).subscribe();
  }
}

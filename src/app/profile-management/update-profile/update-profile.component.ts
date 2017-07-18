
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { User } from '../../models/usermodel';
import { UserService } from '../../services/index';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService } from '../../services/index';
import {routerTransition} from "../../router.animations";

// import {NgForm} from '@angular/forms';

@Component({
  moduleId:    module.id,
  selector:    'app-update-profile',
  templateUrl: './update-profile.component.html',
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class UpdateProfileComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: User;
  UpdateStatus: string;
  fileValid: boolean;


  getAge(dateString) {
    // console.log("in getAge");
    const today = new Date();
    const birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const temp  = localStorage.getItem('currentUser');
    const json = JSON.parse(temp);
    this.currentUser = json.user;
  }

  ngOnInit() {
    console.log('******in Oninit update profile');
    this.getUserProfile();

  }
  getUserProfile() {
    console.log('******in getUserProfile update profile');
    const sendData = {
      email : this.currentUser.email
    };
    this.userService.getUserProfile(sendData)
      .subscribe(
        currentUser => {
          this.currentUser = currentUser;
          this.currentUser.age =  +this.getAge(this.currentUser.birthdate);
           console.log('******** Current User: ', this.currentUser);
        },
        error => {
          this.alertService.error(error._body);
          console.log('Error=====>', error );
          this.loading = false;
        }
        );
  }
  OnUpdateProfile() {
    this.UpdateStatus = 'successful';
    this.userService.onUpdateProfile(this.currentUser)
      .subscribe(
        data => {
          this.alertService.success('Profile Updated', true);
        },
        error => {
          this.alertService.error(error._body);
          this.loading = false;
        });
  }

  UploadAvatar() {
    console.log('**********', this.currentUser.image);
    this.userService.uploadAvatar(this.currentUser)
      .subscribe(
        data => {
          this.alertService.success('Imaged Uploaded', true);
          this.loading = true;
          this.fileValid = false;
        },
        error => {
          this.alertService.error(error._body);
          this.loading = true;
        }
      )
  }
  getImage(data) {
    if (data) {
      return data;
    } else {
      if (this.currentUser.gender === 'Male') {
        return '../../assets/img/avatar1.png';
      } else {
        return '../../assets/img/avatar2.png';
      }
    }
  }
  getInput(fileInput) {
    this.fileValid  = false;
    const reader = new FileReader();
    reader.onload = ((e: any) => {
      this.currentUser.image = e.target.result;
      this.fileValid = true;
    });
    if (fileInput.target.files[0].size > 1024 * 50) {
      this.alertService.error('Choose a smaller file with 50kb size');
    } else {
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}

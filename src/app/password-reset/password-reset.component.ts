import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../services/index';

import {Router} from "@angular/router";
import {User} from "../models/usermodel";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  loading = false;
  constructor( private userService: UserService,
               private route:Router,private alertService: AlertService) { }

  ngOnInit() {

    var s = this.route.url;
    var token = s.split("/");
    var user = new User ();

    user.firstname = token[2];


    this.userService.resetPassword(user).subscribe(
      data => {
        this.alertService.success('A reset link was sent to your Email, please check your inbox!', true);

      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}

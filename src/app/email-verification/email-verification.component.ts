import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../services/index';

import {Router} from '@angular/router';
import {User} from '../models/usermodel';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  loading = false;



  constructor(
    private userService: UserService,
  private route:Router,private alertService: AlertService
  )
  {

  }
  ngOnInit()
  {
    var s = this.route.url;
    var token = s.split("/");
    var user = new User ();

    user.firstname = token[2];


    this.userService.confirmUser(user).subscribe(
      data => {
        this.alertService.success('Your Account Was Verified Successfully!', true);
         this.route.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}

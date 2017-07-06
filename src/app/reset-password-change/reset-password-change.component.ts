import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/index';
import {UserService} from  '../services/user.service'
import {Router} from "@angular/router";
import {User} from "../models/usermodel";

@Component({
  selector: 'app-reset-password-change',
  templateUrl: './reset-password-change.component.html',
  styleUrls: ['./reset-password-change.component.css']
})
export class ResetPasswordChangeComponent implements OnInit {

  model: any = {};
  loading = false;
  constructor( private userService: UserService,
               private route:Router,private alertService: AlertService) { }


  ngOnInit() {
  }

  resetChange() {
    this.loading = true;
    var  user = new User ();
    user.password= this.model.password;
    var s = this.route.url;
    var token = s.split("/");
    user.firstname = token[2];

    this.userService.resetPasswordChange(user)
      .subscribe(
        data => {

          this.alertService.success("Password reset successfully");
          this.loading = false;
          this.route.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

}

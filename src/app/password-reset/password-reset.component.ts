import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/index';
import {UserService} from  '../services/user.service'
import {Router} from '@angular/router';
import {User} from '../models/usermodel';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor( private userService: UserService,
               private route:Router,private alertService: AlertService) { }


  reset() {
    this.loading = true;
  var  user = new User ();
  user.email = this.model.email;

    this.userService.resetPassword(user)
      .subscribe(
        data => {
          // this.route.navigate([this.returnUrl]);
          this.alertService.success("Please check your Inbox");
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  ngOnInit() {

  }
  // ngOnInit() {
  //
  //   var s = this.route.url;
  //   var token = s.split("/");
  //   var user = new User ();
  //
  //   user.firstname = token[2];
  //
  //
  //   this.userService.resetPassword(user).subscribe(
  //     data => {
  //       this.alertService.success('A reset link was sent to your Email, please check your inbox!', true);
  //
  //     },
  //     error => {
  //       this.alertService.error(error);
  //       this.loading = false;
  //     });
  // }

}

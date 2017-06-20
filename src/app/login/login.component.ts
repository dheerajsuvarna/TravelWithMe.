/**
 * Created by nilu on 15/06/17.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //console.log("ret", this.returnUrl);
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email_address, this.model.password)
      .subscribe(
        data => {
          console.log('successfully logged in', data);
          window.location.reload();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('error in login ', error);
          this.alertService.error(error);
          this.loading = false;
        });

  }
}

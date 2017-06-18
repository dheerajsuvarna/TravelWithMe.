/**
 * Created by narin on 17/06/17.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'addTrip.component.html'
})

export class addTripComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor() {}

  ngOnInit() {
  }

  addTrip(){
    //fill this accordingly later
  }
}

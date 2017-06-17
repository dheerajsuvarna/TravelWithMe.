import { Component, OnInit } from '@angular/core';
import {isBoolean} from "util";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public  loggedIn;

  constructor() {

  }

 public logout() {
   localStorage.removeItem('currentUser');

   this.ngOnInit();
  }

  ngOnInit() {
    this.loggedIn = localStorage.getItem("currentUser")!=null;
  }

}

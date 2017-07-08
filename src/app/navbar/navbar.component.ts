import { Component, OnInit } from '@angular/core';
import { User } from '../models/usermodel';
import { UserService } from '../services/index';
import {isBoolean} from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public  loggedIn;
  currentUser: User;
  //users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

 public logout() {
   localStorage.removeItem('currentUser');
   window.location.reload();

   this.ngOnInit();
  }

  ngOnInit() {
    this.loggedIn = localStorage.getItem('currentUser') != null;

  }

  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => { this.users = users; });
  // }
}

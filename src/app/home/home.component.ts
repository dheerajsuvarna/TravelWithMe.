import { Component, OnInit } from '@angular/core';

import { User } from '../models/usermodel';
import { UserService } from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    console.log('Home component called')
    this.loadAllUsers();
  }


  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}

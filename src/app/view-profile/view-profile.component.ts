import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../services/index';
import { User } from '../models/usermodel';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
   currentUser: User;
  constructor(private userService: UserService) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    this.currentUser = json.user;
    this.currentUser.gender= json.gender;
    this.currentUser.description = "We should bring this value from DB or store it";
    this.currentUser.age= new Number(this.getAge(this.currentUser.birthdate));
    // this.currentUser.age= new Number(this.getAge(this.currentUser.birthdate));
  }
  ngOnInit() {
  }

}

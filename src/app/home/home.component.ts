import { Component, OnInit,HostBinding  } from '@angular/core';
import {query, stagger, animate, style, transition, trigger} from '@angular/animations';
import { User } from '../models/usermodel';
import { UserService } from '../services/index';
import {routerTransition} from '../router.animations';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})

export class HomeComponent implements OnInit {
  // users: User[] = [];

  currentUser: User;
  loading: boolean = true;
  constructor(private userService: UserService,private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
     var json = JSON.parse(temp);
    this.currentUser = json.user;
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
  ngOnInit() {
    // this.loadAllUsers();
  }


  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => { this.users = users; });
  // }
}

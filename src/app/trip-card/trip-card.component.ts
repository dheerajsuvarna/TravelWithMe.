import { Component, OnInit,Input } from '@angular/core';
import {Trip} from '../models/tripmodel';
import {Interest} from '../../models/Enums/Interest';
import {isNullOrUndefined, isUndefined} from "util";



@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

 @Input() trip:Trip;
  imageURI:String;
  constructor(  ) {
  }
  ngOnInit() {
    if(!isNullOrUndefined(this.trip)&&!isNullOrUndefined(this.trip.interests ))
      this.imageURI = '../../assets/tripImages/'+Interest[this.trip.interests[0]]+'.jpg';
  }

}

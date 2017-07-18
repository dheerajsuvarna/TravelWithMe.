import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AddTripService} from "../services/addtrip.service";

@Component({
  selector: 'app-chat-parent',
  templateUrl: './chat-parent.component.html',
  styleUrls: ['./chat-parent.component.css']
})
export class ChatParentComponent implements OnInit {

  public chatIdParent ;
  public  chatName;
  constructor( private route:Router,private  addTripService:AddTripService) { }

  ngOnInit() {
    var s = this.route.url;
    var token = s.split("/");
    this.chatIdParent = token[2];
    this.chatName = token[3].split("%20").join(" ");
  this.addTripService.getAllParticipants(token[2]);

  }


}

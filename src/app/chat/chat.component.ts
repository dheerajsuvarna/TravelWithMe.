import {Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input} from '@angular/core';
import { ChatService } from '../services/chat.service';
import * as io from "socket.io-client";
import {User} from "../models/usermodel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input() chatId: string;
  @Input() chatName: string;

  chats: any;
  joinned: boolean = false;
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };
  socket = io('http://localhost:3001');
  currentUser:User;

  constructor(private chatService: ChatService,
              private router: Router,
  ) {



  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var temp  = localStorage.getItem('currentUser');
    var json = JSON.parse(temp);
    this.currentUser = json.user;

    var user = { nickname: this.currentUser.firstname + '  ' + this.currentUser.lastname, room: this.chatId };
    if(user!==null) {
     this.getChatByRoom(user.room);
     this.msgData = { room: user.room, nickname: user.nickname, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
//      if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {
        if(data.message.room === this.chatId) {
        this.chats.push(data.message);
        this.msgData = { room: user.room, nickname: user.nickname, message: '' }
        this.scrollToBottom();
      }
    }.bind(this));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getChatByRoom(room) {
    var req = {room:room,user:this.currentUser};

    this.chatService.getChatByRoom(req).then((res) => {
      this.chats = res;
    }, (err) => {
      this.router.navigate(['/']);
    });
  }

  joinRoom() {
    var date = new Date();
    localStorage.setItem("currentUser", JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    var req = {message:this.msgData,user:this.currentUser};
    this.chatService.saveChat(req).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem("currentUser"));
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
    localStorage.removeItem("currentUser");
    this.joinned = false;
  }

}

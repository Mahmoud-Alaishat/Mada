import { Component, OnInit } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { MessageDto } from '../../Dto/MessageDto';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
    userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };

  constructor(private chatService: ChatService, private auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<UserInfo>("https://localhost:44328/api/User/GetUserInfo/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
        this.userData = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });  // calls the service method to get the new messages sent

  }
 


  send(): void {
    if (this.msgDto) {
      if (this.msgDto.msgText.length == 0 /*|| this.msgDto.user.length == 0*/) {
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.sender = obj.sender;
    newObj.receiver = obj.receiver;
    newObj.msgText = obj.msgText;
    console.log(newObj.msgText);
    this.msgInboxArray.push(newObj);

  }
}
interface UserInfo {
  firstName: string;
  lastName: string;
  profilePath: string;
  coverPath: string;
  address: string;
  relationship: string;
  bio: string;
}

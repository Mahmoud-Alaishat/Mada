import { Component, OnInit } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { MessageDto } from '../../Dto/MessageDto';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
    userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  receiver: string;
  chatId: string;
  receiverFullName: string;
  receiverImage: string;
  messages: ChatMessages[];
  messageData: Message = { id: 0, senderId: '', messageContent: '', chatId: 0, messageDate: undefined };
  newMessage: Message = { id: 0, senderId: '', messageContent: '', chatId: 0, messageDate: undefined };
  chatInfo: UserChats = {
      id: 0,
      firstName: '',
      lastName: '',
      profilePath: '',
      firstUserId: '',
      secondUserId: '',
      chatDate: undefined,
      friendId: '',
      friendFullName: '',
      friendImage: '',
      lastMessage: '',
      lastSenderId: ''
  }
  constructor(private chatService: ChatService, private auth: AuthService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.receiver = this.route.snapshot.paramMap.get('id');
    this.chatId = this.route.snapshot.paramMap.get('id2');
    this.http.get<UserInfo>("https://localhost:44328/api/User/GetUserInfo/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
        this.userData = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.http.get<UserChats>("https://localhost:44328/api/User/GetChatById/" + this.chatId, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserChats) => {
        this.chatInfo = response;
        if (this.chatInfo.firstUserId != this.auth.Id) {
          this.chatInfo.friendId = this.chatInfo.firstUserId
        }
        else {
          this.chatInfo.friendId = this.chatInfo.secondUserId;
        }
        console.log(this.chatInfo.friendId);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });  // calls the service method to get the new messages sent

    this.http.get<FullNameById>("https://localhost:44328/api/User/GetFullNameByUserId/" + this.receiver, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: FullNameById) => {
        this.receiverFullName = response.fullName;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.http.get<UserImage>("https://localhost:44328/api/User/GetUserImage/" + this.receiver, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserImage) => {
        this.receiverImage = response.profilePath;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.http.get<ChatMessages[]>("https://localhost:44328/api/User/GetMessagesByChatId/" + this.chatId, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: ChatMessages[]) => {
        this.messages = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
 
  }
 


  send(): void {
    if (this.msgDto) {
      if (this.msgDto.msgText.length == 0 /*|| this.msgDto.user.length == 0*/) {
        window.alert("Both fields are required.");
        return;
      } else {
        this.msgDto.sender = this.auth.Id;
        this.msgDto.receiver = this.receiver;
        this.msgDto.chatId = parseInt(this.chatId);
        this.msgDto.messageDate = new Date();
        console.log(this.msgDto);

        this.chatService.broadcastMessage(this.msgDto);                 // Send the message via a service
        this.messageData.chatId = parseInt(this.chatId);
        this.messageData.senderId = this.auth.Id;
        this.messageData.messageContent = this.msgDto.msgText;
        this.messageData.messageDate = new Date();
        this.http.post<Message>("https://localhost:44328/api/User/saveMessage", this.messageData, {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        }).subscribe({
          next: (response: Message) => {
            console.log(response);
          },
                error: (err: HttpErrorResponse) => console.log("no data")
              })
        
        this.msgDto.msgText = "";

      }
    }
  }

  

  addToInbox(obj: MessageDto) {
    const newObj = new MessageDto();
    newObj.sender = obj.sender;
    newObj.receiver = obj.receiver;
    newObj.msgText = obj.msgText;
    this.newMessage.senderId = this.auth.Id;
    this.newMessage.messageContent = obj.msgText;
    this.newMessage.chatId = parseInt(this.chatId);
    this.newMessage.messageDate = new Date();
    this.msgInboxArray.push(newObj);
    console.log(this.msgInboxArray);
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

interface FullNameById {
  fullName: string;
}

interface UserImage {
  profilePath: string;
}

interface ChatMessages {
  senderId: string;
  messageContent: string;
  messageDate: Date;
}

interface Message {
  id: number;
  senderId: string;
  messageContent: string;
  chatId: number;
  messageDate: Date;
}

interface UserChats {
  id: number;
  firstName: string;
  lastName: string;
  profilePath: string;
  firstUserId: string;
  secondUserId: string;
  chatDate: Date;
  friendId: string;
  friendFullName: string;
  friendImage: string;
  lastMessage: string;
  lastSenderId: string;
}

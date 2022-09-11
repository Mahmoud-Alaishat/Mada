import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  username: string;
  userChats: UserChats[];
  friendId: string = '';
  friendImage: string;
  friendFName: string;
  names: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private http: HttpClient,private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
    (function (window, document, undefined) {
      'use strict';
      if (!('localStorage' in window)) return;
      var nightMode = localStorage.getItem('gmtNightMode');
      if (nightMode) {
        document.documentElement.className += ' night-mode';
      }
    })(window, document);

    (function (window, document, undefined) {

      'use strict';

      // Feature test
      if (!('localStorage' in window)) return;

      // Get our newly insert toggle
      var nightMode = document.querySelector('#night-mode');
      if (!nightMode) return;

      // When clicked, toggle night mode on or off
      nightMode.addEventListener('click', function (event) {
        event.preventDefault();
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
          localStorage.setItem('gmtNightMode', 'true');
          return;
        }
        localStorage.removeItem('gmtNightMode');
      }, false);

    })(window, document);
    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.http.get<UserInfo>("https://localhost:44328/api/User/GetUserInfo/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
        this.userData = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.username = this.auth.getUserName();

    this.http.get<UserChats[]>("https://localhost:44328/api/User/GetChatsByUserId/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserChats[]) => {
        this.userChats = response;
        for (let i = 0; i < this.userChats.length; i++) {
          if (this.userChats[i].firstUserId != this.auth.Id) {
            this.userChats[i].friendId = this.userChats[i].firstUserId
          }
          else {
            this.userChats[i].friendId = this.userChats[i].secondUserId;
          }
          this.http.get<FullNameById>("https://localhost:44328/api/User/GetFullNameByUserId/" + this.userChats[i].friendId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: FullNameById) => {
              this.userChats[i].friendFullName = response.fullName;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })
         
          this.http.get<UserImage>("https://localhost:44328/api/User/GetUserImage/" + this.userChats[i].friendId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: UserImage) => {
              this.userChats[i].friendImage = response.profilePath;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })
          this.http.get<LastMessage>("https://localhost:44328/api/User/GetLastMessageByChatId/" + this.userChats[i].id, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: LastMessage) => {
              this.userChats[i].lastMessage = response.messageContent;
              this.userChats[i].lastSenderId = response.senderId;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })
        }
       
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  isToday(date: Date): boolean {
    var today = new Date();

    var dateTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


    var d = new Date(dateTime).toLocaleDateString().split('/');
    if (d[0].length == 1) {
      d[0] = "0" + d[0];
    }
    if (d[1].length == 1) {
      d[1] = "0" + d[1];
    }
    var result = d[0] + "/" + d[1] + "/" + d[2]
    if (result == date.toString()) {
      return true;
    }
    else {
      return false;
    }
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

interface FullNameById {
  fullName: string;
}


interface UserImage {
  profilePath: string;
}

interface LastMessage {
  messageContent: string;
  senderId: string
}

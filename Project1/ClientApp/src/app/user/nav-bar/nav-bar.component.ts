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
          this.http.get<UserFirstName>("https://localhost:44328/api/User/GetUserFirstName/" + this.userChats[i].friendId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: UserFirstName) => {
              this.userChats[i].friendFName = response.firstName;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })
          this.http.get<UserLastName>("https://localhost:44328/api/User/GetUserLastName/" + this.userChats[i].friendId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: UserLastName) => {
              this.userChats[i].friendLName = response.lastName;
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




  showDate(chatDate: Date): string {

    var diffDays = new Date().getDate() - chatDate.getDate(),
      diffMonths = new Date().getMonth() - chatDate.getMonth(),
      diffYears = new Date().getFullYear() - chatDate.getFullYear();

  if (diffYears == 0 && diffDays == 0 && diffMonths == 0) {
    return "1"; //Today
  } else if (diffYears == 0 && diffDays == 1) {
    return "2"; //Yesterday
  } 
   else if (diffYears == 0 && (diffDays < -1 && diffDays > -7)) {
    return "3"; //This week names[chatDate.getDay()];
  }  else {
    return "4"; //After a week or more
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
  friendFName: string;
  friendLName: string;
  friendImage: string;
}

interface UserFirstName {
  firstName: string;
}

interface UserLastName {
  lastName: string;
}

interface UserImage {
  profilePath: string;
}

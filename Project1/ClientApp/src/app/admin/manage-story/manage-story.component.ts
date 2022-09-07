import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-manage-story',
  templateUrl: './manage-story.component.html',
  styleUrls: ['./manage-story.component.css']
})
export class ManageStoryComponent implements OnInit {
 userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  userstory: UserStory[];
showUnblocked:boolean;
showBlocked:boolean;
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

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

    this.http.get<UserStory[]>("https://localhost:44328/api/Admin/UserStory/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserStory[]) => {
        this.userstory = response;
        console.log(this.userstory);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
 logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
 }
  setUkToggleDetails(id: number): void {
    document.getElementById("Details-btn-" + id).setAttribute('uk-toggle', 'target: #Details-' + id);
  }

  BlockStory(id:number) {
      this.http.post("https://localhost:44328/api/Admin/BlockStory/" + id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
            this.showBlocked = true;
            setTimeout(() => { this.showBlocked = false; }, 4000);
            window.location.reload();
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }

   UnBlockStory(id:number) {
      this.http.post("https://localhost:44328/api/Admin/UnBlockStory/" + id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
          this.showUnblocked = true;
          setTimeout(() => { this.showUnblocked = false; }, 4000);
           window.location.reload();
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
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

interface UserStory {
  storyId: number;
  firstName: string;
  lastName: string;
  email: string;
  storyContent: string;
  isBlocked:number;
}

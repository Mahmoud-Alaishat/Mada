import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  feedbacks: Feedback[];
  status: number = 0;
  showSuccess: boolean;
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


    this.http.get<Feedback[]>("https://localhost:44328/api/Admin/GetFeedBack/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Feedback[]) => {
        this.feedbacks = response;

      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    
  }


  selected(value: number) {

    this.status=value;
  
    if (this.status == 0) {
      this.http.get<Feedback[]>("https://localhost:44328/api/Admin/GetFeedBack/", {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe({
        next: (response: Feedback[]) => {
          this.feedbacks = response;

        },
        error: (err: HttpErrorResponse) => console.log("no data")
      })


    }
    else {
      this.http.get<Feedback[]>("https://localhost:44328/api/Admin/GetFeedbackByStatus/" + this.status, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe({
        next: (response: Feedback[]) => {
          this.feedbacks = response;

        },
        error: (err: HttpErrorResponse) => console.log("no data")
      })
    }
   
    
  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

 

  accept(Id: number) {
    this.http.post("https://localhost:44328/api/Admin/AcceptFeedback/" + Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
        this.showSuccess = true;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        setTimeout(() => { this.showSuccess = false; }, 4000);
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }

  reject(Id: number) {
    this.http.post("https://localhost:44328/api/Admin/RejectFeedback/" + Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {        
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
interface Feedback {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  feedbackText: string;
  statusName: string;
}

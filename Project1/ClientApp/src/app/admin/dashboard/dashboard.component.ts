import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  dashboardcounter: DashboardCounter = {
    countLike: 0,
    countComment: 0,
    countAd: 0,
    countPost: 0,
    images: 0,
    videos: 0,
    numbofWords: 0,
    countUser: 0
  }
  revenuedetails: RevenueDetails[];
  totalAllRevenue: number = 0;
  userandsubscription: UserAndSubscription[];

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

    this.http.get<DashboardCounter>("https://localhost:44328/api/Admin/DashboardCounters/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: DashboardCounter) => {
        this.dashboardcounter = response;

      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<RevenueDetails[]>("https://localhost:44328/api/Admin/RevenueDetails/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: RevenueDetails[]) => {
        this.revenuedetails = response;
        for (let i = 0; i < this.revenuedetails.length; i++) {
          this.totalAllRevenue = this.totalAllRevenue + this.revenuedetails[i].totalRevenue;
        }

      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<UserAndSubscription[]>("https://localhost:44328/api/Admin/GetUserAndSubscription/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserAndSubscription[]) => {
        this.userandsubscription = response;
        console.log(this.userandsubscription);

      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
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

interface DashboardCounter {
  countLike: number;
  countComment: number;
  countAd: number;
  countPost: number;
  images: number;
  videos: number;
  numbofWords: number;
  countUser: number;
}

interface RevenueDetails {
  service: string;
  totalRevenue: number;
  numberOfSubscribers: number;
  numberOfAllSubscribers: number;
}

interface UserAndSubscription {
  firstName: string;
  lastName: string;
  subscriptionId: number;
  subscribeDate: Date;
  price:number
}

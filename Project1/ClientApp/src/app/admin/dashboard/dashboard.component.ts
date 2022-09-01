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
  reports: Report[];
  feedbacks: Feedback[];

  post: PostDetails = {
      id: 0,
      content: '',
      postDate: undefined,
      userId: ''
  }
  userandsubscription: UserAndAd[];

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

    this.http.get<Report[]>("https://localhost:44328/api/Admin/GetLast2Reports/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Report[]) => {
        this.reports = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<Feedback[]>("https://localhost:44328/api/Admin/GetLast2FeedBack/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Feedback[]) => {
        this.feedbacks = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<UserAndAd[]>("https://localhost:44328/api/Admin/GetUserAndAd/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserAndAd[]) => {
        this.userandsubscription = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  trimFeedback(feedback: string): string {
   
    if (feedback.length > 9) {
      feedback = feedback.substring(0, 8);
      return feedback + "..";
    }
    return feedback;
  }

  GetPostById(Id: number) {
    console.log(Id);
    this.http.get<PostDetails>("https://localhost:44328/api/Admin/GetPostById/"+Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: PostDetails) => {
        this.post = response;
        console.log(this.post);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }

  setUkToggleDetails(id: number): void {
    document.getElementById("Details-btn-" + id).setAttribute('uk-toggle', 'target: #Details-' + id);
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

interface Report {
  id: number;
  userId: string;
  postId: string;
  firstName: string;
  lastName: string;
  email: string;
  content: string;
  statusId: number;
  statusName: string;
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

interface UserAndAd {
  firstName: string;
  lastName: string;
  content: string;
  id: number;
  postDate: Date;
  price: number;
  userId: string;
}

interface PostDetails {
  id: number;
  content: string;
  postDate: Date;
  userId: string;
}

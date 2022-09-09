import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
 isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  subscriptions: Subscription = {
      id: 0,
      name: '',
      price: null,
      description: '',
      feature: '',
      limitPost: null,
      duration: null
  }
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

  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  SelectedService() {
    let id = (<HTMLSelectElement>document.getElementById('selc')).value
    if (id != "") {
      this.http.get<Subscription>("https://localhost:44328/api/User/GetSubscriptionById/" + id, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe({
        next: (response: Subscription) => {
          this.subscriptions = response;
        },
        error: (err: HttpErrorResponse) => console.log("no data")
      })
    }
    
  }

  UpdateService(){
    let Description = (<HTMLInputElement>document.getElementById('Description')).value;
    let Price = (<HTMLInputElement>document.getElementById('Price')).value;
    let Duration = (<HTMLInputElement>document.getElementById('Duration')).value;
    let LimitPost = (<HTMLInputElement>document.getElementById('LimitPost')).value;
    let Feature = (<HTMLInputElement>document.getElementById('Feature')).value;
    if (Description != "") {
      this.subscriptions.description = Description;
    }
    if (Price != "") {
      this.subscriptions.price = parseInt(Price);
    }
    if (Duration != "") {
      this.subscriptions.duration = parseInt(Duration);
    }
    if (LimitPost != "") {
      this.subscriptions.limitPost = parseInt(LimitPost);
    }
    if (Feature != "") {    
      this.subscriptions.feature = Feature;
    }
    this.http.post("https://localhost:44328/api/Admin/UpdateService/" , this.subscriptions, {
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

interface Subscription {
  id: number;
  name: string;
  price: number;
  description: string;
  feature: string;
  limitPost: number;
  duration: number;
}

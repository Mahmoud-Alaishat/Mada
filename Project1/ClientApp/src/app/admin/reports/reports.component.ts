import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  year: boolean;
  manth: boolean;
  public years: Array<any> = [{ name: "Annual", value: 0 },
                              {name:"Monthly", value:1}  ];
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
  towSelect(){
    

  }
  oneSelect (){

  }
  
  selected (value:number) {
    //this.year = true;
    //this.manth = false;
    /* alert("year =>" + this.year);*/
    if (value == 1) {
      this.year = true;
      this.manth = true;

    }
    if (value == 2) {
      this.year = true;
      this.manth = false;

    }
    alert("year =>" + this.year + " /// manth =>" + this.manth +"////"+ value);
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

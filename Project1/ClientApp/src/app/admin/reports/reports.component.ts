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
  revenue: RevenueDetails[];
  revenue1: RevenueByDate[];
  obj1: RevenueByDate = { name: 'Ultimate', totalRevenue :0};
  obj2: RevenueByDate = { name: 'Gold', totalRevenue: 0 };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  year: boolean;
  manth: boolean;
  yearValue: any= "2021";
  monthValue: any= "";

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

    this.http.get<RevenueDetails[]>("https://localhost:44328/api/Admin/RevenueDetails", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: RevenueDetails[]) => {
 

        this.revenue = response;
        for (let i = 0; i < this.revenue.length; i++) {
          if (this.revenue[i].service == "Ad"  ) {
            this.revenue[i].service = "Advertisement";
            }
        }
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }

  selected(value: number) {

    if (value == 1) {
      this.year = true;
      this.manth = false;

    }
    if (value == 2) {
      this.year = true;
      this.manth = true;

    }

  }
  Year(y: number) {
    this.yearValue = y;
    this.monthValue = "%20";
    console.log(this.monthValue);
  }
  Month(m: number) {
    this.monthValue = m;
  }
  Revenue() {

    var count1=0;
    var count2 = 0;

      this.http.get<RevenueByDate[]>("https://localhost:44328/api/Admin/RevenueByDate/" + this.yearValue + "/" + this.monthValue, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe({
        next: (response: RevenueByDate[]) => {

          this.revenue1 = response;
          for (let i = 0; i < this.revenue1.length; i++) {
            if (this.revenue1[i].name == null) {
              this.revenue1[i].name = "Advertisement";
            }
            if (this.revenue1[i].name == "Ultimate") {
              count1++;
            }
            if (this.revenue1[i].name == "Gold") {
              count2++;
            }


          }

          if (count1 == 0) {
            this.revenue1.push(this.obj1);

          }
          if (count2 == 0) {
            this.revenue1.push(this.obj2);

          }



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

interface RevenueDetails {
   service: string;
   totalRevenue: number;

}
interface RevenueByDate {
  name: string;
  totalRevenue: number;

}

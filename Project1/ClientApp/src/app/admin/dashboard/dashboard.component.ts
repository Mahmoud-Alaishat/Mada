import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardcounter: DashboardCounter={
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
  totalAllRevenue: number;
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
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
        this.totalAllRevenue = this.revenuedetails[0].totalRevenue + this.revenuedetails[1].totalRevenue;

      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })



  }

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

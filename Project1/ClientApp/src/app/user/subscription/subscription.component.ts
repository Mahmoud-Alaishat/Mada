import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  public subscription: Subscription[];
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.http.get<Subscription[]>("https://localhost:44328/api/User/GetAllSubscriptions" , {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Subscription[]) => {
        this.subscription = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  }



interface Subscription {
  id: number;
  name: string;
  price: number;
  description: string;
  feature: string;
  limitPost: number;
}

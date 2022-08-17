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
  subscriptionid: Subscriptionid = { subscriptionId:0 };
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
        this.http.post<Subscriptionid>("https://localhost:44328/api/User/GetSubscriptionByUserId/" + this.auth.Id, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe({
        next: (response: Subscriptionid) => {
          console.log(response.subscriptionId)

          for (let i = 0; i < 3; i++) {
            if (this.subscription[i].id != response.subscriptionId)
              document.getElementById("sub-" + this.subscription[i].id).setAttribute('disabled', 'true');
            console.log(response.subscriptionId)
            console.log(this.subscription[i].feature.split(','))
            for (let j = 0; j < 4; j++) {
              document.getElementById("fu-" + j).innerHTML = this.subscription[i].feature.split(',')[j]
          }
          }
          
          
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
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

interface Subscriptionid {
  subscriptionId:number
}

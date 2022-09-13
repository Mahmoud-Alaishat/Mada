import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { element } from 'protractor';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  public subscriptions: Subscription[];
  public subsid: number;
  public NumPost: number;
  public selectecarid: number;
  public selectecarbalance: number;
  public selectedsubid: number;
  public priceselectedsub: number;
  public buy = { userId: '', subscriptionId: 0, price: 0, visaID: 0 }
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  visa: Bank[];
  totalBalance: number;
  showError: boolean;
  showSuccess: boolean;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.http.get<Subscription[]>("https://localhost:44328/api/User/GetAllSubscriptions", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Subscription[]) => {
        this.subscriptions = response.slice(0, 3);
        this.http.post<SubscriptionidPostNUm>("https://localhost:44328/api/User/GetSubPostNumByUserId/" + this.auth.Id, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
          .subscribe({
            next: (response: SubscriptionidPostNUm) => {
              this.subsid = response.subscriptionId;
              this.NumPost = response.numberOfPost;

            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<Bank[]>("https://localhost:44328/api/User/GetUserVisa/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Bank[]) => {
        this.visa = response;
        this.totalBalance = this.TotalBalance(response);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  TotalBalance(arr: Bank[]): number {
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].balance;
    }
    return sum;
  }

  chunkString(str: string) {
    return str.match(/.{1,4}/g).join('  -  ');
  }

  SplitFeatrue(feature: string): string[] {
    return feature.split(',');
  }

  selectedCardId(id, balance) {
    this.selectecarid = id;
    this.selectecarbalance = balance;
    console.log(this.selectecarid);
  }

  selectedSubId(id, price) {
    this.selectedsubid = id;
    this.priceselectedsub = price;
  }

  BuySubscription() {
    if (this.priceselectedsub > this.selectecarbalance) {
      this.showError = true;
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => { this.showError = false; }, 4000)
      return;
    }
    this.buy.userId = this.auth.Id;
    this.buy.price = this.priceselectedsub;
    this.buy.subscriptionId = this.selectedsubid;
    this.buy.visaID = this.selectecarid;
    if (this.selectecarid != null) {
      this.http.post("https://localhost:44328/api/User/BuySubscription/", this.buy, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
        .subscribe({
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
  ButtonDisabled(id: number) {
    if (this.subsid == 4) {
      document.getElementById(id.toString()).removeAttribute('disabled');

    }
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

interface SubscriptionidPostNUm {
  subscriptionId: number
  numberOfPost: number
}
interface Bank {
  id: number;
  cardNumber: string;
  cCV: number;
  expiryMonth: number;
  expiryYear: number;
  holderId: string;
  balance: number;
  holderName: string;
}

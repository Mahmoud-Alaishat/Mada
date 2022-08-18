import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  public subsid: number;
  public NumPost: number;
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  visa: Bank[];
  totalBalance: number;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.http.get<Subscription[]>("https://localhost:44328/api/User/GetAllSubscriptions", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Subscription[]) => {
        this.subscription = response;
        this.http.post<SubscriptionidPostNUm>("https://localhost:44328/api/User/GetSubPostNumByUserId/" + this.auth.Id, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
          .subscribe({
            next: (response: SubscriptionidPostNUm) => {
              this.subsid = response.subscriptionId;
              this.NumPost = response.numberOfPost;
              for (let i = 0; i < 3; i++) {
                if (this.subscription[i].id == response.subscriptionId) {
                  document.getElementById("sub-" + this.subscription[i].id).removeAttribute("disabled");
                }
              }
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

  getSelectItemThat(id) {
    console.log(id)
    console.log('------')
    document.getElementById('chkk-' + id).setAttribute("checked", "true");

    for (let i = 0; i < this.visa.length; i++) {
      if (this.visa[i].id != id) {
        console.log(this.visa[i].id)
        document.getElementById('chkk-' +this.visa[i].id).setAttribute('checked', 'false');
      }
      
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

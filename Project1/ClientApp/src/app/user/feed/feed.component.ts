import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Data } from 'popper.js';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  userData: UserInfo = {
      firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '',
      subscribeexpiry: null,
      subscriptionId: 0,
      numOfPost: 0
  };
  friends: MyFriends = { friendId: '', firstName: '', lastName: '', profilePath: '' };
  putLike: HitLike = { userId: '', postId: 0 }
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  friendsCount: number = 0;
  friendPosts: FriendPost[];
  last6friends: MyFriends = { friendId: '', firstName: '', lastName: '', profilePath: '' }  
  sendcomment: SendComment = { postId: 0, userId: '', content: '', item: '' };
  content = new FormControl();
  isShow: boolean
  visa: Bank[];
  totalBalance: number;
  public selectecarid: number;
  public selectecarbalance: number;
  sendPost: MakePost = {
    userId: '',
    content: '',
    typePost: 0,
    clicks: 0,
    isBlocked: 0,
    EndDate: new Date()
  }
  buyad: BuyAd = { price: 0, visaId: 0 }
  postcontent = new FormControl();
  postdate = new FormControl();
  postdate2: Date;
  showError: boolean;
  showSuccess: boolean;
  public subscriptions: Subscription[];
  isSubscriptionEnded:boolean;



  constructor(private http: HttpClient,private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
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
    this.http.get<UserCount>("https://localhost:44328/api/User/CountFriends/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserCount) => {
        this.friendsCount = response.count;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.http.get<MyFriends>("https://localhost:44328/api/User/MyFriends/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: MyFriends) => {
        this.friends = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.http.get<MyFriends>("https://localhost:44328/api/User/MyLast6Friends/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: MyFriends) => {
        this.last6friends = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<FriendPost[]>("https://localhost:44328/api/User/FriendPost/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: FriendPost[]) => {
        this.friendPosts = response;
        for (let index = 0; index < this.friendPosts.length; index++) {
          this.http.get<Attachment[]>("https://localhost:44328/api/User/PostAttachment/" + this.friendPosts[index].postId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: Attachment[]) => {
              this.friendPosts[index].attachment = response;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })

          this.http.get<Like[]>("https://localhost:44328/api/User/PostLike/" + this.friendPosts[index].postId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: Like[]) => {
              this.friendPosts[index].like = response;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })

          this.http.get<Comment[]>("https://localhost:44328/api/User/PostComment/" + this.friendPosts[index].postId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: Comment[]) => {
              this.friendPosts[index].comment = response;
              for (let indx = 0; indx < this.friendPosts[index].comment.length; indx++) {
                this.http.get<Reply[]>("https://localhost:44328/api/User/ReplyToComment/" + this.friendPosts[index].comment[indx].id, {
                  headers: new HttpHeaders({ "Content-Type": "application/json" })
                }).subscribe({
                  next: (response: Reply[]) => {
                    this.friendPosts[index].comment[indx].reply = response;
                  },
                  error: (err: HttpErrorResponse) => console.log("no data")
                })
              }

            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })
        }
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

  MakePost() {
    this.sendPost.userId = this.auth.Id;
    this.sendPost.content = this.postcontent.value;
    this.sendPost.typePost = 2;

    
    if (this.selectecarid == null && this.postdate.value == null) {
      console.log("is Post");
      this.http.get<Subscription[]>("https://localhost:44328/api/User/GetAllSubscriptions/", {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe({
        next: (response: Subscription[]) => {
          this.subscriptions = response.slice(0, 3);
          
        },
        error: (err: HttpErrorResponse) => console.log("no data")
      })
      console.log(this.subscriptions[0].limitPost);
      console.log(this.subscriptions[1].limitPost);
      console.log(this.subscriptions[2].limitPost);
      if (this.userData.subscriptionId == 1 && this.userData.numOfPost < this.subscriptions[0].limitPost) {
        console.log("Free");
        console.log(this.userData);
        console.log(this.subscriptions[0].limitPost);
        this.http.post("https://localhost:44328/api/User/MakePost/", this.sendPost, {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        }).subscribe({
          next: () => {
            this.showSuccess = true;
            setTimeout(() => { this.showSuccess = false; }, 4000)
            window.location.reload();
            
          },
          error: () => {
            console.log("Nooooo")
          }
        })
      }
      else if ((this.userData.subscriptionId == 2 && this.userData.numOfPost < this.subscriptions[1].limitPost) || (this.userData.subscriptionId == 2 && this.userData.subscribeexpiry < new Date())) {
        console.log("Ultmit");
        this.http.post("https://localhost:44328/api/User/MakePost/", this.sendPost, {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        }).subscribe({
          next: () => {
            this.showSuccess = true;
            setTimeout(() => { this.showSuccess = false; }, 4000)
          },
          error: () => {
            console.log("Nooooo")
          }
        })
      }
      else if (this.userData.subscriptionId == 3 && (this.userData.numOfPost < this.subscriptions[1].limitPost || this.userData.subscribeexpiry < new Date())) {
        console.log("Gold");
        this.http.post("https://localhost:44328/api/User/MakePost/", this.sendPost, {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        }).subscribe({
          next: () => {
            this.showSuccess = true;
            setTimeout(() => { this.showSuccess = false; }, 4000)
          },
          error: () => {
            console.log("Nooooo")
          }
        })
      }
      else {
        console.log("Not Posted");
        this.isSubscriptionEnded = true;
        setTimeout(() => { this.isSubscriptionEnded = false; }, 5000)
      }

      
    }
    else {
      this.sendPost.typePost = 3;
      this.buyad.visaId = this.selectecarid
      this.postdate2 = new Date(this.postdate.value);
      const msInDay = 24 * 60 * 60 * 1000;
      this.buyad.price = 2 * (Math.round(Math.abs(Number(this.postdate2) - Number(new Date())) / msInDay));
      this.sendPost.EndDate = this.postdate2;
      if (new Date() < this.postdate2) {
        this.http.post("https://localhost:44328/api/User/BuyAd/", this.buyad, {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        }).subscribe({
          next: () => {
            this.http.post("https://localhost:44328/api/User/MakePost/", this.sendPost, {
              headers: new HttpHeaders({ "Content-Type": "application/json" })
            }).subscribe({
              next: () => {
                this.showSuccess = true;
                setTimeout(() => { this.showSuccess = false; }, 4000)
              },
              error: () => {
                console.log("Something went wrong")
              }
            })
            //this.showError = false;
          },
          error: () => {
            console.log("Something went wrong")
          }
        })
        
      }
      else {
        this.showError = true;
        setTimeout(() => { this.showError = false;  }, 4000)
      }      
    }

  }

  TotalBalance(arr: Bank[]): number {
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].balance;
    }
    return sum;
  }
  selectedCardId(id, balance) {
    this.selectecarid = id;
    this.selectecarbalance = balance;
  }
  getHoursDiff(hour: number): number {

    return new Date().getHours() - hour;
  }

  isToday(date: Date): boolean {
    var today = new Date();

    var dateTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


    var d = new Date(dateTime).toLocaleDateString().split('/');
    if (d[0].length == 1) {
      d[0] = "0" + d[0];
    }
    if (d[1].length == 1) {
      d[1] = "0" + d[1];
    }
    var result = d[0] + "/" + d[1] + "/" + d[2]
    if (result == date.toString()) {
      return true;
    }
    else {
      return false;
    }
  }

  getPostId(id: string): string {
    return "post-" + id + "";
  }

  setUkTogglePost(id: string): void {
    document.getElementById("post-" + id).setAttribute('uk-toggle', 'target: #post-comment-' + id);
  }

  getPostIdLike(id: string): string {
    return "post-like-" + id + "";
  }

  setUkTogglePostLike(id: string): void {
    document.getElementById("post-like-" + id).setAttribute('uk-toggle', 'target: #post-like-' + id);
  }

  trimName(name: string, name1: string): string {
    var fullName = name + " " + name1;
    if (fullName.length > 9) {
      fullName = fullName.substring(0, 8);
      return fullName + "..";
    }
    return fullName;
  }
  deletePost(id: number) {
    this.http.delete("https://localhost:44328/api/User/DeletePost/" + id)
      .subscribe({
        next: () => {
          this.router.navigate(['user/feed'])
          window.location.reload();
        },
        error: () => {

        }
      })
  }

  HitLikes(postId: number) {
    this.putLike.postId = postId;
    this.putLike.userId = this.auth.Id;
    this.http.post<IdOfLike>("https://localhost:44328/api/User/HitLike", this.putLike, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: IdOfLike) => {
        if (response == null) {
          this.http.post("https://localhost:44328/api/User/InsertLike", this.putLike, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: () => {
              var a = (document.getElementById("likes-" + this.putLike.postId).innerHTML);
              a = a.split(" ", 2)[0];
              var likes = parseInt(a);
              document.getElementById("likes-" + this.putLike.postId).innerHTML = (likes + 1) + " Likes";

            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })

        }
        else {
          this.http.delete("https://localhost:44328/api/User/DeleteLike/" + response.id, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: () => {
              var a = (document.getElementById("likes-" + this.putLike.postId).innerHTML);
              a = a.split(" ", 2)[0];
              var likes = parseInt(a);
              document.getElementById("likes-" + this.putLike.postId).innerHTML = (likes - 1) + " Likes";
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })
        }

      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })


  }


  MakeComment(postId: number) {
    
    this.sendcomment.content = this.content.value;
    this.sendcomment.postId = postId;
    this.sendcomment.userId = this.auth.Id;
    this.sendcomment.item = null;


    this.http.post("https://localhost:44328/api/User/MakeComment/" , this.sendcomment, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
        alert("Yesss")

      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    

  }
  preventdefault(id: number) {
    document.getElementById("mutasem-" + id).addEventListener("click", function (event) {
      event.preventDefault()
    });
  }
  GetUserId(id:string) {
    return "https://localhost:44328/user/profile/"+id;
  }
  Hide(): boolean {
    var a = document.getElementById("chk");
    this.isShow = true;
    return this.isShow;
  }
  chunkString(str: string) {
    return str.match(/.{1,4}/g).join('  -  ');
  }

  SetHref(id: string) {
    if (this.auth.Id == id) {
      return "timeline";
    }
    else {
      return "profile/" + id;
    }
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
  subscribeexpiry: Date;
  subscriptionId: number;
  numOfPost: number;
}

interface UserCount {
  count: number;
}

interface FriendPost {
  userId: string;
  firstName: string;
  lastName: string;
  profilePath: string;
  postId: number;
  content: string;
  postDate: Date;
  attachment: Attachment[];
  comment: Comment[];
  like: Like[];
  typePost: number;

}

interface MyFriends {
  friendId: string;
  firstName: string;
  lastName: string;
  profilePath: string;
}

interface Attachment {
  item: string;
}
interface Comment {
  id: number;
  content: string;
  commentdat: Date;
  item: string;
  firstName: string;
  lastName: string;
  profilePath: string;
  reply: Reply[];
  userId: string;
}
interface Reply {
  firstName: string;
  lastName: string;
  content: string;
  profilePath: string;
  item: string;
  replaydate: Date;
  userId: string;
}

interface Like {
  id: string;
  firstName: string;
  lastName: string;
  profilePath: string;
}

interface HitLike {
  userId: string;
  postId: number;
}
interface IdOfLike {
  id: number;
}

interface SendComment {
  postId: number;
  userId: string;
  content: string;
  item: string;
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
interface MakePost {
  userId: string;
  content: string;
  typePost: number;
  clicks: number;
  isBlocked: number;
  EndDate: Date;
}

interface BuyAd {
  price: number;
  visaId: number;
}

interface Subscription {
  id: number;
  name: string;
  price: number;
  description: string;
  feature: string;
  limitPost: number;
}

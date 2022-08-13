import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  friends: MyFriends = { friendId: '', firstName: '', lastName:'',profilePath:'' }
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  friendsCount: number = 0;
  public posts: MyPosts[];
  currentDate: any;
  imgstyle: string[] = ["class='col-span-2'", "class= 'rounded-md w-full lg:h-44 object-cover'", "", "class= 'rounded-md w-full h-full'", "class= 'relative'", "class= 'rounded-md w-full h-full'"]
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin= this.auth.isAdmin();
    this.http.get<UserInfo>("https://localhost:44328/api/User/GetUserInfo/"+this.auth.Id, {
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
    this.currentDate = new Date().toLocaleString();

    this.http.get<MyPosts[]>("https://localhost:44328/api/User/MyPost/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: MyPosts[]) => {
        this.posts = response;
        for (let index = 0; index < this.posts.length; index++) {
          this.http.get<Attachment[]>("https://localhost:44328/api/User/PostAttachment/" + this.posts[index].id, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: Attachment[]) => {
              this.posts[index].attachment = response;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })

          this.http.get<Comment[]>("https://localhost:44328/api/User/PostComment/" + this.posts[index].id, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: Comment[]) => {
              this.posts[index].comment = response;
              for (let indx = 0; indx < this.posts[index].comment.length; indx++) {
                this.http.get<Reply[]>("https://localhost:44328/api/User/ReplyToComment/" + this.posts[index].comment[indx].id, {
                  headers: new HttpHeaders({ "Content-Type": "application/json" })
                }).subscribe({
                  next: (response: Reply[]) => {
                    this.posts[index].comment[indx].reply = response;
                    console.log(this.posts);
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
  }

  getHoursDiff(hour: number): number {

    return new Date().getHours() - hour;
  }

  isToday(date: Date): boolean {

    if (new Date() == date) {
      return true;
    }
   else{
      return false;
    }
  }
  isNextToThirdImg(index: number): boolean {
    if (index > 2) {
      return true;
    }
    return false;
  }
  getClass(index:number): string {
    if (index > 2) return "class='display:none'";
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

interface UserCount {
  count: number;
}

interface MyFriends {
  friendId: string;
  firstName: string;
  lastName: string;
  profilePath: string;
}

interface MyPosts {
  id: number;
  content: string;
  postDate: Date;
  attachment: Attachment[];
  comment: Comment[];
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
}
interface Reply {
  firstName: string;
  lastName: string;
  content: string;
  profilePath: string;
  item: string;
  replaydate: Date;
}
 

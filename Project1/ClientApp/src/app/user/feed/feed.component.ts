import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };

  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  public posts: FriendPost[];
  putLike: HitLike = { userId: '', postId: 0 }

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

    this.http.get<FriendPost[]>("https://localhost:44328/api/User/FriendPost/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: FriendPost[]) => {
        this.posts = response;
        for (let index = 0; index < this.posts.length; index++) {
          this.http.get<Attachment[]>("https://localhost:44328/api/User/PostAttachment/" + this.posts[index].postId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: Attachment[]) => {
              this.posts[index].attachment = response;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })

          this.http.get<Like[]>("https://localhost:44328/api/User/PostLike/" + this.posts[index].postId, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: Like[]) => {
              this.posts[index].like = response;
            },
            error: (err: HttpErrorResponse) => console.log("no data")
          })

          this.http.get<Comment[]>("https://localhost:44328/api/User/PostComment/" + this.posts[index].postId, {
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
  preventdefault(id: number) {
    document.getElementById("mutasem-" + id).addEventListener("click", function (event) {
      event.preventDefault()
    });
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
  Id: string;
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

import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth.service';
import { tap, withLatestFrom } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  friends: MyFriends = { friendId: '', firstName: '', lastName: '', profilePath: '' };
  putLike: HitLike = { userId: '', postId: 0 }
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  friendsCount: number = 0;
  posts: MyPosts[];
  commment: Comment[];
  last6friends: MyFriends = { friendId: '', firstName: '', lastName: '', profilePath: '' }
  sendcomment: SendComment = { postId: 0, userId: '', content: '', item: '' };
  sendreplay: SendReplay = { commentId: 0, userId: '', content: '', item: '' };
  content = new FormControl();
  //numberOfLikes = new BehaviorSubject(0);
  private numberOfLikes = new BehaviorSubject<Like[]>(null);
  numberOfLikes$ = this.numberOfLikes.asObservable();
  id: any;
  message: string;
  @Output() public onUploadFinished1 = new EventEmitter();
  commentImage: any = null;
  @Output() public onUploadFinished2 = new EventEmitter();

  replayImage: any = null;
  report: Report = { id: 0, postId: 0, statusId: 0, userId: '' };
  report2: Report = { id: 0, postId: 0, statusId: 0, userId: '' };
  isReported: boolean;
  postid: number;
  replyShow: boolean = false;
  commid: number;

  replayContent = new FormControl();
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.http.get<UserInfo>("https://localhost:44328/api/User/GetUserInfo/" + this.id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
        this.userData = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.http.get<UserCount>("https://localhost:44328/api/User/CountFriends/" + this.id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserCount) => {
        this.friendsCount = response.count;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.http.get<MyFriends>("https://localhost:44328/api/User/MyFriends/" + this.id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: MyFriends) => {
        this.friends = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    this.http.get<MyFriends>("https://localhost:44328/api/User/MyLast6Friends/" + this.id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: MyFriends) => {
        this.last6friends = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<MyPosts[]>("https://localhost:44328/api/User/MyPost/" + this.id, {
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

          this.http.get<Like[]>("https://localhost:44328/api/User/PostLike/" + this.posts[index].id, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          }).subscribe({
            next: (response: Like[]) => {
              this.posts[index].like = response;
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
          this.router.navigate(['user/timeline'])
          window.location.reload();
        },
        error: () => {

        }
      })
  }

  HitLikes(postId: number) {
    this.putLike.postId = postId;
    this.putLike.userId = this.id;
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
  uploadCommentImg = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file1', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44328/api/User/UploadCommentImg', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {

          if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished1.emit(event.body);
            this.commentImage = event.body['commentPath'];
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });

  }
  uploadReplayImg = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file2', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44328/api/User/UploadReplayImg', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {

          if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished2.emit(event.body);
            this.replayImage = event.body['replayPath'];
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });

  }
  setUkToggleReport(id: number): void {
    document.getElementById("repoet-btn-" + id).setAttribute('uk-toggle', 'target: #repoet-' + id);
  }
  MakeComment(postId: number) {

    this.sendcomment.content = this.content.value;
    this.sendcomment.postId = postId;
    this.sendcomment.userId = this.auth.Id;
    this.sendcomment.item = this.commentImage;

    this.http.post("https://localhost:44328/api/User/MakeComment/", this.sendcomment, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {


      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  MakeReplay(comentId: number) {

    this.sendreplay.content = this.replayContent.value;
    this.sendreplay.userId = this.auth.Id;
    this.sendreplay.commentId = comentId;
    this.sendreplay.item = this.replayImage;

    this.http.post("https://localhost:44328/api/User/MakeReplay/", this.sendreplay, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {


      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
    
  preventdefault(id: number) {
    document.getElementById("mutasem-" + id).addEventListener("click", function (event) {
      event.preventDefault()
    });
  }

  ReportPost(pid: number): void {
    this.report.postId = pid;
   
    this.report.statusId = 1;
    this.report.userId = this.auth.Id;
    this.http.post("https://localhost:44328/api/User/ReportPost", this.report, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
      next: () => {
        this.router.navigate(['user/profile'])
        window.location.reload();
      },
      error: () => {
      }
    })
  }
  getCommentId(id: number) {
    this.replyShow = true;
    this.commid = id;
    //  alert(this.commid);
  }
  getIdPost(id: number) {
 /*   alert(id);*/
    this.http.get<boolean>("https://localhost:44328/api/User/AreReport/" + this.auth.Id + "/" + id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: boolean) => {

        if (response == true) {
          this.isReported = false;
        }
        else
          this.isReported = true;
        //alert("response " + response);
        //alert("isReported " + this.isReported);


      },

      error: (err: HttpErrorResponse) => { console.log("no data") }
    })
  }
  SetHref(id: string) {
    if (this.auth.Id == id) {
      return "timeline";
    }
    else {
      return "profile/" + id;
    }
  }
  isVideo(fileName: string): boolean {
    var name = fileName.split('.').pop();
    if (name == "mp4") {
      return true;
    }
    return false;
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
  userId: string;
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
interface Report {
  id: number,
  postId: number;
  statusId: number;
  userId: string;
}
interface SendReplay {
  userId: string;
  commentId: number;
  content: string;
  item: string;
}


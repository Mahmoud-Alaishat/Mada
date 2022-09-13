import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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
      staticNumPost: 0,
      isFristPost: 0
  };
  friends: MyFriends = { friendId: '', firstName: '', lastName: '', profilePath: '' };

  putLike: HitLike = { userId: '', postId: 0 }
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  friendsCount: number = 0;
  friendPosts: FriendPost[];
  commment: Comment[];
  last6friends: MyFriends = { friendId: '', firstName: '', lastName: '', profilePath: '' }
  sendcomment: SendComment = { postId: 0, userId: '', content: '', item: '' };
  sendreplay: SendReplay = { commentId: 0, userId: '', content: '', item: '' };

  content = new FormControl();
  replayContent = new FormControl();
  isShow: boolean = false;
  visa: Bank[];
  totalBalance: number;
  public selectecarid: number;
  public selectecarbalance: number;
  sendPost: MakePost = { userId: '', content: '', typePost: 0, clicks: 0, isBlocked: 0, EndDate: new Date() }
  buyad: BuyAd = { price: 0, visaId: 0 }
  postcontent = new FormControl();
  postdate = new FormControl();
  postdate2: Date;
  showError: boolean;
  showSuccess: boolean;
  public subscriptions: Subscription[];
  isSubscriptionEnded: boolean;
  count: number = 5;
  numOfPost: NumOfPost = { numberOfPost: 0 }
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  attachments: Attachments[];
  isExceededLimit: boolean;
  @Output() public onUploadFinished1 = new EventEmitter();
  commentImage: any = null;
  @Output() public onUploadFinished2 = new EventEmitter();

  replayImage: any = null;
  report: Report = { id: 0, postId: 0, statusId: 0, userId: '' };
  report2: Report = { id: 0, postId: 0, statusId: 0, userId: '' };
  friendstory: FriendStory[];
  friendstorylast5: FriendStory[];
  isReported: boolean;
  postid: number;
  replyShow: boolean = false;
  commid: number;
  @Output() public onUploadFinished3 = new EventEmitter();
  storyImage: any;
  story: Story = {
    item: '',
    userId: '',
    storyDate: new Date(),
    isBlocked: 0,
    id: 0
  }
  feedbackcontent = new FormControl();
  feedback: Feedback = {
    id: 0,
    feedbackText: '',
    feedbackStatus: 0,
    userId: ''
  }
  mystory: FriendStory[];
  showStorySuccess: boolean;
    showSelectImage: boolean;
    showDeletedStory: boolean;


  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin = this.auth.isAdmin();


    /*lllllll*/
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

    this.http.get<NumOfPost>("https://localhost:44328/api/User/NumberOFPostByUserId/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: NumOfPost) => {
        this.numOfPost.numberOfPost = response.numberOfPost;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<FriendStory[]>("https://localhost:44328/api/User/GetFriendStory/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: FriendStory[]) => {
        this.friendstory = response;
        this.friendstorylast5 = response.slice(0, 5);
        
        for (let i = 0; i < response.length; i++) {
          if (response[i].userId == this.auth.Id) {
            this.mystory.push(response[i]);
            
          }
        }
        console.log(this.mystory);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    
  }

  MakePost() {
    this.sendPost.userId = this.auth.Id;
    this.sendPost.content = this.postcontent.value;
    this.sendPost.typePost = 2;
    if (this.selectecarid == null || this.postdate.value == null) {
      this.http.get<Subscription[]>("https://localhost:44328/api/User/GetAllSubscriptions/", {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe({
        next: (response: Subscription[]) => {
          this.subscriptions = response;
          if (this.userData.subscriptionId == 1 && this.numOfPost.numberOfPost < this.subscriptions[0].limitPost) {
            this.http.post("https://localhost:44328/api/User/MakePost/", this.sendPost, {
              headers: new HttpHeaders({ "Content-Type": "application/json" })
            }).subscribe({
              next: () => {
                this.http.get<PostId>("https://localhost:44328/api/User/GetLastPost/" + this.auth.Id, {
                  headers: new HttpHeaders({ "Content-Type": "application/json" })
                }).subscribe({
                  next: (response: PostId) => {
                    for (let i = 0; i < this.attachments.length; i++) {
                      this.attachments[i].postId = response.id;
                    }
                    this.http.post("https://localhost:44328/api/User/AddAttachment/", this.attachments, {
                      headers: new HttpHeaders({ "Content-Type": "application/json" })
                    }).subscribe();
                  },
                  error: (err: HttpErrorResponse) => console.log("no data")
                });

                this.showSuccess = true;
                setTimeout(() => { this.showSuccess = false; }, 4000);
                if (this.userData.isFristPost > 0) {
                   window.location.reload();

                }
              },
              error: () => {
                console.log("Someting went wrong")
              }
            })
          }
          else if ((this.userData.subscriptionId == 2 && this.numOfPost.numberOfPost <  this.userData.staticNumPost) || (this.userData.subscriptionId == 2 && this.userData.subscribeexpiry > new Date())) {
            this.http.post("https://localhost:44328/api/User/MakePost/", this.sendPost, {
              headers: new HttpHeaders({ "Content-Type": "application/json" })
            }).subscribe({
              next: () => {
                this.http.get<PostId>("https://localhost:44328/api/User/GetLastPost/" + this.auth.Id, {
                  headers: new HttpHeaders({ "Content-Type": "application/json" })
                }).subscribe({
                  next: (response: PostId) => {
                    for (let i = 0; i < this.attachments.length; i++) {
                      this.attachments[i].postId = response.id;
                    }
                    this.http.post("https://localhost:44328/api/User/AddAttachment/", this.attachments, {
                      headers: new HttpHeaders({ "Content-Type": "application/json" })
                    }).subscribe();
                  },
                  error: (err: HttpErrorResponse) => console.log("no data")
                });
                this.showSuccess = true;
                setTimeout(() => { this.showSuccess = false; }, 4000);
                if (this.userData.isFristPost > 0) {
                  window.location.reload();

                }
              },
              error: () => {
                console.log("Someting went wrong")
              }
            })
          }
          else if ((this.userData.subscriptionId == 3 && this.numOfPost.numberOfPost <  this.userData.staticNumPost) || (this.userData.subscriptionId == 3 && this.userData.subscribeexpiry > new Date())) {
            this.http.post("https://localhost:44328/api/User/MakePost/", this.sendPost, {
              headers: new HttpHeaders({ "Content-Type": "application/json" })
            }).subscribe({
              next: () => {
                this.http.get<PostId>("https://localhost:44328/api/User/GetLastPost/" + this.auth.Id, {
                  headers: new HttpHeaders({ "Content-Type": "application/json" })
                }).subscribe({
                  next: (response: PostId) => {
                    for (let i = 0; i < this.attachments.length; i++) {
                      this.attachments[i].postId = response.id;
                    }
                    this.http.post("https://localhost:44328/api/User/AddAttachment/", this.attachments, {
                      headers: new HttpHeaders({ "Content-Type": "application/json" })
                    }).subscribe();
                  },
                  error: (err: HttpErrorResponse) => console.log("no data")
                });
                this.showSuccess = true;
                setTimeout(() => { this.showSuccess = false; }, 4000);
                if (this.userData.isFristPost > 0) {
                  window.location.reload();

                }
              },
              error: () => {
                console.log("Someting went wrong")
              }
            })
          }
          else {

            this.isSubscriptionEnded = true;
            setTimeout(() => { this.isSubscriptionEnded = false; }, 5000);
            if (this.userData.subscriptionId != 4) {
              this.http.get("https://localhost:44328/api/User/EndSubscription/" + this.auth.Id, {
                headers: new HttpHeaders({ "Content-Type": "application/json" })
              }).subscribe({
                next: () => {

                },
                error: () => {
                  console.log("Someting went wrong")

                }
              })
            }

            setInterval(() => { this.count -= 1; }, 1000);
            setTimeout(() => { this.router.navigate(['user/subscription']) }, 5500);
          }
        },
        error: (err: HttpErrorResponse) => console.log("no data")
      })


    }
    else {
      this.sendPost.typePost = 3;
      this.buyad.visaId = this.selectecarid
      this.postdate2 = new Date(this.postdate.value);
      const msInDay = 24 * 60 * 60 * 1000;
      this.buyad.price = 2 * ((Math.round(Math.abs(Number(this.postdate2) - Number(new Date())) / msInDay))+1);
      this.sendPost.EndDate = this.postdate2;

      if (new Date() < this.postdate2 && this.buyad.price <= this.selectecarbalance) {
        this.http.post("https://localhost:44328/api/User/BuyAd/", this.buyad, {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        }).subscribe({
          next: () => {
            this.http.post("https://localhost:44328/api/User/MakePost/", this.sendPost, {
              headers: new HttpHeaders({ "Content-Type": "application/json" })
            }).subscribe({
              next: () => {
                this.http.get<PostId>("https://localhost:44328/api/User/GetLastPost/" + this.auth.Id, {
                  headers: new HttpHeaders({ "Content-Type": "application/json" })
                }).subscribe({
                  next: (response: PostId) => {
                    for (let i = 0; i < this.attachments.length; i++) {
                      this.attachments[i].postId = response.id;
                    }
                    this.http.post("https://localhost:44328/api/User/AddAttachment/", this.attachments, {
                      headers: new HttpHeaders({ "Content-Type": "application/json" })
                    }).subscribe();
                  },
                  error: (err: HttpErrorResponse) => console.log("no data")
                });
                this.showSuccess = true;
                setTimeout(() => { this.showSuccess = false; }, 4000);
                window.location.reload();

              },
              error: () => {
                console.log("Something went wrong")
              }
            })
            this.showError = false;
          },
          error: () => {
            console.log("Something went wrong")
          }
        })

      }
      else {
        this.showError = true;
        setTimeout(() => { this.showError = false; }, 4000)
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

  getCommentId(id: number) {
    this.replyShow = true;
    this.commid = id;
    //  alert(this.commid);
  }
  getIdPost(id: number) {
    this.postid = id;
    /*alert(id);*/
    this.http.get<boolean>("https://localhost:44328/api/User/AreReport/" + this.auth.Id + "/" + this.postid, {
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
  setUkTogglePost(id: string): void {
    document.getElementById("post-" + id).setAttribute('uk-toggle', 'target: #post-comment-' + id);
  }

  getPostIdLike(id: string): string {
    return "post-like-" + id + "";
  }

  setUkTogglePostLike(id: string): void {
    document.getElementById("post-like-" + id).setAttribute('uk-toggle', 'target: #post-like-' + id);
  }
  ReportPost(postid: number): void {
    this.report.postId = postid;
    this.report.statusId = 1;
    this.report.userId = this.auth.Id;
    this.http.post("https://localhost:44328/api/User/ReportPost", this.report, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
      next: () => {
        this.router.navigate(['user/feed'])
        window.location.reload();
      },
      error: () => {
      }
    })
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

  setUkToggleReport(id: number): void {
    document.getElementById("repoet-btn-" + id).setAttribute('uk-toggle', 'target: #repoet-' + id);
  }
  setUkToggleStoryReport(id: number): void {
    document.getElementById("repoet-btn-" + id).setAttribute('uk-toggle', 'target: #repoet-' + id);
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

  GetUserId(id: string) {
    return "https://localhost:44328/user/profile/" + id;
  }

  Hide(): boolean {
    var a = document.getElementById("chk");
    
    if (this.isShow == true) {
      this.isShow = false;
    }
    else
      this.isShow = true;
    this.selectecarid = null

    
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

  uploadPostImages = (files) => {
    if (files.length === 0) {
      return;
    }
    if (files.length > 4) {
      this.isExceededLimit = true;
      alert("Upoload 4 images");
    }

    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http.post('https://localhost:44328/api/User/UploadPostImages', formData, { reportProgress: true, observe: 'events' })
      .subscribe(
        {
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.onUploadFinished.emit(event.body);

              this.attachments = Object.assign([], event.body)

            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
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
  setUkToggleStory(id: string): void {
    document.getElementById("story-" + id).setAttribute('uk-toggle', 'target: body ; cls: story-active' + id);
  }


  isVideo(fileName: string): boolean {
    var name = fileName.split('.').pop();
    if (name == "mp4") {
      return true;
    }
    return false;
  }
  uploadStoryImg = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file1', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44328/api/User/UploadStoryImg', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {

          if (event.type === HttpEventType.Response) {

            this.onUploadFinished3.emit(event.body);
            this.storyImage = event.body['storyPath'];
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });

  }
  MakeStory() {
    this.story.item = this.storyImage;

    this.story.userId = this.auth.Id;
    if (this.story.item != null) {
      this.http.post("https://localhost:44328/api/User/AddStory/", this.story, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe({
        next: () => {
          this.showStorySuccess = true;
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          setTimeout(() => { this.showStorySuccess = false; }, 4000);
          window.location.reload();
        },
        error: (err: HttpErrorResponse) => console.log("no data")
      })
    }
    else {
      this.showSelectImage = true;
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => { this.showSelectImage = false; }, 4000);
    }
    


  }
  MakeFeedBack() {
    this.feedback.userId = this.auth.Id;
    this.feedback.feedbackText = this.feedbackcontent.value;
    this.http.post("https://localhost:44328/api/User/AddFeedBack/", this.feedback, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  DeleteStory(id:number) {
    this.http.post("https://localhost:44328/api/User/DeleteStory/"+ id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
        this.showDeletedStory = true;
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        setTimeout(() => { this.showDeletedStory = false; }, 4000);
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
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
  staticNumPost: number;
  isFristPost:number
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
interface SendReplay {
  userId: string;
  commentId: number;
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
interface NumOfPost {
  numberOfPost
}

interface Report {
  id: number,
  postId: number;
  statusId: number;
  userId: string;
}


interface Attachments {
  id: number;
  item: string;
  postId: number;
}

interface PostId {
  id: number
}

interface FriendStory {
  id: number;
  firstName: string;
  lastName: string;
  userId: string;
  profilePath: string;
  item: string;
  storyDate: Date;

}

interface Story {
  id: number;
  item: string;
  userId: string;
  storyDate: Date;
  isBlocked: number

}

interface Feedback {
  id: number;
  feedbackText: string;
  feedbackStatus: number;
  userId: string;
}

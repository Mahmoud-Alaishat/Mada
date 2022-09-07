import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-top-posts',
  templateUrl: './top-posts.component.html',
  styleUrls: ['./top-posts.component.css']
})
export class TopPostsComponent implements OnInit {
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  top10posts: Top10Posts[];
  postt: PostDetails = {
    id: 0,
    content: '',
    postDate: undefined,
    userId: '',
    item: ''
  }

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
    (function (window, document, undefined) {
      'use strict';
      if (!('localStorage' in window)) return;
      var nightMode = localStorage.getItem('gmtNightMode');
      if (nightMode) {
        document.documentElement.className += ' night-mode';
      }
    })(window, document);

    (function (window, document, undefined) {

      'use strict';

      // Feature test
      if (!('localStorage' in window)) return;

      // Get our newly insert toggle
      var nightMode = document.querySelector('#night-mode');
      if (!nightMode) return;

      // When clicked, toggle night mode on or off
      nightMode.addEventListener('click', function (event) {
        event.preventDefault();
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
          localStorage.setItem('gmtNightMode', 'true');
          return;
        }
        localStorage.removeItem('gmtNightMode');
      }, false);

    })(window, document);
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

    this.http.get<Top10Posts[]>("https://localhost:44328/api/Admin/GetTopPostSeen/" , {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Top10Posts[]) => {
        this.top10posts = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }

  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  GetPostById(Id: number) {
    this.http.get<PostDetails[]>("https://localhost:44328/api/Admin/GetPostById/" + Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: PostDetails[]) => {

        this.postt = response[0];
        this.postt.item += ",";
        for (let i = 1; i < response.length; i++) {
          this.postt.item += response[i].item + ",";
        }
        console.log(this.postt);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }

  setUkToggleDetails(id: number): void {
    document.getElementById("Details-btn-" + id).setAttribute('uk-toggle', 'target: #Details-' + id);
  }

  SplitImages(images: string): string[] {
    return images.split(',').slice(0, -1);
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

interface Top10Posts {
  id: number;
  summation: number;
}

interface PostDetails {
  id: number;
  content: string;
  postDate: Date;
  userId: string;
  item: string;
}

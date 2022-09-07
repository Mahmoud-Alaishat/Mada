import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  reports: Report[];
  post: PostDetails = {
    id: 0,
    content: '',
    postDate: undefined,
    userId: '',
    item: ''
  }
  showSuccessR: boolean;
  SelectedStatus :string;
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) {
  }

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

    this.http.get<Report[]>("https://localhost:44328/api/Admin/GetReport/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Report[]) => {
        this.reports = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  GetPostById(Id: number) {
    this.http.get<PostDetails[]>("https://localhost:44328/api/Admin/GetPostById/" + Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: PostDetails[]) => {

        this.post = response[0];
        this.post.item += ",";
        for (let i = 1; i < response.length; i++) {
          this.post.item += response[i].item + ",";
        }
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  setUkToggleDetails(id: number): void {
    document.getElementById("Details-btn-" + id).setAttribute('uk-toggle', 'target: #Details-' + id);
  }

  AcceptReport(Report: any) {
    this.http.post("https://localhost:44328/api/Admin/AcceptReport/", Report, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
        this.showSuccessR = true;
        document.getElementById("Details-" + Report.postId).hidden = true;
        setTimeout(() => { this.showSuccessR = false; }, 4000);
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
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

  RejectReport(Id: number) {
    this.http.post("https://localhost:44328/api/Admin/RejectReport/" + Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }
  SelecteStatus(){    
     this.SelectedStatus= (<HTMLSelectElement>document.getElementById('selc')).value;

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

interface Report {
  id: number;
  userId: string;
  postId: string;
  firstName: string;
  lastName: string;
  email: string;
  content: string;
  statusId: number;
  statusName: string;
}

interface PostDetails {
  id: number;
  content: string;
  postDate: Date;
  userId: string;
  item: string;
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  show: boolean = false;
  id: any;
  Email: Mail = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    date: undefined,
    showHide: 0
  };

  reEmail: Mail = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    date: undefined,
    showHide: 0
  };
  message: string = '';
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

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


    this.http.get<Mail>("https://localhost:44328/api/Admin/GetEmailDetails/" + this.id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Mail) => {
        this.Email = response;
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  showForm() {
    this.show = !this.show;
    setTimeout(() => { window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" }); }, 1);

  }

  sendEmail() {
    this.reEmail.message = this.message;
    this.reEmail.subject = this.Email.subject;
    this.reEmail.email = this.Email.email;
    this.http.post("https://localhost:44328/api/Admin/SendMessage/", this.reEmail, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
       
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
}

interface Mail {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: Date;
  showHide: number;
}

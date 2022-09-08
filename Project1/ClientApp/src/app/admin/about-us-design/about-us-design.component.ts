import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-about-us-design',
  templateUrl: './about-us-design.component.html',
  styleUrls: ['./about-us-design.component.css']
})
export class AboutUsDesignComponent implements OnInit {

  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  aboutDesign: Design = {
    id: '',
    slideImage1: '',
    slideImage2: '',
    slideImage3: '',
    subText1: '',
    subText2: '',
    subText3: '',
    mainText1: '',
    mainText2: '',
    mainText3: '',
    userId: ''
  }
  AboutDesignForm: FormGroup;
  @Output() public onUploadFinished = new EventEmitter();
  aboutImage: any;
  showSuccess: boolean;
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
    this.http.get<Design>("https://localhost:44328/api/Admin/GetDesignById/AboutUs", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Design) => {
        this.aboutDesign = response
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }
  uploadAboutImg = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44328/api/Admin/UploadAboutImg', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {


          if (event.type === HttpEventType.Response) {
            this.onUploadFinished.emit(event.body);
            this.aboutImage = event.body['aboutPath'];
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });

  }
  UpdateAboutUs() {
    let maintext = (<HTMLInputElement>document.getElementById('maintext')).value;
    let subtext = (<HTMLInputElement>document.getElementById('subtext')).value;

    let maintext1 = (<HTMLInputElement>document.getElementById('maintext1')).value;
    let subtext1 = (<HTMLInputElement>document.getElementById('subtext1')).value;

    let maintext2 = (<HTMLInputElement>document.getElementById('maintext2')).value;
    let subtext2 = (<HTMLInputElement>document.getElementById('subtext2')).value;

    if (maintext != "") {
      this.aboutDesign.mainText1 = (<HTMLInputElement>document.getElementById('maintext')).value;
    }
    if (subtext != "") {
      this.aboutDesign.subText1 = (<HTMLInputElement>document.getElementById('subtext')).value;
    }

    if (maintext1 != "") {
      this.aboutDesign.mainText2 = (<HTMLInputElement>document.getElementById('maintext1')).value;
    }
    if (subtext1 != "") {
      this.aboutDesign.subText2 = (<HTMLInputElement>document.getElementById('subtext1')).value;
    }

    if (maintext2 != "") {
      this.aboutDesign.mainText3 = (<HTMLInputElement>document.getElementById('maintext2')).value;
    }
    if (subtext2 != "") {
      this.aboutDesign.subText3 = (<HTMLInputElement>document.getElementById('subtext2')).value;
    }

    if (this.aboutImage != null) {
      this.aboutDesign.slideImage1 = this.aboutImage;
    }
    this.http.post("https://localhost:44328/api/Admin/UpdateDesign/", this.aboutDesign, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
        this.showSuccess = true;
        setTimeout(() => { this.showSuccess = false; }, 4000);
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
}

interface Design {
  id: string;
  slideImage1: string;
  slideImage2: string;
  slideImage3: string;
  subText1: string;
  subText2: string;
  subText3: string;
  mainText1: string;
  mainText2: string;
  mainText3: string;
  userId: string;
}

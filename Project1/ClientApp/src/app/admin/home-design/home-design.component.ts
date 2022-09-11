import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home-design',
  templateUrl: './home-design.component.html',
  styleUrls: ['./home-design.component.css']
})
export class HomeDesignComponent implements OnInit {
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  homeDesign: Design = {
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
  HomeDesignForm: FormGroup;
  @Output() public onUploadFinished = new EventEmitter();
  homeImage: any;
  
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
    this.HomeDesignForm = new FormGroup({
      MainText: new FormControl(),
      SubText: new FormControl(),
      Image: new FormControl()
    })

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

    this.http.get<Design>("https://localhost:44328/api/Admin/GetDesignById/Home" , {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Design) => {
        this.homeDesign = response
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

  }
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }
  UpdateHome() {
    let maintext = (<HTMLInputElement>document.getElementById('maintext')).value;
    let subtext = (<HTMLInputElement>document.getElementById('subtext')).value;
    if (maintext != "") {
      this.homeDesign.mainText1 = (<HTMLInputElement>document.getElementById('maintext')).value;
    }
    if (subtext != "") {
      this.homeDesign.subText1 = (<HTMLInputElement>document.getElementById('subtext')).value;
    }
    if (this.homeImage != null) {
      this.homeDesign.slideImage1 = this.homeImage;
    }
    this.http.post("https://localhost:44328/api/Admin/UpdateDesign/", this.homeDesign,{
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

  }
  uploadHomeImg = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44328/api/Admin/UploadHomeImg', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {

           
           if (event.type === HttpEventType.Response) {
            this.onUploadFinished.emit(event.body);
             this.homeImage = event.body['homePath'];
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
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

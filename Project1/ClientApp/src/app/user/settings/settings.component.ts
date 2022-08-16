import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  UserForm: FormGroup;
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
    this.UserForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      ProfilePath: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      CoverPath: new FormControl('', [Validators.required]),
      Bio: new FormControl('', [Validators.required]),
      Relationship: new FormControl('', [Validators.required])
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

  }

  Update() {

    if (this.UserForm.controls['FirstName'].value == "") {
      this.UserForm.controls['FirstName'].setValue(this.userData.firstName);
      
    }
    if (this.UserForm.controls['LastName'].value == "") {
      this.UserForm.controls['LastName'].setValue(this.userData.lastName);
    }
    if (this.UserForm.controls['ProfilePath'].value == "") {
      this.UserForm.controls['ProfilePath'].setValue(this.userData.profilePath);
    }
    if (this.UserForm.controls['Address'].value == "") {
      this.UserForm.controls['Address'].setValue(this.userData.address);
    }
    if (this.UserForm.controls['CoverPath'].value == "") {
      this.UserForm.controls['CoverPath'].setValue(this.userData.coverPath);
    }
    if (this.UserForm.controls['Bio'].value == "") {
      this.UserForm.controls['Bio'].setValue(this.userData.bio);
    }
    if (this.UserForm.controls['Relationship'].value == "") {
      this.UserForm.controls['Relationship'].setValue(this.userData.relationship);
    }
      
    this.http.put("https://localhost:44328/api/User/UpdateUserProfile/" + this.auth.Id , this.UserForm.value, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
      next: () => {
        window.location.reload();

      },
      error: () => {
      }
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

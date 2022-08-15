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

  imageSrc: string;
  UserForm: FormGroup;
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
    this.UserForm = new FormGroup({
      FirstName: new FormControl(),
      LastName: new FormControl(),
      ProfilePath: new FormControl(),
      Address: new FormControl(),
      CoverPath: new FormControl(),
      Bio: new FormControl(),
      Relationship: new FormControl()
    })


    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.http.get<UserInfo>("https://localhost:44328/api/User/GetUserInfo/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
        this.userData = response;
        this.UserForm.controls['ProfilePath'].setValue(response.profilePath);
        this.UserForm.controls['CoverPath'].setValue(response.coverPath);
        this.UserForm.controls['Relationship'].setValue(response.relationship);
        this.UserForm.controls['Address'].setValue(response.address);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

  }
  uploadeProfileImage(file:any) {
    if (file.length === 0)
      return;
    let fileUploade = <File>file[0];
    this.UserForm.controls['ProfilePath'].setValue(fileUploade.name);
  }

  uploadeCoverImage(file: any) {
    if (file.length === 0)
      return;
    let fileUploade = <File>file[0];
    this.UserForm.controls['CoverPath'].setValue(fileUploade.name);
  }
  
  Update() {

    


      console.log(this.UserForm.value);
      this.http.post("https://localhost:44328/api/User/UpdateUserProfile/"+this.auth.Id , this.UserForm.value, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
        next: () => {
          this.UserForm.reset();

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

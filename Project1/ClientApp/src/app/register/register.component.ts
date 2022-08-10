import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;

  passV: boolean;
  chkemail: boolean;
  chkusername: boolean;
  Checkemail: ICheckEmailSender = { Email: '' };
  Checkusername: ICheckUserNameSender = { UserName:'' };


  constructor(private http: HttpClient, private router: Router, private regService: RegisterService) { }

  ngOnInit() {
    this.RegisterForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      PasswordHash: new FormControl('', [Validators.required]),
      PasswordHashConfiramd: new FormControl('', [Validators.required])
    }
    )
    this.chkemail = true;
  }



  passwordMatchValidator(): boolean {
    console.log(this.RegisterForm.get('PasswordHashConfiramd').value)
    return (this.RegisterForm.get('PasswordHash').value === this.RegisterForm.get('PasswordHashConfiramd').value)

  }
  Validator(): boolean {
    return this.passwordMatchValidator() && this.RegisterForm.valid && this.chkemail && this.chkusername;
  }



  Register() {

    if (this.Validator()) {
      this.http.post<IUserData>("https://localhost:44328/api/Auth/Register", this.RegisterForm.value, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
        next: (response: IUserData) => {
          localStorage.setItem("userid", response.userid);
          this.regService.setCode(response.code);
          this.RegisterForm.reset();

          this.router.navigate(["emailconfirmation"]);
        },
        error: () => {
          console.log("HHHHIIII");
        }
      })

    }
  }

  CheckEmail() {
    this.chkemail = true;
    this.Checkemail.Email = this.RegisterForm.controls['Email'].value;
    this.http.post<ICheckEmail>("https://localhost:44328/api/Auth/CheckEmail", this.Checkemail, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe({
        next: (response: ICheckEmail) => {
          if (response.Email == null) {
            this.chkemail = false;
          }
          else {
            this.chkemail = true;
          }
        },
        error: () => {
          console.log("HHHHIIII")
        }
      })

  }

  CheckUserName() {
    this.chkusername = true;
    this.Checkusername.UserName = this.RegisterForm.controls['UserName'].value;
    this.http.post<ICheckUserName>("https://localhost:44328/api/Auth/CheckUserName", this.Checkusername, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
      .subscribe({
        next: (response: ICheckUserName) => {
          if (response.UserName == null) {
            this.chkusername = false;
          }
          else {
            this.chkusername = true;
          }
        },
        error: () => {
          console.log("HHHHIIII")
        }
      })

  }

}


interface UserRegister {
  Id: string
  UserName: string
  NormalizedUserName: string
  Email: string
  NormalizedEmail: string
  EmailConfirmed: number
  PasswordHash: string
  SecurityStamp: string
  ConcurrencyStamp: string
  PhoneNumber: string
  PhoneNumberConfirmed: number
  TwoFactorEnabled: number
  LockoutEnd: Date
  LockoutEnabled: number
  AccessFailedCount: number
  FirstName: string
  LastName: string
  ProfilePath: string
}
interface IUserData {
  userid: string
  code: string
}
interface ICheckEmail {
  Email: string
}
interface ICheckEmailSender {
  Email: string
}
interface ICheckUserName {
  UserName: string
}
interface ICheckUserNameSender {
  UserName: string
}



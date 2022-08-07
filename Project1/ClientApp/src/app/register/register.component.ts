import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  
  passV: boolean;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.RegisterForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      PasswordHash: new FormControl('', [Validators.required]),
      PasswordHashConfiramd: new FormControl('', [Validators.required])
    }
    )
  }

  }

  passwordMatchValidator(): boolean {
    console.log(this.RegisterForm.get('PasswordHashConfiramd').value)
    return (this.RegisterForm.get('PasswordHash').value === this.RegisterForm.get('PasswordHashConfiramd').value) 

  }
  Validator(): boolean {
    return this.passwordMatchValidator() && this.RegisterForm.valid
  }

  

  Register() {
    if (this.Validator()) {
      this.http.post<IUserData>("https://localhost:44328/api/Auth/Register", this.RegisterForm.value, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
        next: (response: IUserData) => {
          localStorage.setItem("userid", response.userid)
          this.RegisterForm.reset()

          this.router.navigate(["emailconfirmation"])
        },
        error: () => {
          console.log("HHHHIIII")
        }
      })

    }
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
  PhoneNumberConfirmed:number
  TwoFactorEnabled: number
  LockoutEnd: Date
  LockoutEnabled:number
  AccessFailedCount:number
  FirstName: string
  LastName:string
  ProfilePath:string
}
interface IUserData {
  userid: string
}

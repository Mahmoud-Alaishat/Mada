import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  
  passV: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.RegisterForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      PasswordHash: new FormControl('', [Validators.required]),
      PasswordHashConfiramd: new FormControl('')
    }
    )
  }

 passwordMatchValidator(): boolean {
    console.log(this.RegisterForm.get('PasswordHashConfiramd').value)
    return (this.RegisterForm.get('PasswordHash').value === this.RegisterForm.get('PasswordHashConfiramd').value)

  }

  

  Register() {
    //if (this.RegisterForm.valid) {
     
    //}
    this.http.post("https://localhost:44328/api/Auth/Register", this.RegisterForm.value, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
      next: () => {
        this.RegisterForm.reset()
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
  PhoneNumberConfirmed:number
  TwoFactorEnabled: number
  LockoutEnd: Date
  LockoutEnabled:number
  AccessFailedCount:number
  FirstName: string
  LastName:string
  ProfilePath:string
}

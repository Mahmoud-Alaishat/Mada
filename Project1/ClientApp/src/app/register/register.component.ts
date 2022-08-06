import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    PasswordHash: new FormControl('', [Validators.required]),
  })

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  show() {
    alert(this.RegisterForm.value)
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

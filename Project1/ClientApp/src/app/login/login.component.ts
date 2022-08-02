import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public token: LoginResult[];
  credentials: LoginModel = { email: '', passwordhash: '' };

  invalidLogin: boolean;

  emailFormControl = new FormControl('', [Validators.email, Validators.required]);
  passFormControl = new FormControl('', Validators.minLength(6));
  constructor(private router: Router, private http: HttpClient, private authService: AuthService,
    @Inject('BASE_URL') baseUrl: string) { }

  submit() {
    this.authService.login(this.emailFormControl.value, this.passFormControl.value);
  }


  goToRegister() {
    this.router.navigate(['register']);
  }
  ngOnInit(): void {

  }

  login() {
    this.credentials.email = this.emailFormControl.value;
    this.credentials.passwordhash = this.passFormControl.value

    this.http.post<AuthenticatedResponse>("https://localhost:44328/api/Auth/Login", this.credentials, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("token", token);
          this.invalidLogin = false;
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
  }
}


interface LoginModel {
  email: string;
  passwordhash: string;
}

interface LoginResult {
  date: string;
  RoleName: string;
}

interface AuthenticatedResponse {
  token: string;
}

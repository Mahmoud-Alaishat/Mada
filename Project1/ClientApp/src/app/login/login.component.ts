import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: LoginModel = { email: '', passwordhash: '' };

  invalidLogin: boolean;
  result: object;
  email: string;
  role: string;
  IsAdmin = false;
  emailFormControl = new FormControl('', [Validators.email, Validators.required]);
  passFormControl = new FormControl('', Validators.minLength(6));
  constructor(private router: Router, private http: HttpClient, private authService: AuthService,
    @Inject('BASE_URL') baseUrl: string, private jwtHelper: JwtHelperService) { }

  submit() {
    this.authService.login(this.emailFormControl.value, this.passFormControl.value);
  }


  goToRegister() {
    this.router.navigate(['register']);
  }
  ngOnInit(): void {

  }
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.result = this.jwtHelper.decodeToken(token);
      this.email = this.result["email"];
      this.role = this.result["role"];
      return true;
    }
    return false;
  }
  isAdmin = () => {
    if (this.role == "Admin") {
      this.IsAdmin = true;
      return this.IsAdmin;
    }
    this.IsAdmin = false;
    return this.IsAdmin;
  }

  login() {
    this.credentials.email = this.emailFormControl.value;
    this.credentials.passwordhash = this.passFormControl.value

    this.http.post<AuthenticatedResponse>("https://localhost:44328/api/Auth/Login",  this.credentials, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("token", token);
          this.invalidLogin = false;
          this.isUserAuthenticated();
          this.isAdmin();
          if (this.IsAdmin) {
            this.router.navigate(["admin"]);
          }
          else {
            this.router.navigate(["user/feed"]);
          }
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
  }
  
}


interface LoginModel {
  email: string;
  passwordhash: string;
}


interface AuthenticatedResponse {
  token: string;
}

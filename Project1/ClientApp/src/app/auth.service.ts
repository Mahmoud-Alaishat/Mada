import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  result: object;
  email: string;
  role: string;
  Id: string;
  username: string;
  IsAdmin = false;
  userData: UserInfo = {
    firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '',
    subscribeexpiry: null,
    subscriptionId: 0,
    numOfPost: 0
  };
  constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) { }


  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.result = this.jwtHelper.decodeToken(token);
      this.email = this.result["email"];
      this.role = this.result["role"];
      this.username = this.result["unique_name"];
      this.Id = this.result["Id"];

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
  getUserName = () => {
    return this.username;
  }

  GetUserInfo() {
    this.http.get<UserInfo>("https://localhost:44328/api/User/GetUserInfo/" + this.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
        this.userData = response;
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
  subscribeexpiry: Date;
  subscriptionId: number;
  numOfPost: number;
}

import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  result: object;
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  username: string;
  IsAdmin = false;

  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit() {
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.result = this.jwtHelper.decodeToken(token);
      this.email = this.result["email"];
      this.role = this.result["role"];
      this.firstname = this.result["given_name"];
      this.lastname = this.result["family_name"];
      this.username = this.result["unique_name"];
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
}

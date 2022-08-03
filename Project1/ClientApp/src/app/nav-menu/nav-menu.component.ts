import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  result: object;
  email: string;
  role: string;
  IsAdmin = false;
  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
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
  logOut = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }
}

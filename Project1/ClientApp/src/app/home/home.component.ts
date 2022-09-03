import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  homeDesign: Design = {
    id: '',
    slideImage1: '',
    slideImage2: '',
    slideImage3: '',
    subText1: '',
    subText2: '',
    subText3: '',
    mainText1: '',
    mainText2: '',
    mainText3: '',
    userId: ''
  }
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }
  ngOnInit() {
    this.http.get<Design>("https://localhost:44328/api/Admin/GetDesignById/Home", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Design) => {
        this.homeDesign = response
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }

}


interface Design {
  id: string;
  slideImage1: string;
  slideImage2: string;
  slideImage3: string;
  subText1: string;
  subText2: string;
  subText3: string;
  mainText1: string;
  mainText2: string;
  mainText3: string;
  userId: string;
}

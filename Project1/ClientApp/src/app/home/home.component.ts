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
  feedback: FeedBack[];
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
    this.http.get<FeedBack[]>("https://localhost:44328/api/User/GetAcceptedFeedback/", {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: FeedBack[]) => {
        this.feedback = response
        console.log(this.feedback);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
    
      setInterval(() => { document.getElementById("next").click() }, 3000);
    

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

interface FeedBack {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  feedbackText: string;
  feedbackStatus: number;
  statusName: string;
  profilePath: string;

}



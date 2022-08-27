import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.css']
})
export class OpenChatComponent implements OnInit {

  friends: MyFriends = { friendId: '', firstName: '', lastName: '', profilePath: '' };
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
    this.http.get<MyFriends>("https://localhost:44328/api/User/MyFriends/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: MyFriends) => {
        this.friends = response;
      }, error: (err: HttpErrorResponse) => console.log("no data")
    })
  }

}
interface MyFriends {
  friendId: string;
  firstName: string;
  lastName: string;
  profilePath: string;
}


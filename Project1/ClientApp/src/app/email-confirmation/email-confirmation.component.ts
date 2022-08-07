import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  codeFormControl = new FormControl('', [Validators.required]);
  constructor(private http: HttpClient, private regService: RegisterService, private router: Router) { }
  showMessage: boolean = false;
  re: IConfirmEmail = { id:'' };
  ngOnInit() {
  }

  Confirmation() {

    var Userid = localStorage.getItem("userid")
    if (this.codeFormControl.value == this.regService.getCode()) {
      this.re.id=Userid
      this.http.post("https://localhost:44328/api/Auth/EmailConfirmation", this.re, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe({
        next: () => {
          this.showMessage = true;
          this.router.navigate(["login"]);
        }
      })

    }

  }

}


interface IConfirmEmail {
  id:string
}

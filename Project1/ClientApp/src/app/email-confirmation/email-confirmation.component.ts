import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  codeFormControl = new FormControl('', [Validators.required]);
  constructor(private http: HttpClient) { }
  showMessage: boolean = false;
  ngOnInit() {
  }

  Confirmation() {


    this.http.post<IVerficationCode>("https://localhost:44328/api/Auth/GenerateCode", this.codeFormControl.value, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
        .subscribe({
          next: (response: IVerficationCode) => {
            const code = response.Code;
            localStorage.setItem("codetoken", code);
            var Userid = localStorage.getItem("userid")
            if (this.codeFormControl.value == code) {
              this.http.post("https://localhost:44328/api/Auth/EmailConfirmation", Userid, {
                headers: new HttpHeaders({ "Content-Type": "application/json" })
              }).subscribe({
                next: () => {
                  this.showMessage = true;
                }
              })

            }
            
          },
          error: (err: HttpErrorResponse) => console.log(err.message)
        })

    

  }

}

interface IVerficationCode {
  Code: string
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


  ContactForm: FormGroup;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.ContactForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', [Validators.required]),
      Subject: new FormControl('', [Validators.required]),
      Message: new FormControl('', [Validators.required]),

    })

  }

  SendMessage() {
    if (this.ContactForm.valid) {


      console.log(this.ContactForm.value);
      this.http.post("https://localhost:44328/api/User/ContactUs", this.ContactForm.value, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
        next: () => {
          this.ContactForm.reset();

        },
        error: () => {
        }
      })
    }
  }

}

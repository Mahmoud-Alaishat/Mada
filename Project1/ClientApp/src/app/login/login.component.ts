import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public token: LoginResult[];

  emailFormControl = new FormControl('', [Validators.email, Validators.required]);
  passFormControl = new FormControl('', Validators.minLength(6));
  constructor(private router: Router, private authService: AuthService,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {


  }
  
  submit() {
    this.authService.login(this.emailFormControl.value, this.passFormControl.value);
  }

  
  goToRegister() {
    this.router.navigate(['register']);
}
  ngOnInit(): void {

  }
  showMessage = false;
  toggleShowMessage() {
    this.showMessage = !this.showMessage;
}

}

interface LoginResult {
  date: string;
  RoleName: string;
}

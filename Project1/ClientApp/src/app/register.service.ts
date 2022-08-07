import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  vcode: string;
  constructor() { }

  getCode() {
    return this.vcode;
  }
  setCode(code: string) {
    this.vcode = code;
  }
}

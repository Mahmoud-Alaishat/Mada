import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  imageSrc: string;
  UserForm: FormGroup;
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: '' };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  displayImage: any;
  visa: Bank[];
  totalBalance: number;
  CardForm: FormGroup;
  card: Bank = { cardNumber: '', holderName: '', balance: 0, cCV: '', expiryMonth: '', expiryYear: '', holderId: '', id: 0 };
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  @Output() public onUploadFinished1 = new EventEmitter();

  profileImage: any;
  coverImage: any;
  showSuccess: boolean;
    showSuccessCard: boolean;
    showDeletedCard: boolean;



  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private auth: AuthService) { }

  ngOnInit() {
    this.UserForm = new FormGroup({
      FirstName: new FormControl(),
      LastName: new FormControl(),
      ProfilePath: new FormControl(),
      Address: new FormControl(),
      CoverPath: new FormControl(),
      Bio: new FormControl(),
      Relationship: new FormControl()
    })

    this.CardForm = new FormGroup({
      CardNumber: new FormControl('', [Validators.required]),
      FullName: new FormControl('', [Validators.required]),
      CCV: new FormControl('', [Validators.required]),
      ExpiryMonth: new FormControl('', [Validators.required]),
      ExpiryYear: new FormControl('', [Validators.required]),
    }
    )


    this.isAuthenticate = this.auth.isUserAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.http.get<UserInfo>("https://localhost:44328/api/User/GetUserInfo/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: UserInfo) => {
        this.userData = response;

      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })

    this.http.get<Bank[]>("https://localhost:44328/api/User/GetUserVisa/" + this.auth.Id, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: Bank[]) => {
        this.visa = response;
        this.totalBalance = this.TotalBalance(response);
      },
      error: (err: HttpErrorResponse) => console.log("no data")
    })
  }



  onCreate() {

    if (this.UserForm.controls['FirstName'].value == null) {
      this.UserForm.controls['FirstName'].setValue(this.userData.firstName);
    }
    if (this.UserForm.controls['LastName'].value == null) {
      this.UserForm.controls['LastName'].setValue(this.userData.lastName);
    }
    if (this.UserForm.controls['Address'].value == null) {
      this.UserForm.controls['Address'].setValue(this.userData.address);
    }
    if (this.profileImage != '' && this.profileImage != undefined) {
      this.userData.profilePath = this.profileImage;
    }
    if (this.coverImage != '' && this.coverImage != undefined) {
      this.userData.coverPath = this.coverImage;
    }
    if (this.UserForm.controls['Bio'].value == null) {
      this.UserForm.controls['Bio'].setValue(this.userData.bio);
    }
    if (this.UserForm.controls['Relationship'].value == null) {
      this.UserForm.controls['Relationship'].setValue(this.userData.relationship);
    }

    this.userData = {
      firstName: this.UserForm.controls['FirstName'].value,
      lastName: this.UserForm.controls['LastName'].value,
      address: this.UserForm.controls['Address'].value,
      bio: this.UserForm.controls['Bio'].value,
      relationship: this.UserForm.controls['Relationship'].value,
      profilePath: this.userData.profilePath,
      coverPath: this.userData.coverPath
    }
    this.http.post("https://localhost:44328/api/User/UpdateUserProfile/" + this.auth.Id, this.userData, { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
      next: () => {
        this.showSuccess = true;
        setTimeout(() => { this.showSuccess = false; }, 4000);
        window.location.reload();
      },
      error: () => {
      }
    })
  }

  TotalBalance(arr: Bank[]): number {
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].balance;
    }
    return sum;
  }
  chunkString(str: string) {
    return str.match(/.{1,4}/g).join('  -  ');
  }
  DeleteCard(id: number) {
    this.http.delete("https://localhost:44328/api/User/DeleteVisa/" + id)
      .subscribe({
        next: () => {
          this.router.navigate(['user/settings'])
          this.showDeletedCard = true;
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
          setTimeout(() => { this.showDeletedCard = false; }, 4000)
          window.location.reload();
        },
        error: () => {

        }
      })
  }

  setUkToggleDelete(id: string): void {
    document.getElementById("delete-btn-" + id).setAttribute('uk-toggle', 'target: #delete-' + id);
  }

  Validator(): boolean {
    return this.CardForm.valid;
  }
  DeleteAccount() {
    this.http.delete("https://localhost:44328/api/User/DeleteAccount/" + this.auth.Id)
      .subscribe({
        next: () => {
          localStorage.removeItem("token");
          this.router.navigate(["/"]);
          window.location.reload();
        },
        error: () => {

        }
      })
  }
  AddCard() {
    if (this.Validator) {
      this.card.cardNumber = this.CardForm.controls['CardNumber'].value;
      this.card.holderName = this.CardForm.controls['FullName'].value;
      this.card.cCV = this.CardForm.controls['CCV'].value;
      this.card.expiryMonth = this.CardForm.controls['ExpiryMonth'].value;
      this.card.expiryYear = this.CardForm.controls['ExpiryYear'].value;
      this.card.holderId = this.auth.Id;
      this.card.balance = Math.floor(Math.random() * (1000 - 400 + 1)) + 400;
      console.log(this.card);
      this.http.post<Bank>("https://localhost:44328/api/User/AddCard/", this.card,
        { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
          next: (response: Bank) => {
            this.CardForm.reset();
            this.router.navigate(["user/settings"]);
            this.showSuccessCard = true;
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            setTimeout(() => { this.showSuccessCard = false; }, 4000)
            window.location.reload();
          },
          error: () => {
            console.log("someting went wrong");
          }
        })
    }
  }

  uploadProfileImg = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44328/api/User/UploadProfileImg', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
            this.profileImage = event.body['profilePath'];
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });

  }

  uploadCoverImg = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file1', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44328/api/User/UploadCoverImg', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {

          if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished1.emit(event.body);
            this.coverImage = event.body['coverPath'];
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });

  }

}
interface UserInfo {
  firstName: string;
  lastName: string;
  profilePath: string;
  coverPath: string;
  address: string;
  relationship: string;
  bio: string;
}
interface prof {
  profilePath: string;

}


interface Bank {
  id: number;
  cardNumber: string;
  cCV: string;
  expiryMonth: string;
  expiryYear: string;
  holderId: string;
  balance: number;
  holderName: string;
}

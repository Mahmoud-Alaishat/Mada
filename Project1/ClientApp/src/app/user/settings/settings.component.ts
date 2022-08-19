import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  userData: UserInfo = { firstName: '', lastName: '', profilePath: '', address: '', coverPath: '', bio: '', relationship: ''  };
  isAuthenticate: boolean = false;
  isAdmin: boolean = false;
  displayImage: any;
  visa: Bank[];
  totalBalance: number;
  CardForm: FormGroup;
  card: Bank = { cardNumber: '', holderName: '', balance: 0, cCV: '', expiryMonth: '', expiryYear: '', holderId: '', id: 0 };
  userId: string = this.auth.Id;
  balance: number = Math.floor(Math.random() * (1000 - 400 + 1)) + 400;

  CardNumber: string = '';
  FullName: string = '';
  CCV: number = 0;
  ExpiryMonth: number = 1;
  ExpiryYear: number = 1;


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
        //this.UserForm.controls['ProfilePath'].setValue(response.profilePath);
        //this.UserForm.controls['CoverPath'].setValue(response.coverPath);
        //this.UserForm.controls['Relationship'].setValue(response.relationship);
        //this.UserForm.controls['Address'].setValue(response.address);
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
  TotalBalance(arr: Bank[]):number {
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
            window.location.reload();
        },
        error: () => {
          console.log("HHHHIIII");
        }
      })
    }




    
  }

  uploadeProfileImage(file: any) {
    alert("Befro Yessssss");

    if (file.length === 0)
      return;
    let fileUploade = <File>file[0];
    const formData = new FormData();

    formData.append('file', fileUploade, fileUploade.name);
    alert(fileUploade.name);    
    
  }
  uploadAttachment(file: FormData) {
    

    this.http.post<prof>("https://localhost:44328/api/User/UploadImage/", file).subscribe({
      next: (response: prof) => {
        //this.UserForm.controls['ProfilePath'].setValue(response.profilePath);
        this.displayImage = response.profilePath;
        

      },
      error: () => {
        
      }
    })
    this.UserForm.controls['ProfilePath'].setValue(this.displayImage);
  }

  Update(file: any) {
    
    if (file.length === 0)
      return;
    let fileUploade = <File>file[0];
    const formData = new FormData();

    formData.append('file', fileUploade, fileUploade.name);
    
    


    if (this.UserForm.controls['FirstName'].value == null) {
      this.UserForm.controls['FirstName'].setValue(this.userData.firstName);
    }
    if (this.UserForm.controls['LastName'].value == null) {
      this.UserForm.controls['LastName'].setValue(this.userData.lastName);
    }
    if (this.UserForm.controls['Address'].value == null) {
      this.UserForm.controls['Address'].setValue(this.userData.address);
    }
    if (this.UserForm.controls['CoverPath'].value == null) {
      this.UserForm.controls['CoverPath'].setValue(this.userData.coverPath);
    }
    if (this.UserForm.controls['Bio'].value == null) {
      this.UserForm.controls['Bio'].setValue(this.userData.bio);
    }
    if (this.UserForm.controls['Relationship'].value == null) {
      this.UserForm.controls['Relationship'].setValue(this.userData.relationship);
    }
    alert(this.displayImage+"Yes");
    

    this.http.post("https://localhost:44328/api/User/UpdateUserProfile/" + this.auth.Id, this.UserForm.value,  { headers: new HttpHeaders({ "Content-Type": "application/json" }) }).subscribe({
      next: () => {
        alert(this.displayImage + "Yes");

      },
      error: () => {
      }
    })

    

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

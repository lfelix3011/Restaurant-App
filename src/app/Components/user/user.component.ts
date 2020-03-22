import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Data = {
    displayName: '',
    email: '',
    phoneNumber: '',
  };

  Data2: any;

  creationTime: any;
  lastSignInTime: any;

  isLogged: boolean;
  constructor(
    private GeneralServ: GeneralService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.GeneralServ.isAuth().subscribe(auth => {
      if (auth) {
        this.Data = auth;
        this.Data2 = auth.metadata;
        this.creationTime = auth.metadata.creationTime;
        this.lastSignInTime = auth.metadata.lastSignInTime;
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

}

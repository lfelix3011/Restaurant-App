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
    metadata: {}
  };

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
        console.log(auth);
        this.Data = auth;
        console.log('User logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  // GetById(data: any) {
  //   this.router.navigate(['/User/edit/' + data]);
  // }
}

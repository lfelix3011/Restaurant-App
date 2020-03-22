import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { GeneralService } from 'src/app/Services/general.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  itemRef: any;
  Data = [];
  data = {
    displayName: '',
  };

  index: number;
  isLogged = false;
  constructor(
    private db: AngularFireDatabase,
    private GeneralServ: GeneralService,
    private userAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  ngOnChanges() {
    this.getCurrentUser();
  }
  CountReservations(uid: any) {
    this.itemRef = this.db.object('Restaurants/Users/' + uid + '/Reservation');
    this.itemRef.snapshotChanges().subscribe(action => {
      const data = action.payload.val();
      this.Data = [];
      // tslint:disable-next-line: align
      // tslint:disable-next-line: forin
      for (const k in  data) {
        this.Data.push(data);
      }
    });
  }

  getCurrentUser() {
    this.GeneralServ.isAuth().subscribe(auth => {
      if (auth) {
        this.CountReservations(auth.uid);
        this.data = auth;
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.toastr.info('Adios ' + this.data.displayName);
    this.userAuth.auth.signOut();
  }

  GoToLogin() {
    this.router.navigate(['/Login']);
    this.toastr.info('No hay Usuario, por favor Inicie Sesion');
  }

}

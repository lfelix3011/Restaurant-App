import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { GeneralService } from 'src/app/Services/general.service';
import { AngularFireAuth } from '@angular/fire/auth';

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
  // displayName = '';
  constructor(
    private db: AngularFireDatabase,
    private GeneralServ: GeneralService,
    private userAuth: AngularFireAuth,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.getCurrentUser();
    // this.GeneralServ.getCurrentName().subscribe( (data) => {
    //   this.displayName = data;
    // });
    console.log(this.GeneralServ.getCurrentName());
  }

  ngOnChanges() {
    this.getCurrentUser();
  }
  CountReservations(uid: any) {
    this.itemRef = this.db.object('Restaurants/Users/' + uid + '/Reservation');
    // console.log(this.itemRef);
    this.itemRef.snapshotChanges().subscribe(action => {
      const data = action.payload.val();
      this.Data = [];
      // tslint:disable-next-line: align
      // tslint:disable-next-line: forin
      for (const k in  data) {
        this.Data.push(data);
      }
      console.log(this.Data.length);
    });
  }

  getCurrentUser() {
    this.GeneralServ.isAuth().subscribe(auth => {
      if (auth) {
        this.CountReservations(auth.uid);
        // this.displayName = auth.displayName;
        this.data = auth;
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.toastr.info('Adios');
    this.userAuth.auth.signOut();
  }

}

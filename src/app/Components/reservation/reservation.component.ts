import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  Data = {
    image_url: '',
    name: '',
    address: '',
    country: '',
    area: '',
    state: '',
    phone: '',
    price: '',
    city: '',
    postal_code: '',
    lat: '',
    lng: '',
  };
  todayDate: Date = new Date();
  url: string;
  lat: number;
  lng: number;
  itemRef: any;
  isLogged = false;
  uid: any;
  constructor(private GeneralServ: GeneralService, private router: Router, private userAuth: AngularFireAuth,
              private currentRoute: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.getById();
    this.getCurrentUser();
  }

  getById() {
    const ItemId = this.currentRoute.snapshot.paramMap.get('id');
    console.log(ItemId);
    if (ItemId != null) {
      this.url = 'restaurants/' + ItemId;
      this.GeneralServ.getOpenTableApi(this.url).subscribe((e: any) => {
        // console.log(e);
        this.Data = e;
      });
    }
  }

  getCurrentUser() {
    this.GeneralServ.isAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        console.log(this.uid);
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  SaveReservation(data: Data) {
    this.db.database.ref('Restaurants/Users/' + this.uid + '/Reservation').push(data);
    // this.db.database.ref('Restaurants/Users/' + this.uid + '/Reservation/' + data.key).push(this.todayDate);
    this.router.navigate(['/Reservation']);
    this.isLogged = true;
  }

}

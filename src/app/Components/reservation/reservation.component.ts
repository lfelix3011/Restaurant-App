import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

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
    dateNow: Date,
  };
  todayDate: Date = new Date();
  url: string;
  constructor(private GeneralServ: GeneralService, private router: Router,
              private currentRoute: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.getById();
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

  SaveReservation(data: Data) {
    data.dateNow = this.todayDate;
    console.log(data.dateNow);
    // this.Data.push(data.dateNow);
    this.db.database.ref('reservations').push(data);
    // this.db.database.ref('reservations/' + data.key).set(data);
    this.router.navigate(['/Reservation']);
  }

}

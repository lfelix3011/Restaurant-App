import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

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
    reserve_url: '',
  };
  todayDate: Date = new Date();
  url: string;
  lat: number;
  lng: number;
  itemRef: any;
  isLogged = false;
  uid: any;
  constructor(private GeneralServ: GeneralService, private router: Router, private userAuth: AngularFireAuth,
              private currentRoute: ActivatedRoute, private db: AngularFireDatabase, private toastr: ToastrService) { }

  ngOnInit() {
    this.getById();
    this.getCurrentUser();
  }

  getById() {
    const ItemId = this.currentRoute.snapshot.paramMap.get('id');
    if (ItemId != null) {
      this.url = 'restaurants/' + ItemId;
      this.GeneralServ.getOpenTableApi(this.url).subscribe((e: any) => {
        this.Data = e;
      });
    }
  }

  getCurrentUser() {
    this.GeneralServ.isAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

   SaveReservation(data: Data) {
    data.reserve_url = this.todayDate.toString();
    this.db.database.ref('Restaurants/Users/' + this.uid + '/Reservation').push(data);
    this.toastr.success('Reservacion Agregada', 'Restaurant: ' + data.name);
    this.router.navigate(['/Reservation']);
    this.isLogged = true;
  }

  GoToLogin() {
    this.router.navigate(['/Login']);
    this.toastr.info('No hay Usuario, por favor Inicie Sesion');
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/Services/general.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent implements OnInit {
  itemRef: any;
  Data = [];
  isLogged: boolean;
  uid: any;
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private GeneralServ: GeneralService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.GeneralServ.isAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.SaveKey(auth.uid);
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  SaveKey(uid: any) {
      this.itemRef = this.db.object('Restaurants/Users/' + uid + '/Reservation');
      this.itemRef.snapshotChanges().subscribe(action => {
        const data = action.payload.val();
        this.Data = [];
        // tslint:disable-next-line: forin
        for (const k in  data) {
          data[k].key = k ;
          // console.log(data[k]);
          this.Data.push(data[k]);
        }
    });
  }

  DeleteReservation(data: any) {
    if(confirm('Estas seguro que quieres borrar la reservacion ?')){
      this.db.database.ref('Restaurants/Users/' + this.uid + '/Reservation/' + data.key).remove();
      this.toastr.warning('Registro Eliminado', 'Restaurant: ' + data.name );
    }
  }

  GetById(Id: number) {
    this.router.navigate(['/Reservation/edit/' + Id]);
  }
}

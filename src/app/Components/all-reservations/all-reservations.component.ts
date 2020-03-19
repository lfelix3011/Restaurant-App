import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent implements OnInit {
  itemRef: any;
  Data = [];
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.SaveKey();
  }

  SaveKey() {
      this.itemRef = this.db.object('reservations');
      this.itemRef.snapshotChanges().subscribe(action => {
        const data = action.payload.val();
        this.Data = [];
        // tslint:disable-next-line: forin
        for (const k in  data) {
          data[k].key = k ;
          console.log(data[k]);
          this.Data.push(data[k]);
        }
    });
  }

  DeleteReservation(key: number) {

    this.db.database.ref('reservations/' + key).remove();
    // e.toElement.parentElement.parentElement.parentElement.parentElement.remove();
  }
}

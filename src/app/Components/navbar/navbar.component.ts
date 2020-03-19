import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  itemRef: any;
  Data = [];
  index: number;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.CountReservations();
  }

  CountReservations() {
    this.itemRef = this.db.object('reservations');
    // console.log(this.itemRef);
    this.itemRef.snapshotChanges().subscribe(action => {
      const data = action.payload.val();
      this.Data = [];
      // tslint:disable-next-line: align
      // tslint:disable-next-line: forin
      for (const k in  data) {
        this.Data.push(data);
      }
      // console.log(data);
      console.log(this.Data.length);
      // for (this.index = 0; this.index < this.Data.length; this.index++) {
      //   console.log('Nav ' + this.index);
      //   // this.index = 0;
      // }
      // console.log('Afuera  ' + this.index);

    // console.log(data);
    });
  }

}

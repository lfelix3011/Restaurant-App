import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private GeneralServ: GeneralService) { }

  Data = [];
  ngOnInit() {
    this.GeneralServ.getOpenTableApi().subscribe((e: any) => {
      console.log(e)
      // this.Data = e;
    });
  }

}

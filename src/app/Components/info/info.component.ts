import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  Data = {
    countries: 0,
    cities: 0,
    restaurants: 0,
  };
  url: string;
  constructor(private GeneralServ: GeneralService) { }

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.url = 'stats';
    this.GeneralServ.getOpenTableApi(this.url).subscribe((e: any) => {
      console.log(e);
      this.Data = e;
    });
  }
}

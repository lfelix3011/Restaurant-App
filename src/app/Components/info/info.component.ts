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
  AllData = [];

  url: string;
  constructor(private GeneralServ: GeneralService) { }

  ngOnInit() {
    this.getStats();

    this.url = 'restaurants?city=ny&&per_page=5';
    this.GetRestaurants(this.url);
  }

  GetRestaurants(param: string) {
    this.GeneralServ.getOpenTableApi(param).subscribe((e: any) => {
      this.AllData = e.restaurants;
    });
  }

  getStats() {
    this.url = 'stats';
    this.GeneralServ.getOpenTableApi(this.url).subscribe((e: any) => {
      this.Data = e;
    });
  }
}

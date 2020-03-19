import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/Services/general.service';
import { Router } from '@angular/router';
// import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';n

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private GeneralServ: GeneralService, private formBuilder: FormBuilder, private router: Router) {
    // config.max = 5;, config: NgbRatingConfig
  }
  currentRate = 1;
  Data = [];
  // pageOfItems = [];s
  countryList = [];
  cityList = [];
  obj = {
    total_entries: 0,
  };
  url: string;
  country: string;
  city: string;
  price: string;
  pageSize = 15;
  ActulPage = 1;
  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      countryList: [''],
      cityList: [''],
    });

    this.CountryList();
    this.CityList();

    this.url = 'restaurants?city=miami&&per_page=100';
    console.log(this.ActulPage);
    this.GetRestaurants(this.url);
  }

  GetRestaurants(param: string) {
    this.GeneralServ.getOpenTableApi(param).subscribe((e: any) => {
      console.log(e);
      this.obj = e;
      this.Data = e.restaurants;
    });
  }

  GetByCountry(e: any) {
    this.country = e.srcElement.value;
    this.url = 'restaurants?country=' + this.country + '&&per_page=100';
    this.GetRestaurants(this.url);

    this.searchForm.value.cityList = '';
  }

  GetByCity(e: any) {
    this.city = e.srcElement.value;
    this.url = 'restaurants?city=' + this.city + '&&per_page=100';
    this.GetRestaurants(this.url);

    this.searchForm.value.countryList = '';
  }

  getId(Id: number) {
    this.router.navigate(['/Reservation/edit/' + Id]);
  }

  CountryList() {
    this.url = 'countries';
    this.GeneralServ.getOpenTableApi(this.url).subscribe((e: any) => {
      this.countryList = e.countries;
    });
  }

  CityList() {
    this.url = 'cities';
    this.GeneralServ.getOpenTableApi(this.url).subscribe((e: any) => {
      this.cityList = e.cities;
    });
  }

  // PriceList() {
  //   this.url = 'price';
  //   this.GeneralServ.getOpenTableApi(this.url).subscribe((e: any) => {
  //     this.cityList = e.cities;
  //   });
  // }

  //   onChangePage(pageOfItems: any) {
  //     // update current page of items
  //     this.pageOfItems = pageOfItems;
  //    }

}

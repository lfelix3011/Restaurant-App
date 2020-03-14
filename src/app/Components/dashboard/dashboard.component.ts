import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/Services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private GeneralServ: GeneralService, private formBuilder: FormBuilder) { }

  Data = [];
  countryList = [];
  cityList = [];
  priceList = [];
  url: string;
  country: string;
  city: string;
  price: string;

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      countryList: [''],
      cityList: [''],
      priceList: [''],
    });

    this.CountryList();
    this.CityList();
  }

  GetRestaurants(param: string) {
    this.GeneralServ.getOpenTableApi(param).subscribe((e: any) => {
      // console.log(e);
      this.Data = e.restaurants;
    });
  }

  GetByCountry(e: any) {
    this.country = e.srcElement.value;
    this.url = 'restaurants?country=' + this.country;
    this.GetRestaurants(this.url);

    this.searchForm.value.cityList = '';
    this.CityList();
  }

  GetByCity(e: any) {
    this.city = e.srcElement.value;
    this.url = 'restaurants?city=' + this.city;
    this.GetRestaurants(this.url);

    this.searchForm.value.countryList = '';
    this.searchForm.value.priceList = '';
  }

  // GetByPrice(e: any) {
  //   this.price = e.srcElement.value;
  //   this.url = 'restaurants?price=' + this.price;
  //   this.GetRestaurants(this.url);

  //   this.searchForm.value.countryList = '';
  //   this.searchForm.value.cityList = '';
  // }

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

}

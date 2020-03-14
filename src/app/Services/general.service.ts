import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getOpenTableApi(url: string) {
    return this.http.get('https://opentable.herokuapp.com/api/' + url);
  }
}

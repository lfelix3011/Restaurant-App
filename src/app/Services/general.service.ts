import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient, private userAuth: AngularFireAuth) { }

  getOpenTableApi(url: string) {
    return this.http.get('https://opentable.herokuapp.com/api/' + url);
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.userAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  isAuth() {
    return this.userAuth.authState.pipe(map(auth => auth));
  }

  getCurrentName() {
    return this.isAuth().pipe(map( auth => auth.displayName));
  }

  // getCurrentName(): string {
  //   // let displayName = '';
  //   this.isAuth().subscribe(auth => {
  //     if (auth) {
  //       return auth.displayName;
  //     } else {
  //       return '';
  //     }
  //   });
  //   return '';
  //   // return displayName;
  // }

  // getCurrentName() {
  //   return this.isAuth().subscribe(auth => {
  //     const name = auth.displayName.toString();
  //     alert(name);
  //     return name;
  //   });
  // }

  // getCurrentName() {
  //   return this.isAuth().subscribe();
  // }

}

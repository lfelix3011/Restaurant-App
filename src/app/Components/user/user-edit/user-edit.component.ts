import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { GeneralService } from 'src/app/Services/general.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  isLogged: boolean;
  registerForm: FormGroup;
  itemRef: any;
  loading: boolean;
  Data = {
    userName: '',
    userID: '',
    userSystemID: '',
    userEmail: '',
  };

  user: any;
  constructor(
    private formBuilder: FormBuilder,
    private active: ActivatedRoute,
    private db: AngularFireDatabase,
    private userAuth: AngularFireAuth,
    private GeneralServ: GeneralService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getCurrentUser();

    // console.log('Init ' + this.Data);
    this.registerForm = this.formBuilder.group({
      displayName: [this.Data.userName],
    });
  }

  getCurrentUserData(uid: any) {
    this.itemRef = this.db.object('Restaurants/Users/' + uid);
    this.itemRef.snapshotChanges().subscribe(action => {
      const data = action.payload.val();
      this.Data = data.UserInfo;
      console.log(this.Data);
    });
  }

  getCurrentUser() {
    this.GeneralServ.isAuth().subscribe(auth => {
      if (auth) {
        console.log(auth);
        this.getCurrentUserData(auth.uid);
        // this.Data = auth;
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  updateData() {
    console.log(this.user);
    const { uid } = this.userAuth.auth.currentUser;
    console.log(this.registerForm.value);
    // this.db.database.ref('Restaurants/Users/' + uid + '/UserInfo').update(this.registerForm.value);
    this.userAuth.auth.currentUser.updateProfile({
      displayName: this.registerForm.value.displayName
    }).then( (suc) => {
      this.toastr.success('Nombre Actualizado');
      this.router.navigate(['/User']);
      // location.reload();
      // setTimeout(() => {
      //   this.loading = true;
      // }, 3000);
    }).catch( (err) => {
      this.toastr.error('Error al Actualizar');
    });
  }
}

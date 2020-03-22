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

    this.registerForm = this.formBuilder.group({
      displayName: [this.Data.userName],
    });
  }

  getCurrentUserData(uid: any) {
    this.itemRef = this.db.object('Restaurants/Users/' + uid);
    this.itemRef.snapshotChanges().subscribe(action => {
      const data = action.payload.val();
      this.Data = data.UserInfo;
    });
  }

  getCurrentUser() {
    this.GeneralServ.isAuth().subscribe(auth => {
      if (auth) {
        this.getCurrentUserData(auth.uid);
        // this.Data = auth;
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  updateData() {
    const { uid } = this.userAuth.auth.currentUser;
    this.userAuth.auth.currentUser.updateProfile({
      displayName: this.registerForm.value.displayName
    }).then( (suc) => {
      this.toastr.success('Nombre Actualizado');
      this.router.navigate(['/User']);
    }).catch( (err) => {
      this.toastr.error('Error al Actualizar');
    });
  }
}

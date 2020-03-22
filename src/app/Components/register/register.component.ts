import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  itemRef: any;
  loading: boolean;
  constructor(
    private router: Router,
    private userAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    // Inicializando formulario
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
   createUser() {
    const userName = this.registerForm.value.userName;
    const userEmail = this.registerForm.value.userEmail;
    const userPassword = this.registerForm.value.userPassword;

    this.userAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
      this.userAuth.auth.onAuthStateChanged((userData) => {
        userData.updateProfile({
          displayName: userName,
        });
      });

      const userID = this.userAuth.auth.currentUser.uid;
      const systemID = Date.now();

      this.db.database.ref('Restaurants/Users/' + userID + '/UserInfo/').set({
        // tslint:disable-next-line: object-literal-shorthand
        userName: userName,
        // tslint:disable-next-line: object-literal-shorthand
        userID: userID,
        userSystemID: systemID,
        // tslint:disable-next-line: object-literal-shorthand
        userEmail: userEmail,
      });

      this.toastr.success('Registro exitoso');
      this.toastr.info('Bienvenido ' + userName);
      this.router.navigate(['/Dashboard']);
    })
    .catch((error) => {
      const errorCodes = error.code;
      switch (errorCodes) {
        case 'auth/invalid-email':
          this.toastr.error('Correo incorrecto');
          break;
        case 'auth/email-already-in-use':
          this.toastr.error('Correo utilizado');
          break;
        case 'auth/operation-not-allowed':
          this.toastr.error('Lo sentimos falla interna en el sistema, fvor intentar luego o comunicarse con un representante');
          break;
        case 'auth/weak-password':
          this.toastr.error('Contraseña muy debil');
          break;
      }
    });
  }
}

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
  // Variable para el formulario
  constructor(private router: Router, private userAuth: AngularFireAuth, private db: AngularFireDatabase,
              private formBuilder: FormBuilder) {

      }

  ngOnInit() {
    // Inicializando formulario
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }
  async createUser() {
    const userName = this.registerForm.value.userName;
    const userEmail = this.registerForm.value.userEmail;
    const userPassword = this.registerForm.value.userPassword;

    await this.userAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
      this.userAuth.auth.onAuthStateChanged((userData) => {
        userData.updateProfile({
          displayName: userName,
        });
      });

      const userID = this.userAuth.auth.currentUser.uid;
      const systemID = Date.now();

      this.db.database.ref('Restaurants/Users/' + userID + '/').set({
        // tslint:disable-next-line: object-literal-shorthand
        userName: userName,
        // tslint:disable-next-line: object-literal-shorthand
        userID: userID,
        userSystemID: systemID,
        // tslint:disable-next-line: object-literal-shorthand
        userEmail: userEmail,
      });

      this.userAuth.auth.currentUser.sendEmailVerification();

      alert('Registro exitoso');
      this.router.navigate(['/Login']);
    })
    .catch((error) => {
      const errorCodes = error.code;
      switch (errorCodes) {
        case 'auth/invalid-email':
          alert('Correo incorrecto');
          break;
        case 'auth/email-already-in-use':
          alert('Correo utilizado');
          break;
        case 'auth/operation-not-allowed':
          alert('Lo sentimos falla interna en el sistema, fvor intentar luego o comunicarse con un representante.');
          break;
        case 'auth/weak-password':
          alert('Contraseña muy debil');
          break;
      }
    });
  }
}

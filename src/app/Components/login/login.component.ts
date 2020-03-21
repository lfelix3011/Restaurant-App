import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/Services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  // loading: boolean;
  constructor(private userAuth: AngularFireAuth, private formBuilder: FormBuilder, private router: Router,
              private GeneralServ: GeneralService ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }



  Login() {
    const userEmail = this.registerForm.value.userEmail;
    const userPassword = this.registerForm.value.userPassword;

    this.GeneralServ.loginEmailUser(userEmail, userPassword).then((res) => {
      // this.loading = true;
      this.router.navigate(['/Dashboard']);
      // this.loading = false;
    }).catch((error) => {
      console.log(error)
      const errorCodes = error.code;
      switch (errorCodes) {
        case 'auth/operation-not-allowed':
          alert('Lo sentimos falla interna en el sistema, favor intentar luego o comunicarse con un representante.');
          break;
        case 'auth/user-not-found':
          alert('Usuario no encontrado');
          break;
        case 'auth/wrong-password':
          alert('Contraseña Invalida');
          break;
      }
    });
  }

  LogoutUser() {
    return this.userAuth.auth.signOut();
  }

}

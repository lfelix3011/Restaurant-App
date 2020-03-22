import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/Services/general.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean;
  constructor(private userAuth: AngularFireAuth, private formBuilder: FormBuilder, private router: Router,
              private GeneralServ: GeneralService, private toastr: ToastrService,  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  Login() {
    const userEmail = this.registerForm.value.userEmail;
    const userPassword = this.registerForm.value.userPassword;

    this.GeneralServ.loginEmailUser(userEmail, userPassword).then((res) => {
      this.toastr.info('Bienvenido');
      // location.reload();
      console.log(this.GeneralServ.getCurrentName());
      this.router.navigate(['/Dashboard']);
    }).catch((error) => {
      const errorCodes = error.code;
      switch (errorCodes) {
        case 'auth/operation-not-allowed':
          this.toastr.error('Lo sentimos falla interna en el sistema, favor intentar luego o comunicarse con un representante.');
          break;
        case 'auth/user-not-found':
          this.toastr.error('Usuario no encontrado');
          break;
        case 'auth/wrong-password':
          this.toastr.error('Contraseña Invalida');
          break;
      }
    });
  }

}

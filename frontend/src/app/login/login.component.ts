import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormService } from './services/login-form.service';
import { LoginService } from './services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGoogleService } from '../services/auth-google.service';
import { SlideService } from '../services/slide.service';
import { DriveService } from '../services/drive.service';
import { PresentacionesService } from '../pages/presentaciones/services/presentaciones.service';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  estaPresionado = false;

  constructor(
    public loginFrm: LoginFormService,
    public loginSrv: LoginService,
    public snackBar: MatSnackBar,
    public router: Router,
    public authService: AuthGoogleService,
    public presentacionesSrv: PresentacionesService
  ) { }

  get form() {
    return this.loginFrm.form;
  }

  ngOnInit() {
    localStorage.removeItem('userid');
    this.presentacionesSrv.emptyAll();
  }

  login() {
    this.estaPresionado = true;
    if (this.loginFrm.valid) {
      this.loginSrv.login(this.form.value).toPromise()
      .then((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token); // Guarda el token
          localStorage.setItem('userid', res.id); // Guarda el usuario
          this.router.navigateByUrl('/pages'); // Va al inicio
        }
        this.estaPresionado = false;
      })
      .catch((e: any) => {
        this.snackBar.open('Error en la autenticación', 'Cerrar', {duration: 3000})
        this.estaPresionado = false;
        console.log(e);
      });
    }
  }

  async loginGoogle() {
    try {
      const credential = await this.authService.GoogleAuth();
      gapi.auth.setToken(credential);
      localStorage.setItem('tokenauth', credential.accessToken);

      await this.router.navigateByUrl('/pages');
    } catch(e) {
      console.log(e);
    }
  } //KPv3JGGz6JfANRHqGzEduYp7NGd2

}

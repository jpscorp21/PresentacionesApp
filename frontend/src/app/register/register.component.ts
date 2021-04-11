import { Component, OnInit } from '@angular/core';
import { RegisterFormService } from './services/register-form.service';
import { RegisterService } from './services/register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    RegisterFormService,
    RegisterService
  ]
})
export class RegisterComponent implements OnInit {

  constructor(
    public registerFrm: RegisterFormService,
    public registerSrv: RegisterService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  get form() {
    return this.registerFrm.form;
  }

  ngOnInit() {
  }

  onEnter() {

  }

  registrar() {
    if (this.registerFrm.valid) {
      this.registerSrv.registrar(this.form.value).toPromise()
      .then((res: any) => {
        if (res && res._id) {
          this.snackBar.open('El usuario fue registrado correctamente', 'Cerrar', {
            duration: 5000
          });
          this.router.navigateByUrl('/login');
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
    }
  }

}

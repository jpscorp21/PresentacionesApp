import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../../services/perfil/perfil.service';
import { PerfilFormService } from '../../../services/perfil/perfil-form.service';
import { MatDialogRef } from '@angular/material';
import { AppConfigService } from '../../../services/app-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Perfiles } from '../../../models/perfiles';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss'],
  providers: [
    PerfilService,
    PerfilFormService
  ]
})
export class PerfilFormComponent implements OnInit {

  id = null;

  constructor(
    public dialogRef: MatDialogRef<PerfilFormComponent>,
    public config: AppConfigService,
    public perfilFrm: PerfilFormService,
    public perfilSrv: PerfilService,
    public snackBar: MatSnackBar
  ) { }

  get form() {
    return this.perfilFrm.form;
  }

  ngOnInit() {
    this.id = localStorage.getItem('id_user');
    if (!this.id) {
      this.cerrar();
    }

    this.perfilSrv.getById(this.id).toPromise()
    .then((p: Perfiles) => {
      this.perfilFrm.actualizarFormulario(p);
    })
    .catch((e: any) => {
      console.log(e);
    });
  }

  actualizar() {
    if (this.perfilFrm.valid) {
      this.perfilSrv.update(this.form.value, this.id).toPromise()
      .then((res: any) => {
        this.snackBar.open('Perfil actualizado', 'Cerrar', { duration: 3000 });
        // console.log(res);
      })
      .catch((e: any) => {
        this.snackBar.open('Problemas en el servidor', 'Cerrar', { duration: 3000 });
        console.log(e);
      });
    }
  }

  /**
   * Si es true entonces acepto si es falso, cancelo
   * @param value - true o false
   */
  cerrar() {
    this.dialogRef.close();
  }

}

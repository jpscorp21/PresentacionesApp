import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Slides } from '../../../../models/slides';
import { PresentacionesService } from '../../services/presentaciones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalsService } from 'src/app/services/util/modals/modals.service';
import { Presentaciones } from 'src/app/models/presentaciones';

@Component({
  selector: 'app-presentaciones-detalle',
  templateUrl: './presentaciones-detalle.component.html',
  styleUrls: ['./presentaciones-detalle.component.scss']
})
export class PresentacionesDetalleComponent implements OnInit {

  id: string = null;
  slide: Slides = null;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public presentacionesSrv: PresentacionesService,
    public snackBar: MatSnackBar,
    public modalsSrv: ModalsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (!this.id) {
      this.volver();
    }

    this.presentacionesSrv.getById(this.id).toPromise()
    .then((p: Slides) => {
      this.slide = Object.assign({}, p);
    })
    .catch((e: any) => {
      this.slide = new Slides();
      console.log(e);
    });
  }

  editar() {
    this.router.navigateByUrl(`/pages/presentaciones/form-nuevo/${this.id}`);
  }

  volver() {
    this.router.navigateByUrl('/pages/presentaciones/lista');
  }

  async eliminar() {
    if ((await this.modalsSrv.aceptarCancelar('Deseas eliminar la presentacion?'))) {
      this.presentacionesSrv.delete(this.id).toPromise()
      .then((p: Presentaciones) => {
        this.snackBar.open('La presentacion fue eliminada correctamente', 'Cerrar', {duration: 3000});
        this.volver();
      })
      .catch((e: any) => {
        this.snackBar.open('Error en el servidor', 'Cerrar', {duration: 3000});
      });
    }
  }

}

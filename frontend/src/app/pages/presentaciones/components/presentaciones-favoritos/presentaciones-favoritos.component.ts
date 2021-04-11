import { Component, OnInit } from '@angular/core';
import { Slides } from '../../../../models/slides';
import { PresentacionesService } from '../../services/presentaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ModalsService } from '../../../../services/util/modals/modals.service';
import { PerfilService } from '../../../../services/perfil/perfil.service';

@Component({
  selector: 'app-presentaciones-favoritos',
  templateUrl: './presentaciones-favoritos.component.html',
  styleUrls: ['./presentaciones-favoritos.component.scss']
})
export class PresentacionesFavoritosComponent implements OnInit {

  constructor(
    public presentacionesSrv: PresentacionesService,
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public modalsSrv: ModalsService,
    public perfilSrv: PerfilService
  ) { }

  get presentaciones$() {
    return this.presentacionesSrv.presentacionesFavoritos$;
  }

  ngOnInit() {
    // const useridLocal = localStorage.getItem('userid');
    // if (!useridLocal) {
    //   const userid = this.route.snapshot.queryParams.userid;
    //   if (userid) {
    //     localStorage.setItem('userid', userid);
    //     this.perfilSrv.setNewPerfil();
    //   } else {
    //     this.router.navigateByUrl('/login');
    //     return;
    //   }
    // }
    this.getAll();
  }

  async cambioFavorito(data: Slides) {
    try {
      data.esFavorito = !data.esFavorito;
      await this.presentacionesSrv.updateFavorito(data.esFavorito, data._id).toPromise();
      this.getAll();
    } catch (e) {
      data.esFavorito = !data.esFavorito;
      console.log(e);
      this.snackBar.open('Error en el servidor', 'Cerrar', {duration: 3000});
    }
  }

  getAll() {
    if (this.presentacionesSrv.presentacionesFavoritos.length === 0) {
      this.presentacionesSrv.getAllFavoritosToSubject();
    }
  }

  ver(data: Slides) {
    this.router.navigateByUrl(`/pages/presentaciones/detalle/${data._id}`);
  }

}

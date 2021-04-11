import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Presentaciones } from '../../../../models/presentaciones';
import { PresentacionesService } from '../../services/presentaciones.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { ModalsService } from '../../../../services/util/modals/modals.service';
import { PerfilService } from '../../../../services/perfil/perfil.service';
import { Slides } from '../../../../models/slides';
import { CargandoModalComponent } from 'src/app/components/modals/cargando-modal/cargando-modal.component';

@Component({
  selector: 'app-presentaciones-lista',
  templateUrl: './presentaciones-lista.component.html',
  styleUrls: ['./presentaciones-lista.component.scss']
})
export class PresentacionesListaComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('busqueda', {static: true}) busqueda: ElementRef;
  busquedaSubs: Subscription = new Subscription();

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
    return this.presentacionesSrv.presentaciones$;
  }

  ngOnInit() {
    const tokenauth = localStorage.getItem('tokenauth');

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

  getAll() {
    if (this.presentacionesSrv.presentaciones.length === 0) {
      this.presentacionesSrv.getAllToSubject({
        search: this.busqueda ? this.busqueda.nativeElement.value : ''
      });
    }
  }

  ngAfterViewInit() {
    this.busquedaSubs = fromEvent(this.busqueda.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((data: any) => data.target.value),
      tap((data: any) => this.presentacionesSrv.getAllToSubject({
        search: data ? data : ''
      })),
      // tap((data) => this.getAll())
    ).subscribe();
  }

  nuevo() {
    this.router.navigateByUrl(`/pages/presentaciones/form-nuevo`);
  }

  ver(data: Presentaciones) {
    this.router.navigateByUrl(`/pages/presentaciones/detalle/${data._id}`);
  }

  async cambioFavorito(data: Slides) {
    try {
      data.esFavorito = !data.esFavorito;
      await this.presentacionesSrv.updateFavorito(data.esFavorito, data._id).toPromise();
    } catch (e) {
      data.esFavorito = !data.esFavorito;
      console.log(e);
      this.snackBar.open('Error en el servidor', 'Cerrar', {duration: 3000});
    }
  }

  async  eliminar(data: Presentaciones) {
    if (await this.modalsSrv.aceptarCancelar('Deseas eliminar la presentacion?')) {
      this.openCargando();
      this.presentacionesSrv.delete(data._id).toPromise()
      .then((p: Presentaciones) => {
        this.presentacionesSrv.loadingSubject = false;
        this.snackBar.open('La presentacion fue eliminada correctamente', 'Cerrar', {duration: 3000});
      })
      .catch((e: any) => {
        this.presentacionesSrv.loadingSubject = false;
        this.snackBar.open('Error en el servidor', 'Cerrar', {duration: 3000});
      });
    }
  }

  async openCargando() {
    this.presentacionesSrv.loadingSubject = true;
    await this.dialog.open(CargandoModalComponent, {
      width: '300px',
      height: '300px',
      disableClose: true,
      data: {
        cargando: this.presentacionesSrv.loading$,
      }
    }).afterClosed().toPromise();
  }

  ngOnDestroy() {
    this.busquedaSubs.unsubscribe();
  }

}

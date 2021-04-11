import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalsService } from '../../services/util/modals/modals.service';
import { PerfilFormComponent } from '../modals/perfil-form/perfil-form.component';
import { PerfilService } from '../../services/perfil/perfil.service';
import { Perfiles } from '../../models/perfiles';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  modoTabled = false;
  perfil: Perfiles = new Perfiles();
  mode = 'over';
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor(
    public menuSrv: MenuService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private modalsSrv: ModalsService,
    private dialog: MatDialog,
    private perfilSrv: PerfilService,
  ) { }

  get menu() {
    return this.menuSrv.menu;
  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1200) {
        // this.sidenav.open();
        return true;
    } else {
        // this.sidenav.close();
        return false;
    }
  }

  ngOnInit() {
    this.perfilSrv.cambioPerfil$.subscribe(p => {
     this.perfil = p;
    });
  }

  ngAfterViewInit(): void {
    this.breakpointObserver.observe('(max-width: 1999px)')
    .subscribe((result) => {
      this.modoTabled = true;
    });

    this.breakpointObserver.observe('(min-width: 1200px)')
    .subscribe((result) => {
      this.modoTabled = false;
    });
  }

  async salir() {

    if (!this.isLargeScreen()) {
      this.sidenav.toggle();
    }

    if (await this.modalsSrv.aceptarCancelar('Estas seguro de salir de la aplicación')) {
      this.router.navigateByUrl('/login');
    }
  }

}

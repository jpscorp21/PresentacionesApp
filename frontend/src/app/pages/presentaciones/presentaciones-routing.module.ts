import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentacionesComponent } from './presentaciones.component';
import { PresentacionesListaComponent } from './components/presentaciones-lista/presentaciones-lista.component';
import { PresentacionesNuevoFormComponent } from './components/presentaciones-nuevo-form/presentaciones-nuevo-form.component';
import { PresentacionesDetalleComponent } from './components/presentaciones-detalle/presentaciones-detalle.component';
import { PresentacionesFavoritosComponent } from './components/presentaciones-favoritos/presentaciones-favoritos.component';
import { UserIdGuard } from 'src/app/guards/userid.guard';
import { SalirFormGuard } from 'src/app/guards/salir-form.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PresentacionesComponent
  },
  {
    path: 'lista',
    component: PresentacionesListaComponent,
  },
  {
    path: 'favorito',
    component: PresentacionesFavoritosComponent
  },
  {
    path: 'form-nuevo',
    component: PresentacionesNuevoFormComponent,
  },
  {
    path: 'form-nuevo/:id',
    component: PresentacionesNuevoFormComponent
  },
  {
    path: 'detalle/:id',
    component: PresentacionesDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentacionesRoutingModule { }

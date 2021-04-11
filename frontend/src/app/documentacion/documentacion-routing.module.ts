import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentacionComponent } from './documentacion.component';
import { DocumentacionManualComponent } from './components/documentacion-manual/documentacion-manual.component';
import { DocumentacionIntroduccionComponent } from './components/documentacion-introduccion/documentacion-introduccion.component';
import { DocumentacionVersionComponent } from './components/documentacion-version/documentacion-version.component';
import { DocumentacionFuncionamientoComponent } from './components/documentacion-funcionamiento/documentacion-funcionamiento.component';
import { DocumentacionDesarrolladorComponent } from './components/documentacion-desarrollador/documentacion-desarrollador.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'introduccion',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DocumentacionComponent,
    children: [
      {
        path: 'introduccion',
        component: DocumentacionIntroduccionComponent
      },
      {
        path: 'manual',
        component: DocumentacionManualComponent
      },
      {
        path: 'version',
        component: DocumentacionVersionComponent
      },
      {
        path: 'funcionamiento',
        component: DocumentacionFuncionamientoComponent
      },
      {
        path: 'desarrollador',
        component: DocumentacionDesarrolladorComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionRoutingModule { }

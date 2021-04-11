import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { DocumentacionComponent } from './documentacion.component';
import { DocumentacionMenuComponent } from './layout/documentacion-menu/documentacion-menu.component';
import { MaterialModule } from '../modules/material.module';
import { DocumentacionIntroduccionComponent } from './components/documentacion-introduccion/documentacion-introduccion.component';
import { DocumentacionFuncionamientoComponent } from './components/documentacion-funcionamiento/documentacion-funcionamiento.component';
import { DocumentacionManualComponent } from './components/documentacion-manual/documentacion-manual.component';
import { DocumentacionVersionComponent } from './components/documentacion-version/documentacion-version.component';
import { DocumentacionDesarrolladorComponent } from './components/documentacion-desarrollador/documentacion-desarrollador.component';


@NgModule({
  declarations: [DocumentacionComponent, DocumentacionMenuComponent, DocumentacionIntroduccionComponent, DocumentacionFuncionamientoComponent, DocumentacionManualComponent, DocumentacionVersionComponent, DocumentacionDesarrolladorComponent],
  imports: [
    CommonModule,
    DocumentacionRoutingModule,
    MaterialModule
  ]
})
export class DocumentacionModule { }

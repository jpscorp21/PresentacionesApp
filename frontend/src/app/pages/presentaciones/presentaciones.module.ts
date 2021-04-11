import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentacionesComponent } from './presentaciones.component';
import { PresentacionesListaComponent } from './components/presentaciones-lista/presentaciones-lista.component';
import { PresentacionesDetalleComponent } from './components/presentaciones-detalle/presentaciones-detalle.component';
import { PresentacionesNuevoFormComponent } from './components/presentaciones-nuevo-form/presentaciones-nuevo-form.component';
import { PresentacionesRoutingModule } from './presentaciones-routing.module';
import { MaterialModule } from '../../modules/material.module';
import { ComponentsModule } from '../../components/components.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PresentacionComponent } from './components/presentacion/presentacion.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgFallimgModule } from 'ng-fallimg';
import { PipesModule } from '../../pipes/pipes.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { PresentacionesTemasComponent } from './components/presentaciones-temas/presentaciones-temas.component';
import { PresentacionesFavoritosComponent } from './components/presentaciones-favoritos/presentaciones-favoritos.component';


@NgModule({
  declarations: [
    PresentacionesComponent,
    PresentacionesListaComponent,
    PresentacionesDetalleComponent,
    PresentacionesNuevoFormComponent,
    PresentacionComponent,
    PresentacionesTemasComponent,
    PresentacionesFavoritosComponent
  ],
  entryComponents: [PresentacionesTemasComponent],
  imports: [
    CommonModule,
    PresentacionesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ComponentsModule,
    FlexLayoutModule,
    PipesModule,
    CKEditorModule,
    NgFallimgModule.forRoot({
      default: '/assets/imgs/no-image.jpg'
    })
  ]
})
export class PresentacionesModule { }

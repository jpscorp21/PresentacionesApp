import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material.module';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { ControlErrorComponent } from './control-error/control-error.component';
import { MensajeModalComponent } from './modals/mensaje-modal/mensaje-modal.component';
import { AceptarCancelarModalComponent } from './modals/aceptar-cancelar-modal/aceptar-cancelar-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfilFormComponent } from './modals/perfil-form/perfil-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { CargandoModalComponent } from './modals/cargando-modal/cargando-modal.component';

const components = [
  MenuComponent,
  ControlErrorComponent,
  MensajeModalComponent,
  AceptarCancelarModalComponent,
  PerfilFormComponent,
  SpinnerComponent,
  CargandoModalComponent
];

@NgModule({
  declarations: [...components, ],
  exports: [...components],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  entryComponents: [MensajeModalComponent, AceptarCancelarModalComponent, PerfilFormComponent, CargandoModalComponent]
})
export class ComponentsModule { }

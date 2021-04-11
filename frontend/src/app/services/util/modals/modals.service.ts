import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MensajeModalComponent } from '../../../components/modals/mensaje-modal/mensaje-modal.component';
import { AceptarCancelarModalComponent } from '../../../components/modals/aceptar-cancelar-modal/aceptar-cancelar-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    public dialog: MatDialog
  ) { }

  async mensaje(mensaje, titulo = null) {
    await this.dialog.open(MensajeModalComponent, {
      width: '300px',
      data: {
        mensaje,
        titulo: titulo || 'Mensaje del sistema'
      }
    }).afterClosed().toPromise();
  }

  async aceptarCancelar(mensaje, titulo = null) {
    return await this.dialog.open(AceptarCancelarModalComponent, {
      width: '300px',
      data: {
        mensaje,
        titulo: titulo || 'Mensaje del sistema'
      }
    }).afterClosed().toPromise();
  }


}

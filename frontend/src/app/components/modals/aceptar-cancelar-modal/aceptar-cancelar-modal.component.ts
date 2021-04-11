import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MensajeModalComponent } from '../mensaje-modal/mensaje-modal.component';

interface DialogData {
  titulo: string;
  mensaje: string;
}

@Component({
  selector: 'app-aceptar-cancelar-modal',
  templateUrl: './aceptar-cancelar-modal.component.html',
  styleUrls: ['./aceptar-cancelar-modal.component.scss']
})
export class AceptarCancelarModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MensajeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  /**
   * Si es true entonces acepto si es falso, cancelo
   * @param value - true o false
   */
  cerrar(value: boolean) {
    this.dialogRef.close(value);
  }

}

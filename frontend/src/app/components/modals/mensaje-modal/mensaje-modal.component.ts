import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DialogData {
  titulo: string;
  mensaje: string;
}

@Component({
  selector: 'app-mensaje-modal',
  templateUrl: './mensaje-modal.component.html',
  styleUrls: ['./mensaje-modal.component.scss']
})
export class MensajeModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MensajeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}

import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MensajeModalComponent } from '../mensaje-modal/mensaje-modal.component';

interface DialogData {
  cargando: Observable<boolean>;
  timeout: number;
}

@Component({
  selector: 'jp-cargando-modal',
  template: `

      <jp-spinner></jp-spinner>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CargandoModalComponent implements OnInit, OnDestroy {

  cargandoSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<MensajeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    if (this.data.cargando) {
      this.cargandoSubscription = this.data.cargando.subscribe((val: boolean) => {
        if (!val) {
          return this.dialogRef.close();
        }
      });
    } else {
      const timeout = this.data.timeout || 3000;
      setTimeout(() => this.dialogRef.close(), timeout);
    }
  }

  ngOnDestroy() {
    if (this.cargandoSubscription) {
      this.cargandoSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidacionesMensajeService } from '../../services/util/validaciones-mensaje/validaciones-mensaje.service';

@Component({
  selector: 'jp-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent implements OnInit {

  /**
   * Para poder usar el id en un componente
   * y no cree conflicto con el id del componente que lo envuelve
   */
  private _ID = '';

  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  @Input() control: FormControl;

  constructor(
    public validacionesMensaje: ValidacionesMensajeService
  ) { }

  ngOnInit() {
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.validacionesMensaje.getErrorMensaje(propertyName);
      }
    }

    return null;
  }

}

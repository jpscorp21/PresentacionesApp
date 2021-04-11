import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesMensajeService {

  validaciones: any = {
    required: 'Es requerido',
    maxlength: 'Texto muy largo',
    minlength: 'Texto muy corto'
  };

  getErrorMensaje(error: string) {
    return this.validaciones[error];
  }
}

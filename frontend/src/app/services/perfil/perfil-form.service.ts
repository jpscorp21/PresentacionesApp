import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Perfiles } from '../../models/perfiles';

@Injectable()
export class PerfilFormService {

  public form: FormGroup;

  constructor(
    public fb: FormBuilder
  ) {
    this.crearFormulario();
  }

  get valid() {
    return this.form.valid;
  }

  crearFormulario() {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
    });
  }

  actualizarFormulario(data: Perfiles) {
    this.form.setValue({
      usuario: data.usuario
    });
  }

  reiniciar() {
    this.form.reset();
  }
}

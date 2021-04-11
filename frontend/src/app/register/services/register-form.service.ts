import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class RegisterFormService {

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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.email],
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  reiniciar() {
    this.form.reset();
  }
}

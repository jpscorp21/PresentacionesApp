import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

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
      password: ['', Validators.required]
    });
  }

  reiniciar() {
    this.form.reset();
  }
}

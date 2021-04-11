import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Slides } from '../../../models/slides';

@Injectable({
  providedIn: 'root'
})
export class PresentacionesNuevoFormService {

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
      titulo: ['', Validators.required],
      descripcion: [''],
      tema: ['BASSET'],
      editordata: [''],
    });
  }

  actualizarFormulario(data: Slides) {
    this.form.setValue({
      titulo: data.titulo || '',
      descripcion: data.descripcion || '',
      tema: data.tema || '',
      editordata: data.editorData || ''
    });
  }

  reiniciar() {
    this.form.reset();
  }
}

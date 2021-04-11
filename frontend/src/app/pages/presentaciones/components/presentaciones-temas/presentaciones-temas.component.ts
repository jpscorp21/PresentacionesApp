import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { TemasPresentacionesService } from '../../../../services/temas/temas-presentaciones.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DialogData {
  control: FormControl;
}

@Component({
  selector: 'app-presentaciones-temas',
  templateUrl: './presentaciones-temas.component.html',
  styleUrls: ['./presentaciones-temas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR, // Set de funciones para agregar y comunicar con el formulario de angular
    //   useExisting: forwardRef(() => PresentacionesTemasComponent), // Cuando existe el componente se inyecta el servicio
    //   multi: true // Por si se agrega mas providers dentro del forwardRef
    // },
  ]
})
export class PresentacionesTemasComponent implements OnInit { // , ControlValueAccessor {

  @Input() control: FormControl;
  // isDisabled = false;

  constructor(
    public dialogRef: MatDialogRef<PresentacionesTemasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public themes: TemasPresentacionesService
  ) { }

  /**
   * Establece el control y verifica si se activo un tema alguna vez
   */
  ngOnInit() {
    this.control = this.data.control;
    this.checkThemeSelected();
  }

  /**
   * Verifica si existe un tema seleccionado, si no es asi entonces genera nuevos temas
   */
  checkThemeSelected() {
    // if (!this.themes.existTheme(this.control.value)) {
    //   this.themes.generateThemeSelect();
    // }
  }

  selectTheme(theme: any) {
    theme.selected = true;
    this.control.patchValue(theme.name);
  }

  cerrar() {
    this.dialogRef.close();
  }

  // onInput(value: string) {
  //   this.value = value;
  //   this.onTouch();
  //   this.onChange(this.value);
  // }

  // /**
  //  * Trae el valor puesto
  //  * @param obj Valor del ngModel, ReactiveForm
  //  */
  // writeValue(value: string): void {
  //   this.value = value || '';
  // }

  // /**
  //  * Registramos una funcion que luego usamos
  //  * para informarle a Angular cual es el valor de nuestro
  //  * Form Control
  //  *
  //  * @param fn Funcion
  //  */
  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }

  // /**
  //  * Registramos una funcion que luego ejecutaremos cuando
  //  * necesitemos que nuestro Form Control tenga el estado
  //  * "touched"
  //  */
  // registerOnTouched(fn: any): void {
  //   this.onTouch = fn;
  // }

  // /**
  //  * Trae el estado disabled desde nuestro Reactive Form. Podemos
  //  * usar este estado para pasarselo a nuestro input nativo
  //  * @param isDisabled Estado
  //  */
  // setDisabledState(isDisabled: boolean): void {
  //   this.isDisabled = isDisabled;
  // }


}

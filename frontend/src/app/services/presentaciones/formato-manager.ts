import { IFormato } from './formato.interface';

export class FormatoManager {
  private _preFormatos: IFormato[] = [];
  private _formato: any = [];

  constructor(preformato: IFormato[]) {
    this._preFormatos = preformato;
  }

  get preFormato() {
    return this._preFormatos;
  }

  get formato() {
    return this._formato;
  }

  add(preFormato: IFormato) {
    this._preFormatos.push(preFormato);
  }

  addFormato(formato: any) {
    this._formato.push(formato);
  }

  clearPreFormato() {
    this._preFormatos = [];
  }

  clearFormato() {
    this._formato = [];
  }

  hasTitulo(request: any): boolean {
    return request && request.titulo && request.titulo.texto;
  }

  crearFormatoFinal(tema: string): any {
    // tslint:disable-next-line:prefer-const
    let request = {};

    for (const f of this._preFormatos) {
      request = f.format(request, this._formato, tema);
    }
    this.addFormato(request);
    return this._formato;
  }


}

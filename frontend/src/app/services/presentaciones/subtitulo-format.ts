import { IFormato } from './formato.interface';

export class SubtituloFormato implements IFormato {

  type = 'subtitulo';
  text = '';

  constructor(text: string) {
    this.text = text;
  }

  format(request: any): void {
    request.subtitulo = {
      texto: this.text
    };
    return request;
  }

}

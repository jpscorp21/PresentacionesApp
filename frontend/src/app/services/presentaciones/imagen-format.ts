import { IFormato } from './formato.interface';

export class ImagenFormato implements IFormato {

  type = 'imagen';
  text = '';

  constructor(text: string) {
    this.text = text;
  }

  format(request: any): void {

    if (!request.imagenes && !Array.isArray(request.imagenes)) {
      request.imagenes = [];
    }

    request.imagenes.push({
      url: this.text
    });

    return request;

  }

}

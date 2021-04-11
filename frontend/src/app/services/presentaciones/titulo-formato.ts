import { IFormato } from "./formato.interface";

export class TituloFormato implements IFormato {
  type = "titulo";
  text = "";

  constructor(text: string) {
    this.text = text;
  }

  format(request: any, requests?: any[]): any {
    if (request && !request.titulo) {
      request.titulo = {
        texto: this.text,
      };
    } else {
      // Si hay parrafos no va a hacer falta hacer el push
      if (!request.siguienteTitulo) {
        requests.push(request);
        delete request.siguienteTitulo;
      }
      request = Object.create(null);
      this.format(request, requests);
    }
    return request;
  }
}

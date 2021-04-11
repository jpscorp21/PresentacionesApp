import { IFormato } from "./formato.interface";
import { MAX_LENGTH_TEMAS } from "./max-length-temas";

export class ParrafoFormato implements IFormato {
  type = "parrafo";
  text = "";
  hasImage = false;
  coeficienteEspacio = 1;

  constructor(text: string, hasImage = false) {
    this.text = text;
    this.hasImage = hasImage;
  }

  format(request: any, requests?: any[], tema?: string): any {
    if (!request.parrafos && !Array.isArray(request.parrafos)) {
      request.parrafos = [];
    }

    // debugger;
    // Si hay imagen se hace una vez
    if (this.hasImage) {
      request.parrafos.push({
        texto: this.text,
      });
      requests.push(Object.assign({}, request));
      request.parrafos = [];
      request.siguienteTitulo = true;

      return request;
    }

    // let lengthTextoAnterior = 0;

    // if (request.parrafos.length) {
    //   lengthTextoAnterior =
    //     request.parrafos[request.parrafos.length - 1].texto.length;
    // }

    // Si existe mas de un parrafo
    if (request.parrafos.length > 1) {
      requests.push(Object.assign({}, request));
      request.parrafos = [];
    }

    // Comprueba si el texto actual supera el tema
    if (
      this.text.length >
      Math.round(MAX_LENGTH_TEMAS[tema] * this.coeficienteEspacio)
    ) {
      this.text = this.guardarTextoLargo(
        this.normalizarEspacios(this.text),
        request,
        requests,
        tema
      );

      request.parrafos.push({
        // La primera parte
        texto: this.text,
      });
    } else {
      request.parrafos.push({
        texto: this.text,
      });
    }

    const total = request.parrafos.reduce(
      (accum: number, actual: any) => accum + actual.texto.length,
      0
    );

    // Si el total de todos los textos superan entonces se pasa el texto a la siguiente diapositiva
    if (total > Math.round(MAX_LENGTH_TEMAS[tema] * this.coeficienteEspacio)) {
      request.parrafos.pop();
      requests.push(Object.assign({}, request));
      request.parrafos = [];

      request.parrafos.push({
        texto: this.text,
      });
    }

    return request;
  }

  /**
   * Si el texto es muy largo agrega el texto segun el punto y aparte y carga en el requests
   * En la recursividad lo que cambia es el texto para volver a hacer la misma operacion
   */
  guardarTextoLargo(text: string, request: any, requests: any[], tema: string) {
    // debugger;
    let length = text.indexOf(". "); // La proxima oracion
    let texto1 = ""; // La acumulacion del texto a guardar
    let texto2 = ""; // El texto2 para guardar el resto del texto

    // Acumula los textos mientras no sobrepase el limite que permita el tema
    while (
      (texto1 + text.slice(0, length)).length <=
      Math.round(MAX_LENGTH_TEMAS[tema] * this.coeficienteEspacio)
    ) {
      texto1 += text.slice(0, length); // Agrega el texto hasta el final de la oracion
      texto2 = text.slice(length + 2); // Carga el resto del texto despues de la oracion

      text = texto2;
      length = text.indexOf(". ");
    }

    // if (texto1.length) {
    // Agrega todo el texto
    request.parrafos.push({
      // La primera parte
      texto: texto1,
    });

    // Agrega en el request el texto con el mismo titulo
    requests.push(Object.assign({}, request));
    request.parrafos = [];

    // Caso base
    if (
      texto2.length >
      Math.round(MAX_LENGTH_TEMAS[tema] * this.coeficienteEspacio)
    ) {
      return this.guardarTextoLargo(texto2, request, requests, tema);
    } else {
      return texto2;
    }
  }

  normalizarEspacios(texto: string) {
    if (!texto || typeof texto !== "string") {
      return "";
    }

    let textoNormalizado = "";

    for (let i = 0; i < texto.length; i++) {
      if (texto.charCodeAt(i) === 160) {
        textoNormalizado += " ";
      } else {
        textoNormalizado += texto[i];
      }
    }

    return textoNormalizado;
  }
}

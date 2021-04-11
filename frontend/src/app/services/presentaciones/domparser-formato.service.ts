import { IFormato } from "./formato.interface";
import { ImagenFormato } from "./imagen-format";
import { ParrafoFormato } from "./parrafo-format";
import { TituloFormato } from "./titulo-formato";
import { SubtituloFormato } from "./subtitulo-format";
import { ListaFormato } from "./lista-format";
import { ErrorPresentacion } from "src/app/util/error-presentacion";
import { MAX_LENGTH_TEMAS } from "./max-length-temas";

export class DomParserFormatoService {
  texto: string;
  tema: string;
  dom: Document;

  constructor(texto: string, tema: string) {
    this.texto = texto;
    this.tema = tema;
    const parser = new DOMParser();
    this.dom = parser.parseFromString(this.texto, "text/html");
  }

  crearPreformato(): any {
    const json: IFormato[] = [];

    if (!this.comienzaConTitulo()) {
      throw new ErrorPresentacion("Debe cargar el texto con un titulo inicial");
    }

    // Extrae el primer elemento
    let elem: any = this.dom.getElementsByTagName("h1")[0];

    while (elem) {
      // Hace un proceso de validarion
      if (!this.esEtiquetaValida(elem)) {
        return false;
      }

      if (this.procesarImagen(elem, json)) {
        elem = elem.nextElementSibling;
        continue;
      }

      if (this.procesarLista(elem, json)) {
        elem = elem.nextElementSibling;
        continue;
      }

      if (this.procesarTitulo(elem, json)) {
        elem = elem.nextElementSibling;
        continue;
      }

      if (this.procesarSubtitulo(elem, json)) {
        elem = elem.nextElementSibling;
        continue;
      }

      if (this.procesarParrafo(elem, json)) {
        elem = elem.nextElementSibling;
        continue;
      }

      // Siguiente elemento
      elem = elem.nextElementSibling;
    }

    return json;
  }

  comienzaConTitulo(): boolean {
    const elem = this.dom.getElementsByTagName("h1");
    return elem[0] && !elem[0].previousElementSibling;
  }

  esEtiquetaValida(elem: any): boolean {
    if (!/\bH1\b|\bP\b|\bH3\b|\bUL\b|\bLI\b|\bBR\b/.test(elem.tagName)) {
      return false;
    }

    return true;
  }

  procesarImagen(elem: any, json: IFormato[]) {
    if (elem.children && elem.children[0]) {
      const child = elem.children[0];
      if (child.tagName === "IMG") {
        json.push(new ImagenFormato(child.src));
        return true;
      }
    }

    return false;
  }

  procesarParrafo(elem: any, json: IFormato[]) {
    if (elem.tagName === "P" && elem.textContent.trim().length !== 0) {
      const idx = json.length - 1;
      let hasImage = false;

      // Si hubo una imagen anterior entonces se le agrega al parrafo hasImage true
      if (json[idx] instanceof ImagenFormato) {
        hasImage = true;
      }

      // Si fue un parrafo antes y ademas tuvo una imagen quiere decir que hay una imagen entonces tambien hasImagen queda tambien
      if (
        json[idx] instanceof ParrafoFormato &&
        (json[idx] as ParrafoFormato).hasImage
      ) {
        hasImage = true;
      }

      // json.push(new ParrafoFormato(elem.textContent.trim(), hasImage));

      // Si el anterior es un parrafo y su suma con el actual no es superior al maximo texto
      // Se acumula nomas

      if (
        json[idx] instanceof ParrafoFormato &&
        json[idx].text.length + elem.textContent.trim().length <
          MAX_LENGTH_TEMAS[this.tema] * 0.5 // El anterior y el actual deben ser menor a los temas
      ) {
        (json[idx] as ParrafoFormato).text += `. \n${elem.textContent.trim()}`;
        (json[idx] as ParrafoFormato).hasImage = hasImage; // Se le agrega el uso de la imagen
      } else {
        let texto: string = elem.textContent.trim();
        // Si el texto es menor al maximo length se carga nomas
        if (texto.length < MAX_LENGTH_TEMAS[this.tema] * 0.5) {
          if (hasImage) {
            const hastaPuntoLength = texto.indexOf(". "); // Cantidad de la oracion actual
            // Guarda el nuevo objeto parrafo
            if (hastaPuntoLength > -1) {
              json.push(
                new ParrafoFormato(
                  texto.substring(0, hastaPuntoLength + 1), // La oracion a cargar
                  hasImage
                )
              );
              texto = texto.substring(hastaPuntoLength + 2); // Resto del texto para la siguiente oracion
            }

            if (texto.trim().length) {
              json.push(new ParrafoFormato(texto, hasImage));
            }
          } else {
            json.push(new ParrafoFormato(elem.textContent.trim(), hasImage));
          }

          // Si es muy largo se divide en varios parrafos segun el .
        } else {
          while (
            texto.length > MAX_LENGTH_TEMAS[this.tema] * 0.5 &&
            texto.indexOf(". ") > -1
          ) {
            const hastaPuntoLength = texto.indexOf(". "); // Cantidad de la oracion actual
            // Guarda el nuevo objeto parrafo
            json.push(
              new ParrafoFormato(
                texto.substring(0, hastaPuntoLength + 1), // La oracion a cargar
                hasImage
              )
            );
            texto = texto.substring(hastaPuntoLength + 2); // Resto del texto para la siguiente oracion
          }

          json.push(new ParrafoFormato(texto, hasImage));
        }
      }
      return true;
    }

    return false;
  }

  procesarTitulo(elem: any, json: IFormato[]) {
    if (elem.tagName === "H1" && elem.textContent.trim().length !== 0) {
      json.push(new TituloFormato(elem.textContent.trim()));
      return true;
    }

    return false;
  }

  procesarSubtitulo(elem: any, json: IFormato[]) {
    if (elem.tagName === "H3") {
      json.push(new SubtituloFormato(elem.textContent.trim()));
      return true;
    }

    return false;
  }

  procesarLista(elem: any, json: IFormato[]) {
    if (elem.tagName === "UL") {
      if (elem.children && elem.children[0]) {
        const child = elem.children[0];
        if (child.tagName === "LI") {
          // tslint:disable-next-line:prefer-for-of
          const textos = [];

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < elem.children.length; i++) {
            textos.push(elem.children[i].textContent.trim());
          }

          // Verifica si el ultimo cargado es una lista, entonces solo acumula
          // Si no crea un nuevo objeto lista
          if (json[json.length - 1] instanceof ListaFormato) {
            (json[json.length - 1] as ListaFormato).list.push(...textos);
          } else {
            json.push(new ListaFormato(textos));
          }

          return true;
        }
      }
    }
    return false;
  }
}

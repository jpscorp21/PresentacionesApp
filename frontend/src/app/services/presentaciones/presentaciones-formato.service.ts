import { Injectable } from "@angular/core";
import { FormatoManager } from "./formato-manager";
import { DomParserFormatoService } from "./domparser-formato.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PresentacionesFormatoService {
  // private _textoCambioSubject = new BehaviorSubject<string>('');

  // get textoCambio$() { return this.textoCambioSubject.asObservable; }

  // set textoCambioSubject(texto: string) {
  //   this._textoCambioSubject.next(texto);
  // }

  constructor() {}

  /**
   * Formatea en json para generar luego una presentacion
   * @param texto - Texto escrito del rich text
   */
  formatear(texto: string, tema: string) {
    // Quita los espacios y los mantiene en uno solo
    texto = this.quitarNBSP(texto);
    texto = this.formatearEspacios(texto);

    // Preformato inicial utilizando el DOM
    // Identifica los tipos de elementos, titulo, subtitulo, texto, lista, imagen
    const domParser = new DomParserFormatoService(texto, tema);
    const preFormatoDom = domParser.crearPreformato();
    console.log(preFormatoDom);

    // Formato final que va al servidor
    // Crea el formato inicial para la diapositiva y va al servidor
    // Esta estructura determina como se van a crear la diapositivas y que elementos contendrán
    const formatoManager = new FormatoManager(preFormatoDom);
    const formatoFinal = formatoManager.crearFormatoFinal(tema);
    console.log(formatoFinal);

    return formatoFinal;
  }

  formatoEnCambio(texto: string) {
    const dom = new DOMParser().parseFromString(texto, "text/html");
    // this.limpiarH1(dom);
    // this.limpiarP(dom);
    // this.formatearPaH1(dom);
    console.log(dom.body.outerHTML);
    const textoRes = this.quitarBody(dom.body.outerHTML);
    console.log("textoRes", textoRes);
    return this.quitarBody(dom.body.outerHTML);
  }

  // formatearPaH1(dom: Document) {
  //   const tagsH1 = dom.getElementsByTagName('p');
  // }

  /**
   * Si tiene una p dentro de h1 entonces se elimina y se queda con el h1
   */
  limpiarH1(dom: Document) {
    const tagsH1 = dom.getElementsByTagName("h1");
    for (let i = 0; i < tagsH1.length; i++) {
      const tag = tagsH1[i];
      if (tag.children && tag.children.length) {
        // Elimina el primer hijo si existe
        tag.textContent = tag.children[0].textContent || "";
        tag.removeChild(tag.children[0]);
      }
      // Si h1 no tiene nada se elimina tambien, solo cuando se pega
      if (tag.textContent && tag.textContent.trim().length === 0) {
        tagsH1.item(i).remove();
      }
    }
  }

  limpiarP(dom: Document) {
    const tagsP = dom.getElementsByTagName("p");
    for (let i = 0; i < tagsP.length; i++) {
      const tag = tagsP[i];
      // Si h1 no tiene nada se elimina tambien, solo cuando se pega
      if (tag.textContent && tag.textContent.trim().length === 0) {
        tagsP.item(i).remove();
      }
    }
  }

  quitarBody(texto: string) {
    return texto.replace("<body>", "").replace("</body>", "");
  }

  /**
   * Quita los espacios que tienen &NBSP;
   */
  quitarNBSP(texto: string) {
    if (!texto || typeof texto !== "string") {
      return "";
    }

    return texto.replace(/&nbsp;/gi, " ").trim();
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

  /**
   * Deja dos espacios
   */
  formatearEspacios(texto: string) {
    if (!texto || typeof texto !== "string") {
      return "";
    }

    return texto.replace(/\s{2,}/g, " ");
  }
}

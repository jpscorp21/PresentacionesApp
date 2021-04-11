import { IFormato } from "./formato.interface";
import { MAX_LENGTH_TEMAS } from "./max-length-temas";

export class ListaFormato implements IFormato {
  type = "parrafo";
  text = "";
  list: string[] = [];

  constructor(list: string[]) {
    this.list = [...list];
  }

  format(request: any, requests?: any[], tema?: string): void {
    let auxlist = [];

    for (const l of this.list) {
      const total = auxlist.reduce(
        (accum: number, actual: string) => accum + actual.length,
        0
      );

      // console.log("Total", total + l.length);
      // console.log("Total Temas", MAX_LENGTH_TEMAS[tema]);
      // console.log("Tema", tema);

      // Si el total de los textos ya supera el tamaño
      if (total + l.length > MAX_LENGTH_TEMAS[tema] - 100) {
        request.listas = {
          type: "bullet",
          textos: [...auxlist],
        };
        requests.push(Object.assign({}, request));
        auxlist = [];
      }

      // Si supera 4 entonces crear una nueva lista en otra pagina
      if (auxlist.length > 4) {
        request.listas = {
          type: "bullet",
          textos: [...auxlist],
        };
        requests.push(Object.assign({}, request));
        auxlist = [];
      }

      auxlist.push(l);
    }

    request.listas = {
      type: "bullet",
      textos: [...auxlist],
    };

    return request;
  }
}

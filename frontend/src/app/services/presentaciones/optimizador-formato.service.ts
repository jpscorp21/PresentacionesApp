import { IFormato } from './formato.interface';

export class OptimizadorFormatoService {

  private formatoFinal: any[] = [];
  private formatoOptimizado: any[] = [];

  constructor(formatoFinal: any[]) {
    this.formatoFinal = formatoFinal;
  }

  crearFormatoOptimizado() {
    if (this.formatoFinal.length === 0) {
      throw new Error('No existen elementos');
    }

    for (const f of this.formatoFinal) {

    }

  }

  optimizarTexto(f: any) {

  }

  tieneTexto(f: any) {
    return f && f.parrafos && Array.isArray(f.parrafos);
  }

  tieneLista(f: any) {
    return f && f.listas && f.listas.textos && Array.isArray(f.listas.textos);
  }

  tieneImagen(f: any) {
    return f && f.imagenes && Array.isArray(f.imagenes);
  }

}

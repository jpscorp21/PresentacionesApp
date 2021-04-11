import { Pipe, PipeTransform } from '@angular/core';
import { Slides } from '../models/slides';

@Pipe({
  name: 'presentacionesfecha'
})
export class PresentacionesFechaPipe implements PipeTransform {

  cosntructor() {

  }

  transform(value: any[], filtro: string) {
    if (!value || value.length === 0) {
      return [];
    }

    if (filtro === 'res') {
      value.sort((a, b) => a.dateObject.getTime() >= b.dateObject.getTime() ? 1 : 0);
    } else {
      value.sort((a, b) => a.dateObject.getTime() <= b.dateObject.getTime() ? 1 : 0);
    }

    return value;
  }

}

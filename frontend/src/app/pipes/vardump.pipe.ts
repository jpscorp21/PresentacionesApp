import { Pipe, PipeTransform } from '@angular/core';
import { Slides } from '../models/slides';

@Pipe({
  name: 'vardump'
})
export class VardumpPipe implements PipeTransform {

  transform(value: any) {
    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'number') {
      return value.toString();
    }

    return JSON.stringify(value, null, 2);
  }

}

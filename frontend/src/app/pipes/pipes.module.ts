import { NgModule } from '@angular/core';
import { PresentacionesFechaPipe } from './presentaciones-fecha.pipe';
import { VardumpPipe } from './vardump.pipe';

const pipes = [
  PresentacionesFechaPipe,
  VardumpPipe
]

@NgModule({
  declarations: [...pipes],
  exports: [...pipes]
})
export class PipesModule { }

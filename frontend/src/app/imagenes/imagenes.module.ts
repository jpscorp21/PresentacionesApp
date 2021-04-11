import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenesComponent } from './imagenes.component';
import { ImagenesRoutingModule } from './imagenes-routing.module';
import { MaterialModule } from '../modules/material.module';



@NgModule({
  declarations: [ImagenesComponent],
  imports: [
    CommonModule,
    ImagenesRoutingModule,
    MaterialModule
  ]
})
export class ImagenesModule { }

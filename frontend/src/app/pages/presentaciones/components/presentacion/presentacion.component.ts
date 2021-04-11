import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Slides } from '../../../../models/slides';

@Component({
  selector: 'jp-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.scss']
})
export class PresentacionComponent implements OnInit {

  @Input() presentacion: Slides = null;
  @Input() mostrarEliminar = true;
  @Output() ver = new EventEmitter<Slides>();
  @Output() eliminar = new EventEmitter<Slides>();
  @Output() cambioFavorito = new EventEmitter<Slides>();

  constructor() { }

  ngOnInit() {
  }

}

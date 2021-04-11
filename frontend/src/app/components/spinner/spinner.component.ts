import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jp-spinner',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-around center" style="height: 100%;">
      <mat-spinner class="centrado-spinner" [diameter]="50"></mat-spinner>
    </div>
  `
})

export class SpinnerComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}

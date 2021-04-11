import { Injectable } from '@angular/core';

export interface IMenuItem {
  ruta: string;
  titulo: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menu: IMenuItem[] = [
    {
      ruta: '/inicio',
      titulo: 'Inicio',
      icon: 'home'
    },
    {
      ruta: '/clientes',
      titulo: 'Clientes',
      icon: 'person'
    },
  ];

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private _servidor = 'https://fathomless-bayou-29897.herokuapp.com';
  private _puerto = '3000';
  private _url = 'api/v1';

  constructor() { }

  public get servidor() {
    return this._servidor;
  }

  public get puerto() {
    return this._puerto;
  }

  public get url() {
    return this._url;
  }

  public get webservice() {
    return `${this._servidor}/${this._url}`;
  }
}

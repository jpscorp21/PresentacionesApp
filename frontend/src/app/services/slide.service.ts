import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isErrorGoogle } from '../util/error-google';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  private _slides = null;
  public static slidesStatic = null;
  private ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initialize();
  }

  get access_token(): string {
    return localStorage.getItem('tokenauth');
  }

  initialize() {
    gapi.load('client', () => {
      gapi.client.load('slides', 'v1', () => {
        const client: any = gapi.client;

        if (client.slides) {
          this._slides = client.slides;
          // Forma de obtener una referencia global para usar en clases sin inyeccion
          SlideService.slidesStatic = client.slides
          this.ready.next(true);
        }
      })
    });
  }

  /**
   * Para cargar y usarlo en clases sin inyeccion
   */
  addSlides() {
    this._slides = SlideService.slidesStatic;
    return this;
  }

  /**
   * Asegurar de que slide este cargado
   */
  public isReady(): Promise<void> {
    return new Promise((resolve) => {
      if (this.ready.getValue()) {
        resolve();
      } else {
        this.ready.subscribe((ready) => {
          if (ready) {
            resolve();
          }
        });
      }
    });
  }

  /**
   * Acciones del slide
   */

   /**
     * Crea una nueva presentacion
     *
     * @param requestBody Opciones para crear una presentacion
     */
  create(requestBody: any) {
    return this.isReady().then(async () => {
      try {
        const slide = await this._slides.presentations.create({...requestBody, access_token: this.access_token });
        return slide;
      } catch(e) {
        this.errorHandler(e);
      }
    });
  }

  /**
    * Obtiene una presentacion segun su id
    */
  get(presentationId: string | undefined) {
    return this.isReady().then(async () => {
      try {
        const slide = await this._slides.presentations.get({ presentationId, access_token: this.access_token});
        return slide;
      } catch(e) {
        this.errorHandler(e);
      }
    });
  }

  /**
    * Actualiza una presentacion segun id y con su peticiones
    */
  batchUpdate(presentationId: string | undefined, requests: any) {
    return this.isReady().then(async () => {
      try {
          const slide = await this._slides.presentations.batchUpdate({
              presentationId,
              requests: requests.requests,
              access_token: this.access_token
          });
          return slide;
      } catch(e) {
        this.errorHandler(e);
      }
    })
  }

  errorHandler(e: any) {
    if (isErrorGoogle(e.message)) {
      window.location.href = '/login';
    }
  }

}

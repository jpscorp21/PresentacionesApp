import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isErrorGoogle } from '../util/error-google';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  private _drive = null;
  private ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initialize();
  }

  get access_token(): string {
    return localStorage.getItem('tokenauth');
  }

  initialize() {
    gapi.load('client', () => {
      gapi.client.load('drive', 'v2', () => {
        const client: any = gapi.client;
        if (client.drive) {
          this._drive = client.drive;
          this.ready.next(true);
        }
      });
    });
  }

  /**
   * Asegurar de que drive este cargado
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
   * Elimina un archivo del drive segun el id
   */
  delete(fileId: string) {
    return this.isReady().then(async () => {
      return await this._drive.files.delete({fileId, oauth_token: this.access_token});
    });
  }

  /**
   * Obtiene un archivo del drive
   */
  get(fileId: string) {
    return this.isReady().then(async () => {
      return await this._drive.files.get({fileId, fields: '*', oauth_token: this.access_token});
    });
  }

  /**
   * Obtiene el id de la copia de una presentacion
   */
  getCopy(fileId: string, title: string) {
    return this.isReady().then(async () => {
      try {
        return await this._drive.files.copy({
            fileId, fields: '*',
            title,
            oauth_token: this.access_token
        });
      } catch (e) {
        this.errorHandler(e);
      }
    });
  }

  /**
   * Permite
   *
   * @param fileId Id del archivo
   */
  publicPermission(fileId: string) {
    return this.isReady().then(async () => {
      const res = await this._drive.permissions.insert(
          {
              fields: 'id',
              type: 'anyone',
              role: 'writer',
              fileId,
              oauth_token: this.access_token
          }
      );

      return true;
    });
  }

  /**
   * Encargado de exportar un archivo en formato pdf o pptx
   *
   * @param fileId Id del archivo
   */
  export(fileId: any) {
    return this.isReady().then(async () => {
      // const data = await axios.get(`${this.urlFile}/${fileId}?key=${keys.googlekey}&fields=permissionIds`);
      const data = await this._drive.files.get({fileId, fields: 'exportLinks', oauth_token: this.access_token });
      if (!data || !data.result || !data.result.exportLinks) {
          throw new Error('No hay datos');
      }
      return data.result.exportLinks;
    });

  }

  errorHandler(e: any) {
    if (isErrorGoogle(e.result.error.message)) {
      window.location.href = '/login';
    }
  }
}

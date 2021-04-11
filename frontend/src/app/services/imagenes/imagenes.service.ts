import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: AppConfigService
  ) { }

  findImagenesByUser(userid: string) {
    return this.http.get(`${this.config.webservice}/imagenes/get/${userid}`).pipe(
      map((imgs: any) => imgs.map((img: any) => {
        return {
          selected: false,
          ...img
        }
      }))
    );
  }
}

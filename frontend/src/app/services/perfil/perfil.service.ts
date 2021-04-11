import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Perfiles } from '../../models/perfiles';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  cambioPerfilSubject: BehaviorSubject<Perfiles> = new BehaviorSubject<Perfiles>(new Perfiles());

  constructor(
    private readonly http: HttpClient,
    private readonly config: AppConfigService
  ) {
    this.setNewPerfil();
  }

  get cambioPerfil$() {
    return this.cambioPerfilSubject.asObservable();
  }

  async setNewPerfil() {

    const userid = localStorage.getItem('userid');
    if (!userid) {
      return;
    }

    const usuario = await this.getById(userid).toPromise();

    if (!usuario) {
      this.cambioPerfilSubject.next(new Perfiles());
      return;
    }

    this.cambioPerfilSubject.next(usuario);
  }

  getById(id: string): Observable<Perfiles> {
    return this.http.get<Perfiles>(`${this.config.webservice}/usuarios/${id}`).pipe(
      // tap((v) => console.log(v)),
      catchError((e) => {
        console.log(e);
        return of(null);
      })
    );
  }

  update(data: Perfiles, id: string): Observable<Perfiles> {
    return this.http.put<Perfiles>(`${this.config.webservice}/usuarios/${id}`, data).pipe(
      // tap((v) => console.log(v))
    );
  }

  guardarPerfil(data: Perfiles) {
    return this.http.post(`${this.config.webservice}/usuarios`, data).pipe(
      // tap((v) => console.log(v))
    );
  }
}

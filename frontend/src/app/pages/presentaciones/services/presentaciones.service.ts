import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Presentaciones } from '../../../models/presentaciones';
import { Slides } from '../../../models/slides';
import { Observable, BehaviorSubject } from 'rxjs';
import { SlideService } from 'src/app/services/slide.service';
import { SlideGenerator } from '../../../util/slides-generator';
import { THEMES } from '../../../util/themes';
import { DriveService } from '../../../services/drive.service';

interface Query {
  search: string;
}

@Injectable({
  providedIn: 'root'
})
export class PresentacionesService {

  private _loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private presentacionesSubject: BehaviorSubject<Slides[]> = new BehaviorSubject<Slides[]>([]);
  private presentacionesFavoritosSubject: BehaviorSubject<Slides[]> = new BehaviorSubject<Slides[]>([]);
  private _mensajeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _mensajeFavoritoSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  presentaciones = [];
  presentacionesFavoritos = [];


  constructor(
    private readonly http: HttpClient,
    private readonly config: AppConfigService,
    private readonly slideSrv: SlideService,
    private readonly drivesSrv: DriveService,
    private readonly slideGenerator: SlideGenerator
  ) { }

  get loading$() {
    return this._loadingSubject.asObservable();
  }

  get presentacionesFavoritos$() {
    return this.presentacionesFavoritosSubject.asObservable();
  }

  get presentaciones$() {
    return this.presentacionesSubject.asObservable();
  }

  set loadingSubject(val: boolean) {
    this._loadingSubject.next(val);
  }

  get mensaje$(): Observable<string> {
    return this._mensajeSubject.asObservable();
  }

  set mensajeSubject(val: string) {
    this._mensajeSubject.next(val);
  }

  get mensajeFavorito$() {
    return this._mensajeFavoritoSubject.asObservable();
  }

  set mensajeFavoritoSubject(val: string) {
    this._mensajeFavoritoSubject.next(val);
  }

  addSubject(presentaciones: Slides[]) {
    this.presentaciones = [...presentaciones];
    this.presentacionesSubject.next([...presentaciones]);
  }

  addSubjectFavoritos(presentaciones: Slides[]) {
    this.presentacionesFavoritos = [...presentaciones];
    this.presentacionesFavoritosSubject.next([...presentaciones]);
  }

  getAll(query: Query): Observable<Slides[]> {

    const userid = localStorage.getItem('userid') || '1234';

    return this.http.get<Slides[]>(`${this.config.webservice}/presentaciones/${userid}`, {
      params: new HttpParams()
        .set('search', query.search || '')
    })
    .pipe(
      // tap((p) => console.log(p)),
      map((s: any) => {
        return s.map((item) => {
          const slide = new Slides();
          slide.dateObject = item.date ? new Date(item.date) : slide.dateObject;
          slide.date = item.date ? new Date(item.date).toLocaleString() : '-';
          slide.descripcion = item.descripcion || '-';
          slide.titulo = item.titulo || '-';
          slide.presentacionId = item.presentacionId;
          slide._id = item._id;
          slide.esFavorito = item.esFavorito || false;
          return slide;
        });
      }),
      map((s: any[]) => s.length === 0 ? [] : s)
    );
  }

  getAllToSubject(query: Query) {
    this.loadingSubject = true;
    this.mensajeSubject = '';
    this.getAll({
      search: query.search || '',
    }).toPromise().then((v: any) => {
      this.loadingSubject = false;
      this.addSubject(v);
      if (!v.length) {
        this.mensajeSubject = 'No hay presentaciones';
      }
    }).catch((e: any) => {
      // console.log(e);
      this.loadingSubject = false;
      this.addSubject([]);
      this.mensajeSubject = 'Error en el servidor';
    });
  }

  getAllByFavorito() {

    const userid = localStorage.getItem('userid') || '1234';

    return this.http.get<Slides[]>(`${this.config.webservice}/presentaciones/${userid}/favoritos/all`)
    .pipe(
      // tap((p) => console.log(p)),
      map((s: any) => {
        return s.map((item) => {
          const slide = new Slides();
          slide.dateObject = item.date ? new Date(item.date) : slide.dateObject;
          slide.date = item.date ? new Date(item.date).toLocaleString() : '-';
          slide.descripcion = item.descripcion || '-';
          slide.titulo = item.titulo || '-';
          slide.presentacionId = item.presentacionId;
          slide._id = item._id;
          slide.esFavorito = item.esFavorito || false;
          return slide;
        });
      }),
      map((s: any[]) => s.length === 0 ? [] : s)
    );
  }

  getAllFavoritosToSubject() {
    this.loadingSubject = true;
    this.mensajeFavoritoSubject = '';
    this.getAllByFavorito().toPromise().then((v: any) => {
      this.loadingSubject = false;
      this.addSubjectFavoritos(v);
      if (!v.length) {
        this.mensajeFavoritoSubject = 'No hay presentaciones';
      }
    }).catch((e: any) => {
      console.log(e);
      this.loadingSubject = false;
      this.addSubjectFavoritos([]);
      this.mensajeFavoritoSubject = 'Error en el servidor';
    });
  }

  getById(id: string): Observable<Slides> {
    return this.http.get<Slides>(`${this.config.webservice}/presentaciones/${id}/one`)
    .pipe(
      // tap((p) => console.log(p)),
      map((s: Slides) => {
          s.date = s.date ? new Date(s.date).toLocaleString() : '-';
          s.dateObject = new Date(s.date);
          return s;
      })
    );
  }

  getSlideById(presentationId: string): Observable<Slides> {
    return this.http.get<Slides>(`${this.config.webservice}/slides/get/${presentationId}`)
    .pipe(
      // tap((p) => console.log(p))
    );
  }

  async add(data: Presentaciones): Promise<Observable<any>> {

    const resSlide = await this.createPresentationSlide(data);
    const body = {
      ...resSlide,
      ...data
    };

    return this.http.post<any>(`${this.config.webservice}/presentaciones`, body)
    .pipe(
      // tap((p) => console.log(p)),
      catchError(e => {
        this.drivesSrv.delete(resSlide.presentationId)
        .then(() => console.log('eliminado'))
        .catch((e) => console.log(e));
        console.log(e);
        return [];
      }),
      tap((p) => {
        this.getAllToSubject({search: ''});
      })
    );
  }

  addPartial(data: any): Observable<any> {
    return this.http.put<any>(`${this.config.webservice}/presentaciones/create/partial`, data)
    .pipe(
      catchError(e => {
        console.log(e);
        return [];
      }),
      tap((p) => this.getAllToSubject({search: ''}))
    );
  }

  async update(data: Presentaciones, id: string): Promise<Observable<any>> {

    const resSlide = await this.createPresentationSlide(data);
    const body = {
      ...resSlide,
      ...data
    };

    // console.log('Funciono', presentationId);

    return this.http.put<any>(`${this.config.webservice}/presentaciones/${id}`, body)
    .pipe(
      catchError(e => {
        console.log(e);
        return [];
      }),
      tap((p) => this.getAllToSubject({search: ''}))
    );
  }

  updateFavorito(esFavorito: boolean, id: string): Observable<any> {
    return this.http.put<any>(`${this.config.webservice}/presentaciones/${id}/favorito`, {esFavorito})
    .pipe(
      tap((p) => this.refreshAll()),
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.config.webservice}/presentaciones/${id}`)
    .pipe(
      catchError(e => {
        console.log(e);
        return [];
      }),
      tap((p) => this.refreshAll()),
    );
  }

  exportar(id: string, type: string): Observable<any> {
    return this.http.get<any>(`${this.config.webservice}/slides/export/${id}/${type}`, {
      headers: new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
    })
    .pipe(
      // tap((p) => console.log(p)),
    );
  }

  generarDesdeJSON(body: any) {
    return this.http.post(`${this.config.webservice}/slides/generardesdecopy/${body.tema}?title=${body.titulo}`, body.data);
  }

  async createPresentationSlide(data: Presentaciones) {

    const id = THEMES[data.tema] || THEMES.SALERIO;

    const response = await this.drivesSrv.getCopy(id, data.titulo || 'Copia 1');
    // console.log(response);

    // await this.slideGenerator.forPresentation(
    //         response.result.id);
    await this.slideGenerator.forPresentation(
            response.result.id);

    const resSlide = await this.slideGenerator.updateFromJSON(data.formatData as any);

    await this.drivesSrv.publicPermission(resSlide.result.presentationId);

    const exportLinks = await this.drivesSrv.export(resSlide.result.presentationId);

    return {
      presentationId: resSlide.result.presentationId,
      date: resSlide.headers.date,
      exportpptx: exportLinks['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
      exportpdf: exportLinks['application/pdf']
    };
  }

  emptyAll() {
    this.addSubject([]);
    this.addSubjectFavoritos([]);
  }

  refreshAll() {
    this.emptyAll();
    this.getAllFavoritosToSubject();
    this.getAllToSubject({search: ''});
  }

}

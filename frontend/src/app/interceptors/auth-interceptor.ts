import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../services/app-config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(private config: AppConfigService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Intercepta una peticion y extrae el token del auth e inyecta en el encabezado http
    try {

      const authToken = localStorage.getItem('token');

      if (authToken) {
        const authReq = req.clone(
          {
            headers: req.headers.set('Authorization', `Bearer ${authToken}`)
          }
        );
        return next.handle(authReq);
      }
      return next.handle(req);
    } catch (e) {
      console.log(e);
    }

   }
}

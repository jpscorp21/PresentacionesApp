import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpResponse,
 HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        // private readonly router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                const errorMessage = 'Error en el servidor';
                console.log(error);

                if (error.error && error.error.message) {
                    if (this.isProblemLogin(error.error.message)) {
                        window.location.href = '/login';
                    }

                    if (this.isInvalidCredentials(error.error.message)) {
                        window.location.href = '/login';
                    }

                    if (this.isNotUnauthenticated(error.error.message)) {
                        window.location.href = '/login';
                    }
                }

                // Verificar login
                if (error.error && error.error.message && error.error.message.message) {
                    const mensajeError = error.error.message.message;
                    // console.log(mensajeError);

                    if (this.isProblemLogin(mensajeError)) {
                        window.location.href = '/login';
                        // this.router.navigateByUrl('/login');
                    }
                }


                return throwError(errorMessage);
            })
        );
    }

    isProblemLogin(mensajeError: string) {
      return typeof mensajeError === 'string' && mensajeError.indexOf('Login') > -1;
    }

    isInvalidCredentials(mensajeError: string) {
      return typeof mensajeError === 'string' && mensajeError.indexOf('Invalid Credentials') > -1;
    }

    isNotUnauthenticated(mensajeError: string) {
      return typeof mensajeError === 'string' && mensajeError.indexOf('Unauthenticated') > -1;
    }
}

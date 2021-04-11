import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../../services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: AppConfigService
  ) { }

  login(data: {usuario: string, password: string}) {
    return this.http.post(`${this.config.webservice}/auth/login`, data);
  }

  loginGoogle() {
    return this.http.get(`${this.config.webservice}/auth/google`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/html')
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/app-config.service';

@Injectable()
export class RegisterService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: AppConfigService
  ) { }

  registrar(data: any) {
    return this.http.post(`${this.config.webservice}/auth/register`, data);
  }
}

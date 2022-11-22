import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url_api = environment.config.ConfigSocial;
  url = environment.config.ConfigAapiJava;
  dotnet_api = environment.config.ConfigApiDotnet;
  soap_api = environment.config.ConfigApiSoap;
  python_api = environment.config.ConfigApiPython;
  content_api = environment.config.ConfigApiContent;
  public userData = {};
  xmlReq = new XMLHttpRequest();
  rawData = [];
  private list = new BehaviorSubject<string[]>([]);
  readonly list$ = this.list.asObservable();

  constructor(private http: HttpClient) {}

  isHeaderJSON(header) {
    const options: any = { observe: 'response', responseType: 'json' };
    if (header)
      options.headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    return options;
  }

  setHeader(header) {
    let options: any = {
      observe: 'response',
      responseType: 'json',
    };
    if (header)
      options.headers = new HttpHeaders({
        authorization: 'Bearer ' + localStorage.getItem('social_token'),
      });
    return options;
  }

  logout() {
    localStorage.removeItem('system_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  login(params: any): Observable<any> {
    return this.http
      .post(this.url_api + '/v1.0/users/login', params, this.setHeader(false))
      .pipe(map((results) => results));
  }

  checkAuth(): Observable<any> {
    return this.http
      .get(this.url_api + '/v1.0/users/authentication', this.setHeader(true))
      .pipe(map((results) => results));
  }

  postLogout(): Observable<any> {
    return this.http
      .post(this.url_api + '/users/logout', null, this.setHeader(true))
      .pipe(map((results) => results));
  }

  getDashborad(): Observable<any> {
    return this.http
      .get(`${this.content_api}/v1.0/dashboard`, this.isHeaderJSON(true))
      .pipe(map((results) => results));
  }
}

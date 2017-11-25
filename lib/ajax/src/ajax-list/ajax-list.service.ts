import {Inject, Injectable, OpaqueToken} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../../auth/src/auth.service';

export const AJAX_LIST_API_URLS = new OpaqueToken('ajax-list-service AJAX_LIST_API_URLS');

@Injectable()
export class AjaxListService {
  constructor(
    @Inject(AJAX_LIST_API_URLS) private urls: any,
    private http: Http,
    private auth: AuthService
  ) {}

  get(listType: string, params: any): Observable<any> {

    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    if (this.auth.isAuthenticated()) {
      headers.append('Authorization', 'Bearer ' + this.auth.token);
    }

    if (params && Object.keys(params).length) {
      const reqParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        reqParams.append(key, params[key]);
      });

      const options = new RequestOptions({ params: reqParams, headers: headers });
      return this.http.get(this.urls[listType], options)
        .map(resp => resp.json());

    } else {

      const options = new RequestOptions({ headers: headers });
      return this.http.get(this.urls[listType], options)
        .map(resp => resp.json());
    }
  }

  post(listType: string, form: Object): Observable<any> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    if (this.auth.isAuthenticated()) {
      headers.append('Authorization', 'Bearer ' + this.auth.token);
    }
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.urls[listType], form, options)
      .map(
        resp =>
          resp.json()
      );
  }

}


import {Inject, Injectable, OpaqueToken} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from '../../auth/auth.service';

export const AJAX_ITEM_API_URLS = new OpaqueToken('ajax-item-service AJAX_ITEM_API_URLS');

@Injectable()
export class AjaxItemService {
  constructor(
    @Inject(AJAX_ITEM_API_URLS) private urls: any,
    private http: Http,
    private auth: AuthService
  ) {}

  get(itemType: string, params: any) {

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
      return this.http.get(this.urls[itemType], options)
        .map(resp => resp.json());

    } else {

      const options = new RequestOptions({ headers: headers });
      return this.http.get(this.urls[itemType], options)
        .map(resp => resp.json());
    }
  }

  post(itemType: string, form: Object) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    if (this.auth.isAuthenticated()) {
      headers.append('authentication', this.auth.token);
    }
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.urls[itemType], form, options)
      .map(
        resp =>
          resp.json()
      );
  }

}

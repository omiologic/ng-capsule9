import {Inject, Injectable, OpaqueToken} from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

export const AJAX_LIST_API_URLS = new OpaqueToken('ajax-list-service AJAX_LIST_API_URLS');

@Injectable()
export class AjaxListService {
  constructor(
    @Inject(AJAX_LIST_API_URLS) private urls: any,
    private http: Http
  ) {}

  get(listType: string, params: any) {
    if (params && Object.keys(params).length) {
      const reqParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        reqParams.append(key, params[key]);
      });
      const options = new RequestOptions({ params: reqParams });
      return this.http.get(this.urls[listType], options)
        .map(resp => resp.json());
    } else {
      return this.http.get(this.urls[listType])
        .map(resp => resp.json());
    }
  }

  post(listType: string, form: Object) {
    return this.http.post(this.urls[listType], form)
      .map(
        resp =>
          resp.json()
      );
  }

}


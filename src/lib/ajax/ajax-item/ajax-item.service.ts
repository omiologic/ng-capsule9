import {Inject, Injectable, OpaqueToken} from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

export const AJAX_ITEM_API_URLS = new OpaqueToken('ajax-item-service AJAX_ITEM_API_URLS');

@Injectable()
export class AjaxItemService {
  constructor(
    @Inject(AJAX_ITEM_API_URLS) private urls: any,
    private http: Http
  ) {}

  get(itemType: string, params: any) {
    if (params && Object.keys(params).length) {
      const reqParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        reqParams.append(key, params[key]);
      });
      const options = new RequestOptions({ params: reqParams });
      return this.http.get(this.urls[itemType], options)
        .map(resp => resp.json());
    } else {
      return this.http.get(this.urls[itemType])
        .map(resp => resp.json());
    }
  }

  post(itemType: string, form: Object) {
    return this.http.post(this.urls[itemType], form)
      .map(
        resp =>
          resp.json()
      );
  }

}

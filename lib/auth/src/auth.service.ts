import { Injectable } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';

import { AjaxItemActions } from 'ng-capsule9';
import { AUTH_TYPES } from './auth.type';
import { JwtHelper } from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Subscriber} from 'rxjs/Subscriber';

@Injectable()
export class AuthService {
  @select(['token', 'item', 'token']) readonly token$: Observable<string>;
  @select(['token', 'error']) readonly tokenError$: Observable<any>;

  tokenSubscription$: Subscription;
  constructor(
    private store: NgRedux<any>,
    private ajaxItem: AjaxItemActions,
    private jwtHelper: JwtHelper
  ) {}

  tokenSubscription(callback: (token: string) => void): Subscription {
    return this.token$.subscribe(callback);
  }

  isAuthenticated(): boolean {
    // const cachedToken = JSON.parse(localStorage.getItem('reduxPersist:token'));
    // console.log('isAuthenticated() | cachedToken', cachedToken);
    // // if (token) {
    // //   return !this.jwtHelper.isTokenExpired(token)
    // // } else
    const { token } = this;
    if (token) {
      console.log('isAuthenticated() | jwtHelper.isTokenExpired',
        token, !this.jwtHelper.isTokenExpired(token));
      return !this.jwtHelper.isTokenExpired(token)
    } else {
      return false;
    }
  }

  get token(): any {
    const cache: string | null = localStorage.getItem('reduxPersist:token');
    const cachedToken: any | null = cache ? JSON.parse(cache) : cache;
    console.log('get token()', cachedToken);
    return cachedToken && cachedToken.item ? cachedToken.item.token : null;
  }

  setAuthorizationBearer(token: string) {
    (function(open) {
      XMLHttpRequest.prototype.open = function () {
        open.apply(this, arguments);
        if (token) {
          this.setRequestHeader('Authorization', 'Bearer ' + token);
        }
      };
    })(XMLHttpRequest.prototype.open);
  }

  login(email: string, password: string) {
    this.store.dispatch(this.ajaxItem.submitForm(AUTH_TYPES.TOKEN, { email, password, }));
  }

  logout() {
    localStorage.clear();
    console.log('logout | localStorage', localStorage, this.token)
    this.store.dispatch({type: AUTH_TYPES.LOG_OUT});
  }
}

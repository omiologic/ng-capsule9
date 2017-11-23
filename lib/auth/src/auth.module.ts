import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButtonDirective } from './auth.directive';
import { LoginFormComponent } from './login/login-form.component';
import { AjaxItemModule } from '../../ajax/src/ajax-item/ajax-item.module';
import {NgReduxModule} from '@angular-redux/store';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth.guard.service';
import {AuthConfig, AuthHttp, JwtHelper} from 'angular2-jwt';
import {Http, HttpModule, RequestOptions} from '@angular/http';

// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   return new AuthHttp(new AuthConfig(), http, options);
// }

const AUTH_MODULE_EXPORTS = [
  LogoutButtonDirective,
  LoginFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    AjaxItemModule,
    NgReduxModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    JwtHelper
  ],
  declarations: AUTH_MODULE_EXPORTS,
  exports: AUTH_MODULE_EXPORTS
})
export class AuthModule {}

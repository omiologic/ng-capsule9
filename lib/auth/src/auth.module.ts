import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgReduxModule } from '@angular-redux/store';
import { ReactiveFormsModule } from '@angular/forms';
import { AjaxItemModule } from 'ng-capsule9';
import { LogoutButtonDirective } from './auth.directive';
import { LoginFormComponent } from './login/login-form.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth.guard.service';
import { JwtHelper } from 'angular2-jwt';

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

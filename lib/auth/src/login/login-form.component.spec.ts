// import { Component } from '@angular/core';
// import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
// import { Location } from '@angular/common';
// import { Router } from '@angular/router';
// import { LoginComponent } from './login.component';
// import { AuthService } from '../auth.service';
// import { ItemActions } from '../../ajax/item/item.actions';
//
// describe('LoginComponent', () => {
//
//   @Component({
//     template: '<router-outlet></router-outlet>'
//   })
//
//   class RouteComponent {}
//
//   @Component({
//     template: '<p>blank component</p>'
//   })
//
//   class DefaultComponent {}
//
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let auth: AuthService;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ RouteComponent, LoginComponent, DefaultComponent ],
//       imports: [
//         ReactiveFormsModule,
//         RouterTestingModule.withRoutes([
//           { path: '', component: DefaultComponent },
//           { path: 'login', component: LoginComponent }
//         ]),
//         NgReduxTestingModule
//       ],
//       providers: [
//         AuthService,
//         ItemActions
//       ],
//     })
//       .compileComponents().then(() => {
//       fixture = TestBed.createComponent(LoginComponent);
//       component = fixture.componentInstance;
//     });
//
//     MockNgRedux.reset();
//
//     auth = TestBed.get(AuthService);
//   }));
//
//   beforeEach(() => {
//     localStorage.clear();
//   });
//
//   it('should create', async(() => {
//     expect(component).toBeTruthy();
//   }));
//
//   describe('ngOnInit()', () => {
//
//     let routeComponent: RouteComponent;
//     let routeFixture: ComponentFixture<RouteComponent>;
//
//     beforeEach(() => {
//       routeFixture = TestBed.createComponent(RouteComponent);
//       routeComponent = routeFixture.componentInstance;
//     });
//
//     it('should redirect to base url when token exists and current location is login url', async(
//       inject([Router, Location], (router: Router, location: Location) => {
//         const data = require('../../../../json-server/db.json');
//         const token = JSON.stringify({item: data.user_token});
//         router.navigate(['/']).then(() => {
//           expect(location.path()).toBe('/');
//           return router.navigate(['/login']);
//         }).then(() => {
//           const token$: any = component.token$;
//           token$.next(data.user_token.jwt);
//           return component.ngOnInit();
//         }).then(() => {
//           const tokenSubscription$ = component.tokenSubscription$;
//           expect(location.path()).toBe('/');
//         });
//       })
//     ));
//   });
//
//   describe('submitForm(authForm)', () => {
//     it('should exist', () => {
//       expect(component.submitForm).toBeTruthy();
//       expect(typeof component.submitForm).toBe('function');
//     });
//
//     it('should have called when submit button is clicked', () => {
//       const button = fixture.debugElement.query(By.css('.btn-success'));
//       fakeAsync(() => {
//         button.triggerEventHandler('click', null);
//         tick();
//         fixture.detectChanges();
//         expect(component.submitForm).toHaveBeenCalled();
//       });
//     });
//
//     it('should not called login() when argument is null', async(() => {
//       const spy = spyOn(auth, 'login');
//       const form = {
//         auth: { email: null, password: null }
//       };
//
//       component.submitForm({
//         email: form.auth.email,
//         password: form.auth.password
//       });
//       expect(spy).not.toHaveBeenCalled();
//     }));
//
//     it('should have called login() from AuthService when form is submitted', async(() => {
//       const spy = spyOn(auth, 'login');
//       const form = {
//         auth: { email: 'test@test.com', password: '1234' }
//       };
//
//       component.submitForm({
//         email: form.auth.email,
//         password: form.auth.password
//       });
//       expect(spy).toHaveBeenCalled();
//       expect(spy).toHaveBeenCalledWith(form.auth.email, form.auth.password);
//     }));
//   });
// });

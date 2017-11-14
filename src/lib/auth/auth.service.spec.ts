// import { TestBed, async, inject } from '@angular/core/testing';
// import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
// import { ItemActions } from '../ajax/item/item.actions';
// import { ITEM_TYPES } from '../ajax/item/item.types';
// import { LOGGED_OUT } from '../core.type';
// import { AuthService } from './auth.service';
// describe('AuthService', () => {
//
//   const data = require('../../../json-server/db.json');
//   const token = JSON.stringify({
//     item: data.user_token
//   });
//
//   let service;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NgReduxTestingModule],
//       providers: [
//         AuthService,
//         ItemActions,
//         MockNgRedux,
//       ]
//     });
//     MockNgRedux.reset();
//   });
//
//   beforeEach(async(inject(
//     [AuthService, ItemActions],
//     (auth: AuthService, actions: ItemActions) => {
//       service = auth;
//     })
//   ));
//
//   it('should exist', () => {
//     expect(service).toBeTruthy();
//   });
//
//   describe('get authenticated()', () => {
//
//     beforeEach(() => {
//       localStorage.clear();
//     });
//
//     it('should return true when token exists', () => {
//       localStorage.setItem('reduxPersist:token', token);
//       expect(service.authenticated).toBeTruthy();
//     });
//
//     it('should return false when token expired', () => {
//       // const authed = service.authenticated;
//       // console.log('authed: ', authed);
//       expect(service.authenticated).toBeFalsy();
//     });
//   });
//
//   describe('get token()', () => {
//
//     beforeEach(() => {
//       localStorage.clear();
//     });
//
//     it('should return token when exist', () => {
//       localStorage.setItem('reduxPersist:token', token);
//       expect(service.token).toBe(data.user_token.jwt);
//     });
//
//     it('should return false when token expired', () => {
//       expect(service.token).toBeFalsy();
//     });
//   });
//
//   describe('login(email, password)', () => {
//     it('should dispatch ajax call to retrieve user token', () => {
//       const spy = spyOn(MockNgRedux.mockInstance, 'dispatch');
//       const form = {
//         auth: {
//           email: 'test@test.com',
//           password: '1234'
//         }
//       };
//
//       service.login(form.auth.email, form.auth.password);
//
//       expect(spy).toHaveBeenCalledWith({
//         type: ItemActions.LOAD_STARTED,
//         meta: {
//           itemType: ITEM_TYPES.TOKEN
//         },
//         form
//       });
//
//     });
//   });
//
//   describe('logout()', () => {
//
//     it('should clear cached data in local storage', () => {
//       spyOn(localStorage, 'clear');
//       service.logout();
//       expect(localStorage.clear).toHaveBeenCalled();
//     });
//
//     it('should dispatch action to empty store', () => {
//       const spy = spyOn(MockNgRedux.mockInstance, 'dispatch');
//       service.logout();
//       expect(spy).toHaveBeenCalledWith({type: LOGGED_OUT});
//     });
//   });
//
//   describe('setAuthorizationBearer(token)', () => {
//     it('should have called XMLHttpRequest to set request headers', async(() => {
//       const spy = spyOn(XMLHttpRequest.prototype, 'setRequestHeader').and.callThrough();
//       const req = new XMLHttpRequest();
//
//       localStorage.setItem('reduxPersist:token', token);
//       service.setAuthorizationBearer(JSON.parse(token).item.jwt);
//       req.open('GET', '/');
//       const bearer = 'Bearer ' + JSON.parse(token).item.jwt;
//       expect(spy).toHaveBeenCalledWith('Authorization', bearer.replace(/"/gi, ''));
//     }));
//
//   });
// });

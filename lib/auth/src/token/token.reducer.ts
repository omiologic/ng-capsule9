import { AjaxItemActions } from 'ng-capsule9';
import { AUTH_TYPES } from '../auth.type';
// -------------------------------------------------------------------
// TOKEN STORE : not being used still in development
// -------------------------------------------------------------------
export const TokenReducer = (state = null, action: {type: string, payload: any}) => {
  let token;
  switch (action.type) {

    case AjaxItemActions.LOAD_SUCCEEDED:
      if (action.payload.token) {
        token = action.payload.token;
      } else {
        token = state;
      }
      break;

    case AUTH_TYPES.LOG_OUT:
      token = null;
      break;

    default:
      token = state;
  }

  return token;
};

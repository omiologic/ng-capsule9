import { AjaxItemActions } from '../../../ajax/src/ajax-item/ajax-item.actions';
import { AUTH_TYPES } from '../auth.type';
// -------------------------------------------------------------------
// TOKEN STORE
// -------------------------------------------------------------------
export const TokenReducer = (state = null, {type, payload}) => {
  let token;
  switch (type) {

    case AjaxItemActions.LOAD_SUCCEEDED:
      if (payload.token) {
        token = payload.token;
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

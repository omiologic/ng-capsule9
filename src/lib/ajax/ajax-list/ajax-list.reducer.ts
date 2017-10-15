import { AjaxListActions } from './ajax-list.actions';
import { IPayloadAction } from '../payload.types';
import { AjaxList } from './ajax-list.types';

const INITIAL_STATE: AjaxList = {
  error: null,
  list: [],
  listType: null,
  loading: false,
};

// A higher-order reducer: accepts an list type and returns a reducer
// that only responds to actions for that particular list type.
export function createListReducer(listType: string) {
  return function listReducer(state: AjaxList = INITIAL_STATE,
                              action: IPayloadAction<any[] | any, any>): AjaxList {

    if (!action.meta || action.meta.listType !== listType) {
      return state;
    }

    switch (action.type) {
      case AjaxListActions.LOAD_STARTED:
        return {
          error: null,
          list: [],
          listType: null,
          loading: true,
        };
      case AjaxListActions.LOAD_SUCCEEDED:
        return {
          error: null,
          list: action.payload,
          listType: action.meta.listType,
          loading: false,
        };
      case AjaxListActions.LOAD_FAILED:
        return {
          error: action.error,
          list: null,
          listType: null,
          loading: false,
        };
    }

    return state;
  };
}

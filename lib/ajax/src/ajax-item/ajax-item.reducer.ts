import { AjaxItemActions } from './ajax-item.actions';
import { IPayloadAction } from '../payload.types';
import { AjaxItem } from './ajax-item.types';

const INITIAL_STATE: AjaxItem = {
  error: null,
  item: {},
  itemType: null,
  loading: false,
};

// A higher-order reducer: accepts an item type and returns a reducer
// that only responds to actions for that particular item type.
export function createItemReducer(itemType: string) {
  return function itemReducer(state: AjaxItem = INITIAL_STATE,
                              action: IPayloadAction<AjaxItem, any>): AjaxItem {

    if ((!action.meta || action.meta.itemType !== itemType) && !(action.type === 'LOG_OUT')) {
      return state;
    }

    switch (action.type) {
      case AjaxItemActions.LOAD_STARTED:
        return {
          error: null,
          item: null,
          itemType: null,
          loading: true,
        };
      case AjaxItemActions.LOAD_SUCCEEDED:
        return {
          error: null,
          item: action.payload,
          itemType: action.meta.itemType,
          loading: false,
        };
      case AjaxItemActions.LOAD_FAILED:
        return {
          error: action.error,
          item: null,
          itemType: null,
          loading: false,
        };
      case 'LOG_OUT':
        return {
          error: null,
          item: null,
          itemType: null,
          loading: false,
        };
    }

    return state;
  };
}

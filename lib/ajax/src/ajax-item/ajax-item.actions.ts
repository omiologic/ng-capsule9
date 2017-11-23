import { Injectable } from '@angular/core';

@Injectable()
export class AjaxItemActions {
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  loadItem(itemType, params = {}) {
    return {
      type: AjaxItemActions.LOAD_STARTED,
      meta: { itemType },
      params
    };
  }

  loadSucceeded(itemType, payload) {
    return {
      type: AjaxItemActions.LOAD_SUCCEEDED,
      meta: { itemType },
      payload,
    };
  }

  loadFailed(itemType, error) {
    return {
      type: AjaxItemActions.LOAD_FAILED,
      meta: { itemType },
      error,
    };
  }

  submitForm(itemType, form) {
    return {
      type: AjaxItemActions.LOAD_STARTED,
      meta: { itemType },
      form
    };
  }
}

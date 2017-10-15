import { Injectable } from '@angular/core';

@Injectable()
export class AjaxListActions {
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  loadItem(itemType, params = {}) {
    return {
      type: AjaxListActions.LOAD_STARTED,
      meta: { itemType },
      params
    };
  }

  loadSucceeded(itemType, payload) {
    return {
      type: AjaxListActions.LOAD_SUCCEEDED,
      meta: { itemType },
      payload,
    };
  }

  loadFailed(itemType, error) {
    return {
      type: AjaxListActions.LOAD_FAILED,
      meta: { itemType },
      error,
    };
  }

  submitForm(itemType, form) {
    return {
      type: AjaxListActions.LOAD_STARTED,
      meta: { itemType },
      form
    };
  }
}

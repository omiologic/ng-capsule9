import { Injectable } from '@angular/core';

@Injectable()
export class AjaxListActions {
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  loadList(listType, params = {}) {
    return {
      type: AjaxListActions.LOAD_STARTED,
      meta: { listType },
      params
    };
  }

  loadSucceeded(listType, payload) {
    return {
      type: AjaxListActions.LOAD_SUCCEEDED,
      meta: { listType },
      payload,
    };
  }

  loadFailed(listType, error) {
    return {
      type: AjaxListActions.LOAD_FAILED,
      meta: { listType },
      error,
    };
  }

  submitForm(listType, form) {
    return {
      type: AjaxListActions.LOAD_STARTED,
      meta: { listType },
      form
    };
  }
}

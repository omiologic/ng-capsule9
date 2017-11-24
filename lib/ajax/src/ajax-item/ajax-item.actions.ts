import { Injectable } from '@angular/core';

@Injectable()
export class AjaxItemActions {
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  loadItem(itemType: string, params = {}) {
    return {
      type: AjaxItemActions.LOAD_STARTED,
      meta: { itemType },
      params
    };
  }

  loadSucceeded(itemType: string, payload: any) {
    return {
      type: AjaxItemActions.LOAD_SUCCEEDED,
      meta: { itemType },
      payload,
    };
  }

  loadFailed(itemType: string, error: any) {
    return {
      type: AjaxItemActions.LOAD_FAILED,
      meta: { itemType },
      error,
    };
  }

  submitForm(itemType: string, form: any) {
    return {
      type: AjaxItemActions.LOAD_STARTED,
      meta: { itemType },
      form
    };
  }
}

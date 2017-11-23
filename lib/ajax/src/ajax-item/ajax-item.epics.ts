import {Injectable, OpaqueToken} from '@angular/core';
import {createEpicMiddleware, EpicMiddleware} from 'redux-observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {AjaxItemActions} from './ajax-item.actions';
import {AjaxItemService} from './ajax-item.service';

@Injectable()
export class AjaxItemEpics {
  constructor(private service: AjaxItemService,
              private actions: AjaxItemActions,
  ) {
  }

  /**
   *
   * @param {string} itemType
   * @returns {EpicMiddleware<any|any, S>}
   */
  public createEpic(itemType: string) {
    return createEpicMiddleware(this.createLoadItemEpic(itemType));
  }

  /**
   *
   * @param props - see params passed to simpleEpic
   * @returns {EpicMiddleware<T, S>}
   */
  public createSimpleEpic(props) {
    return createEpicMiddleware(this.simpleEpic(props));
  }

  /**
   *
   * @param {(action$:any)=>Observable<R>} action - The action/observable to output
   * @param {string} [filter] - Optional property to filter on (if property exists return true)
   * @param {(action$:any)=>Observable<R>} trigger - The input action/observable
   * @returns {(action$:any)=>Observable<R>} - Returns action if not filtered
   */
  private simpleEpic({action, filter, trigger}) {
    return action$ => action$
      .ofType(trigger)
      .filter(({payload}) => {
        if (filter) {
          return !!payload[filter];
        } else {
          return true;
        }

      })
      .map(() => action);
  }

  /**
   *
   * @param {object} response
   * @param {string} itemType
   * @returns {(action$:any)=>Observable<R|T>}
   */
  private loadFailed(response, itemType) {
    return of(this.actions.loadFailed(itemType, {
      status: '' + response.status,
    }))
  }

  /**
   *
   * @param {string} itemType
   * @returns {(action$:any)=>Observable<R|T>}
   */
  private createLoadItemEpic(itemType) {
    return action$ => action$
      .ofType(AjaxItemActions.LOAD_STARTED)
      .filter(({meta}) => {
        return meta.itemType === itemType
      })
      .switchMap(({form, params}) => {
        if (form) {
          return this.service.post(itemType, form)
            .map(data => this.actions.loadSucceeded(itemType, data))
            .catch(response => this.loadFailed(response, itemType))
        } else {
          return this.service.get(itemType, params)
            .map(data => this.actions.loadSucceeded(itemType, data))
            .catch(response => this.loadFailed(response, itemType))
        }
      })
  }
}

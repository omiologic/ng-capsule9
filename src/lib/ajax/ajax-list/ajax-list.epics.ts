import {Injectable} from '@angular/core';
import {/* Epic, */ createEpicMiddleware} from 'redux-observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {AjaxListActions} from './ajax-list.actions';
import {AjaxListService} from './ajax-list.service';

@Injectable()
export class AjaxListEpics {
  constructor(private service: AjaxListService,
              private actions: AjaxListActions,
  ) {
  }

  /**
   *
   * @param {string} listType
   * @returns {EpicMiddleware<any|any, S>}
   */
  public createEpic(listType: string) {
    return createEpicMiddleware(this.createLoadListEpic(listType));
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
   * @param {string} listType
   * @returns {(action$:any)=>Observable<R|T>}
   */
  private loadFailed(response, listType) {
    return of(this.actions.loadFailed(listType, {
      status: '' + response.status,
    }))
  }

  /**
   *
   * @param {string} listType
   * @returns {(action$:any)=>Observable<R|T>}
   */
  private createLoadListEpic(listType) {
    return action$ => action$
      .ofType(AjaxListActions.LOAD_STARTED)
      .filter(({meta}) => {
        return meta.listType === listType
      })
      .switchMap(({form, params}) => {
        if (form) {
          return this.service.post(listType, form)
            .map(data => this.actions.loadSucceeded(listType, data))
            .catch(response => this.loadFailed(response, listType))
        } else {
          return this.service.get(listType, params)
            .map(data => this.actions.loadSucceeded(listType, data))
            .catch(response => this.loadFailed(response, listType))
        }
      })
  }
}

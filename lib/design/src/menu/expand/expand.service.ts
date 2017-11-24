import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExpandableService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$: Observable<any> = this.emitChangeSource.asObservable();

  constructor() { }

  emitChange(expandedList: any) {
    this.emitChangeSource.next(expandedList);
  }
}

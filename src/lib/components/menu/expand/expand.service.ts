import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExpandableService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor() { }

  emitChange(expandedList: any) {
    this.emitChangeSource.next(expandedList);
  }
}

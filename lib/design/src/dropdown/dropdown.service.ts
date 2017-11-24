import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DropdownService {
  private emitChangeSource = new Subject<string>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  activeId: string;
  constructor() { }

  emitChange(toggledItem: any) {
    this.activeId = this.activeId !== toggledItem.id ? toggledItem.id : null;

    console.log('DropdownService - emitChange', this.activeId, toggledItem.id);
    this.emitChangeSource.next(this.activeId);
    return;
  }
}

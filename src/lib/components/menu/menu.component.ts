import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'cp-menu',
  template: `
    <ng-content selector="cp-menu-item"></ng-content>
  `,
  styleUrls: ['./menu.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponent {}

@Component({
  selector: 'cp-menu-label',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})

export class MenuLabelComponent {}


@Component({
  selector: 'cp-menu-item',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})

export class MenuItemComponent {}

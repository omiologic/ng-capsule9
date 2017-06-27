import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'ui-menu',
  template: `
    <ng-content selector="ui-menu-item"></ng-content>
  `,
  styleUrls: ['./menu.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponent {}

@Component({
  selector: 'ui-menu-label',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})

export class MenuLabelComponent {}


@Component({
  selector: 'ui-menu-item',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})

export class MenuItemComponent {}

import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'cp-menu',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponent {
  @HostBinding('class.menu') private _isMenu = true;
}

@Component({
  selector: 'cp-menu-label',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})

export class MenuLabelComponent {
  @HostBinding('class.menu-label') private _isMenuLabel = true;
}

@Component({
  selector: 'cp-menu-list',
  template: `<ng-content select="cp-menu-item"></ng-content>`,
  encapsulation: ViewEncapsulation.None
})

export class MenuListComponent {
  @HostBinding('class.menu-list') private _isMenuList = true;
}


@Component({
  selector: 'cp-menu-item',
  template: `
    <ng-content select="cp-menu-label"></ng-content>
    <ng-content select="a"></ng-content>
    <ng-content select="cp-menu-list"></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})

export class MenuItemComponent {

}

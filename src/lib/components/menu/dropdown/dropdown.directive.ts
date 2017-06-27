import {Directive, HostBinding} from '@angular/core';
@Directive({
  selector: 'ui-menu[uiDropdown], ui-menu[dropdown]'
})

export class DropdownDirective {
  @HostBinding('class.dropdown') isDropdown: boolean;

  constructor() {
    this.isDropdown = true;
  }
}

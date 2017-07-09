import {Directive, HostBinding} from '@angular/core';
@Directive({
  selector: 'cp-menu[cpDropdown], cp-menu[dropdown]'
})

export class DropdownDirective {
  @HostBinding('class.dropdown') isDropdown: boolean;

  constructor() {
    this.isDropdown = true;
  }
}

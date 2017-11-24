import {
  AfterContentInit,
  Component, ContentChild, Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy,
  OnInit,
  Renderer2, ViewEncapsulation
} from '@angular/core';
import {DropdownService} from './dropdown.service';

/*
  tslint:disable directive-selector
  tslint:disable directive-class-suffix
  tslint:disable component-class-suffix
*/
@Directive({
  selector: 'cp-dropdown-item, [cp-dropdown-item], [dropdown-item]'
})
export class DropdownItem {
  @HostBinding('class.dropdown-item') @Input() isItem: boolean = true;
  @HostBinding('class.dropdown-divider') isDivider: boolean;
  @Input() set divider (val: boolean) {
    this.isDivider = val;
    if (this.isDivider) {
      this.isItem = false;
    }
  }
}

@Component({
  selector: 'cp-dropdown-trigger',
  template: `
    <button class="dropdown-trigger button" (click)="handleClick($event)">
      <ng-content></ng-content>
    </button>`,
  encapsulation: ViewEncapsulation.None,
})
export class DropdownTrigger {
  @Input() id: string;
  @HostBinding('class.dropdown-trigger') public isDropdownTrigger: boolean = true;

  @HostListener('document:click', ['$event.target']) handleOutsideClick(target: HTMLElement) {
    if (!target.className.includes('navbar-link')
      && !target.className.includes('navbar-item')
      && !target.className.includes('navbar-dropdown')
      && !target.className.includes('dropdown-trigger')
      && target.parentElement
      && !target.parentElement.className.includes('dropdown-trigger')
    ) {
      this.dropdown.emitChange({ id: null, target });
    }
  };

  constructor(private dropdown: DropdownService) { }

  handleClick(e: any) {
    console.log('DropdownTrigger - handleClick', this.id);
    this.dropdown.emitChange({ id: this.id, target: e.target });
  }

}

@Component({
  selector: 'cp-dropdown-menu',
  template: `
    <div class="dropdown-content">
      <ng-content select="cp-dropdown-item, [cp-dropdown-item], [dropdown-item]"></ng-content>
    </div>`,
  encapsulation: ViewEncapsulation.None,
})
export class DropdownMenu {
  @HostBinding('class.dropdown-menu') public isDropdownMenu: boolean = true;
}

@Component({
  selector: 'cp-dropdown',
  template: `
    <ng-content select="cp-dropdown-trigger"></ng-content>
    <ng-content select="cp-dropdown-menu"></ng-content>
  `,
  // providers: [DropdownService],
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DropdownButton implements OnInit, OnDestroy, AfterContentInit {
  @HostBinding('class.dropdown') @Input() public isDropdown: boolean = true;
  @HostBinding('class.is-active') @Input() public isActive: boolean;
  @ContentChild(DropdownTrigger) trigger: DropdownTrigger;
  @ContentChild(DropdownMenu) menu: DropdownMenu;
  @Input() id: string;

  public dropdownSubscription$;
  constructor(
    private dropdown: DropdownService
  ) {
    this.toggleItem = this.toggleItem.bind(this);
  }

  ngOnInit() {
    if (!this.id) {
      throw new Error('Dropdown Button requires id property');
    }
    this.dropdownSubscription$ = this.dropdown.changeEmitted$.subscribe(this.toggleItem);
  }

  ngAfterContentInit() {
    if (!this.trigger) {
      throw new Error('DropdownButton requires DropdownTrigger as child');
    }
    this.trigger.id = this.id;
  }

  ngOnDestroy() {
    if (this.dropdownSubscription$) {
      this.dropdownSubscription$.unsubscribe();
    }
  }

  toggleItem(activeId: string) {
    this.isActive = activeId === this.id;
  }
}
/* tslint:enable component-class-suffix */

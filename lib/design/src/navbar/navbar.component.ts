import {
  AfterContentInit,
  Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input,
  OnDestroy, OnInit,
  Output, QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {DropdownService} from '../dropdown/dropdown.service';


@Directive({
  selector: '[cp-navbar-dropdown], [navbarDropdown], [navbar-dropdown]'
})
export class NavbarDropdownDirective {
  @HostBinding('class.navbar-dropdown') public isDropdown: boolean = true;
}

@Directive({
  selector: '[cp-navbar-link], [navbarLink], [navbar-link]'
})
export class NavbarLinkDirective {
  public id: string;
  @HostBinding('class.navbar-link') public isLink: boolean = true;
  @HostListener('click', ['$event.target']) handleClick(target: HTMLElement) {
    if (target.className.includes('navbar-link')) {
      this.dropdown.emitChange({ id: this.id, target });
    }
  };

  @HostListener('document:click', ['$event.target']) handleOutsideClick(target: HTMLElement) {
    if (target && !target.className.includes('navbar-link')
      && !target.className.includes('navbar-item')
      && !target.className.includes('navbar-dropdown')
      && !target.className.includes('dropdown-trigger')
      && target.parentElement
      && !target.parentElement.className.includes('dropdown-trigger')
    ) {
      this.dropdown.emitChange({ id: null, target });
    }

  };

  constructor(public dropdown: DropdownService) { }
}

@Directive({
  selector: '[cp-navbar-item], [navbarItem], [navbar-item]'
})
export class NavbarItemDirective implements AfterContentInit, OnInit, OnDestroy {
  @ContentChild(NavbarDropdownDirective) navDropdown: NavbarDropdownDirective;
  @ContentChild(NavbarLinkDirective) link: NavbarLinkDirective;
  @HostBinding('class.is-active') public isActive: boolean = false;

  @Output() public onToggle: EventEmitter<any> = new EventEmitter();

  public linkOnClick$;
  public dropdownSubscription$;
  constructor(
    public elem: ElementRef,
    public renderer: Renderer2,
    public dropdown: DropdownService
  ) {
    this.toggleItem = this.toggleItem.bind(this);
  }

  ngAfterContentInit() {
    if (this.navDropdown) {
      this.renderer.addClass(this.elem.nativeElement, 'has-dropdown');
    }

    if (this.link) {
      this.link.id = this.elem.nativeElement.id;
    }

    this.renderer.addClass(this.elem.nativeElement, 'navbar-item');
  }

  ngOnInit() {
    this.dropdownSubscription$ = this.dropdown.changeEmitted$.subscribe(this.toggleItem)
  }

  ngOnDestroy() {
    if (this.dropdownSubscription$) {
      this.dropdownSubscription$.unsubscribe();
    }
  }

  toggleItem(activeId: string) {
    console.log('NavbarItemDirective - dropdownSubscription$', activeId);
    this.isActive = activeId === this.elem.nativeElement.id;

  }
}


@Component({
  selector: 'cp-navbar',
  template: `<ng-content select="cp-navbar-menu"></ng-content>`,
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  @HostBinding('class.navbar') public isNavbar: boolean = true;
  // Todo: implement backgroundCheck.js as BackgroundCheckDirective to dynamically detect background color
}


@Component({
  selector: 'cp-navbar-menu',
  template: `<ng-content select="cp-navbar-menu-group"></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class NavbarMenuComponent {
  @HostBinding('class.navbar-menu') public isNavbarMenu: boolean = true;
}

/*
 * NavbarMenuGroupComponent
 * https://bulma.io/documentation/components/navbar/#navbar-start-and-navbar-end
 */
@Component({
  selector: 'cp-navbar-menu-group',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class NavbarMenuGroupComponent implements OnInit {
  @Input() position: 'start' | 'end' | 'center';

  constructor(
    public elem: ElementRef,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    if (!this.position) {
      this.position = 'start';
    }
    this.renderer.addClass(this.elem.nativeElement, `navbar-${this.position}`);
  }
}


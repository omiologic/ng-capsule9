import {
  AfterContentInit, ChangeDetectionStrategy,
  Component, ContentChild, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit,
  Output,
  Renderer2, SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'cp-sidebar-toggle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class SidebarToggleComponent implements OnInit {
  public isExpanded: boolean;
  @Input() type: 'bar' | 'arrow' = 'bar';

  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  @HostListener('click') handleToggle(e: any) {
    this.isExpanded = !this.isExpanded;
    this.toggle.emit(this.isExpanded);
  }
  constructor(
    public elem: ElementRef,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.setClass()
  }

  setClass() {
    switch (this.type) {

      case 'bar':
        this.renderer.addClass(this.elem.nativeElement, 'is-bar');
        break;

      case 'arrow':
        this.renderer.addClass(this.elem.nativeElement, 'is-arrow');
        break;

    }
  }
}

@Component({
  selector: 'cp-sidebar-close',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class SidebarCloseComponent implements OnInit {
  @Input() type: 'overlay' | 'button' = 'overlay';
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  @HostListener('click') handleClose(e: any) {
    this.close.emit(false);
  }

  constructor(
    public elem: ElementRef,
    public renderer: Renderer2
  ) { }

  ngOnInit() {
    this.setClass()
  }

  setClass() {
    switch (this.type) {

      case 'overlay':
        this.renderer.addClass(this.elem.nativeElement, 'is-overlay');
        break;

      case 'button':
        this.renderer.addClass(this.elem.nativeElement, 'is-button');
        break;

    }
  }
}


/*
 * -----------------
 * Sidebar Component
 * -----------------
 * works as container element which can be slide from left / right side
 */
@Component({
  selector: 'cp-sidebar',
  template: `
    <div class="sidebar-content"
         [ngClass]="{'is-fullscreen': config && config.fullscreen}">
      <div>
        <div class="content-container">
          <ng-content></ng-content>
        </div>
        <!--<div class="sidebar-collapse-btn" (click)="handleClose($event)">
          &lt;!&ndash; Todo: make button component which can hold ng-content &ndash;&gt;
          close menu
          <i class="fa fa-times"></i>
        </div>-->
        <!--<div class="sidebar-toggle-btn" (click)="handleToggle($event)">
          &lt;!&ndash; Todo: make button component which can hold ng-content &ndash;&gt;
          <span>Menu</span>
          <div class="toggle-arrow"></div>
        </div>-->
      </div>
      <ng-content select="cp-sidebar-toggle"></ng-content>
      <ng-content select="cp-sidebar-close"></ng-content>
    </div>
    `,
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges {
  @HostBinding('style.width.px') @Input() public width;
  public minifiedWidth: number;
  public expandedWidth: number;
  @Input() public side: 'left' | 'right';
  @Input() public config: {
    expandedWidth?: number,
    minifiedWidth?: number,
    fullscreen?: boolean,
    animation?: string
  } = {};

  @HostBinding('class.is-expanded') @Input() public isExpanded: boolean;
  @ContentChild(SidebarToggleComponent) toggleBtn: SidebarToggleComponent;
  @ContentChild(SidebarCloseComponent) closeBtn: SidebarCloseComponent;
  @Output() expand: EventEmitter<boolean> = new EventEmitter();

  public toggleBtnSubscription$;
  public closeBtnSubscription$;

  constructor(
    public elem: ElementRef,
    public renderer: Renderer2
  ) {
    /* Set default values */
    this.side = this.side ? this.side : 'left';
  }

  ngOnInit() {
    this.setClassNames();
    this.minifiedWidth = this.config && (this.config['minifiedWidth'] || this.config['minifiedWidth'] === 0)
      ? this.config['minifiedWidth']
      : 64;

    this.expandedWidth = this.config && (this.config['expandedWidth'] || this.config['expandedWidth'] === 0)
      ? this.config['expandedWidth']
      : 240;

    this.width = this.isExpanded ? this.expandedWidth : this.minifiedWidth;
  }

  ngAfterContentInit() {
    if (this.toggleBtn) {
      this.toggleBtnSubscription$ = this.toggleBtn.toggle.subscribe(isToggled => {
        this.isExpanded = isToggled;
        this.width = this.getWidth(this.isExpanded);
        this.expand.emit(isToggled);
      });
    }

    if (this.closeBtn) {
      this.closeBtnSubscription$ = this.closeBtn.close.subscribe(isClosed => {
        this.isExpanded = isClosed;
        this.width = this.getWidth(this.isExpanded);
        this.expand.emit(isClosed);
      })
    }
  }

  ngOnDestroy() {
    if (this.toggleBtnSubscription$) {
      this.toggleBtnSubscription$.unsubscribe();
    }
    if (this.closeBtnSubscription$) {
      this.closeBtnSubscription$.unsubscribe();
    }
  }

  getWidth(isExpanded) {
    const {expandedWidth, minifiedWidth} = this;
    return isExpanded ? expandedWidth : minifiedWidth;
  }

  ngOnChanges(changes: SimpleChanges) {
    const changeExpand = changes['isExpanded'];
    if (changeExpand && !changeExpand.firstChange) {
      this.width = this.getWidth(changeExpand.currentValue);
    }
  }

  setSideClass() {
    if (this.side === 'left') {
      this.renderer.addClass(this.elem.nativeElement, 'is-left');
    } else {
      this.renderer.addClass(this.elem.nativeElement, 'is-right');
    }
  }

  setClassNames() {
    this.setSideClass();
  }

  // handleToggle(e: any) {
  //   this.isExpanded = !this.isExpanded;
  // }
  //
  // handleClose(e: any) {
  //   this.isExpanded = false;
  // }
}

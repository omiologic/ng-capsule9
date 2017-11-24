import {
  Directive, ElementRef, Input, Output, EventEmitter, OnInit, AfterViewInit, HostListener,
  Component, OnDestroy
} from '@angular/core';
import {ResizeService} from '../utility/resize.service';

@Component({
  selector: 'cp-sticky',
  template: `<ng-content></ng-content>`,
  providers: [ResizeService]
})
export class StickyComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() zIndex: number = 10;
  @Input() width: string = 'auto';
  @Input() offsetTop: number = 0;
  @Input() offsetBottom: number = 0;
  @Input() start: number = 0;
  @Input() stickClass: string = 'sticky';
  @Input() endStickClass: string = 'sticky-end';
  @Input() mediaQuery: string = '';
  @Input() parentMode: boolean = true;
  @Input() orientation: string = 'none';

  @Output() activated = new EventEmitter();
  @Output() deactivated = new EventEmitter();
  @Output() reset = new EventEmitter();

  private isStuck: boolean = false;

  private elem: any;
  private container: any;
  private originalCss: any;

  private windowHeight: number;
  private containerHeight: number;
  private elemHeight: number;
  private containerStart: number;
  private scrollFinish: number;

  constructor(
    private element: ElementRef,
    private resize: ResizeService
  ) {
    this.scroll = this.scroll.bind(this);
  }

  ngOnInit(): void {
    this.elem = this.element.nativeElement;
    window.addEventListener('scroll', this.scroll, true);
    // third parameter

    this.resize.addResizeEventListener(this.elem.parentNode, this.scroll);
  }

  ngAfterViewInit(): void {
    // define scroll container as parent element
    this.container = this.elem.parentNode;
    console.log(this.container);
    this.defineOriginalDimensions();
    this.sticker();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
    this.resize.removeResizeEventListener(this.elem.parentNode);
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  @HostListener('window:orientationchange', ['$event'])
  onChange(): void {
    console.log('on change');
    this.sticker();
  }

  scroll(e: any): void {
    // handle your scroll here
    // notice the 'odd' function assignment to a class field
    // this is used to be able to remove the event listener
    console.log('on scroll', e);
    this.sticker();
  }


  defineOriginalDimensions(): void {
    this.originalCss = {
      zIndex: this.getCssValue(this.elem, 'zIndex'),
      position: this.getCssValue(this.elem, 'position'),
      top: this.getCssValue(this.elem, 'top'),
      right: this.getCssValue(this.elem, 'right'),
      left: this.getCssValue(this.elem, 'left'),
      bottom: this.getCssValue(this.elem, 'bottom'),
      width: this.getCssValue(this.elem, 'width'),
    };

    if (this.width === 'auto') {
      this.width = this.originalCss.width;
    }
  }

  defineDimensions(): void {
    const containerTop: number = this.getBoundingClientRectValue(this.container, 'top');
    this.windowHeight = window.innerHeight;
    this.elemHeight = this.getCssNumber(this.elem, 'height');
    this.containerHeight = this.getCssNumber(this.container, 'height');
    this.containerStart = containerTop + this.scrollbarYPos() - this.offsetTop + this.start;
    if (this.parentMode) {
      this.scrollFinish = this.containerStart - this.start - this.offsetBottom + (this.containerHeight - this.elemHeight);
    } else {
      this.scrollFinish = document.body.offsetHeight;
    }
  }

  resetElement(): void {
    this.elem.classList.remove(this.stickClass);
    Object.assign(this.elem.style, this.originalCss);

    this.reset.next(this.elem);
  }

  stuckElement(): void {
    this.isStuck = true;

    this.elem.classList.remove(this.endStickClass);
    this.elem.classList.add(this.stickClass);

    Object.assign(this.elem.style, {
      zIndex: this.zIndex,
      position: 'fixed',
      top: this.offsetTop + 'px',
      right: 'auto',
      bottom: 'auto',
      left: this.getBoundingClientRectValue(this.elem, 'left') + 'px',
      width: this.width
    });

    this.activated.next(this.elem);
  }

  unstuckElement(): void {
    this.isStuck = false;

    this.elem.classList.add(this.endStickClass);

    this.container.style.position = 'relative';

    Object.assign(this.elem.style, {
      position: 'absolute',
      top: 'auto',
      left: 'auto',
      right: this.getCssValue(this.elem, 'float') === 'right' || this.orientation === 'right' ? 0 : 'auto',
      bottom: this.offsetBottom + 'px',
      width: this.width
    });

    this.deactivated.next(this.elem);
  }

  matchMediaQuery(): any {
    return !this.mediaQuery ? true : (
      window.matchMedia('(' + this.mediaQuery + ')').matches ||
      window.matchMedia(this.mediaQuery).matches
    );
  }

  sticker(): void {

    console.log('Sticker Directive', this);
    // check media query
    if (this.isStuck && !this.matchMediaQuery()) {
      this.resetElement();
      return;
    }

    // detecting when a container's height changes
    const currentContainerHeight: number = this.getCssNumber(this.container, 'height');
    if (currentContainerHeight !== this.containerHeight) {
      this.defineDimensions();
    }

    // check if the sticky element is above the container
    if (this.elemHeight >= currentContainerHeight) {
      return;
    }

    const position: number = this.scrollbarYPos();

    console.log(this.elemHeight, currentContainerHeight, position);
    if (this.isStuck && (position < this.containerStart || position > this.scrollFinish) || position > this.scrollFinish) {
      // unstick
      console.log('UNSTICK');
      this.resetElement();
      if (position > this.scrollFinish) {
        this.unstuckElement();
      }
      this.isStuck = false;
    } else if (this.isStuck === false && position > this.containerStart && position < this.scrollFinish) {
      // stick
      console.log('STICK');
      this.stuckElement();
    }
  }

  private scrollbarYPos(): number {
    console.log(window.pageYOffset, this.element.nativeElement)
    console.log(this.element.nativeElement.parentElement)
    console.log(this.element.nativeElement.parentElement.scrollHeight)
    console.log(document.documentElement.scrollTop);
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  private getBoundingClientRectValue(element: any, property: string): number {
    let result = 0;
    if (element && element.getBoundingClientRect) {
      const rect = element.getBoundingClientRect();
      result = (typeof rect[property] !== 'undefined') ? rect[property] : 0;
    }
    return result;
  }

  private getCssValue(element: any, property: string): any {
    let result: any = '';
    if (typeof window.getComputedStyle !== 'undefined') {
      result = window.getComputedStyle(element, '').getPropertyValue(property);
    } else if (typeof element.currentStyle !== 'undefined')  {
      result = element.currentStyle[property];
    }

    console.log('getCssValue', result);
    return result;
  }

  private getCssNumber(element: any, property: string): number {
    if (typeof element === 'undefined') {
      return 0;
    }
    return parseInt(this.getCssValue(element, property), 10) || 0;
  }
}

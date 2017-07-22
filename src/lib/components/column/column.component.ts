import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';

/*
 * Column Component
 * ==================
 * Wrapper Element for ColumnComponents
 * http://bulma.io/documentation/grid/columns/
 */

@Component({
  selector: 'cp-column',
  template: `<ng-content></ng-content>`
})
export class ColumnComponent implements AfterViewInit {
  @HostBinding('class.column') _isColumn = true;

  @Input() mobile: number;
  @Input() tablet: number;
  @Input() desktop: number;
  @Input() offset: number;

  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer2
  ) {

  }

  ngAfterViewInit() {
    this.setHostClass();
  }

  setHostClass() {
    if (this.mobile) {
      this._renderer.addClass(this._elRef.nativeElement, `is-${this.mobile}-mobile`)
    }

    if (this.tablet) {
      this._renderer.addClass(this._elRef.nativeElement, `is-${this.tablet}-tablet`)
    }

    if (this.desktop) {
      this._renderer.addClass(this._elRef.nativeElement, `is-${this.desktop}-desktop`)
    }

    if (this.offset) {
      this._renderer.addClass(this._elRef.nativeElement, `is-offset-${this.offset}`)
    }
  }
}

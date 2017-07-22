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

  @Input('mobile') private _mobileSize: number;
  @Input('tablet') private _tabletSize: number;
  @Input('desktop') private _desktopSize: number;
  @Input('offset') private _offsetSize: number;

  constructor(
    private _elRef: ElementRef,
    private _renderer: Renderer2
  ) {
    
  }

  ngAfterViewInit() {
    this.setHostClass();
  }

  setHostClass() {
    if (this._mobileSize) {
      this._renderer.addClass(this._elRef.nativeElement, `is-${this._mobileSize}-mobile`)
    }

    if (this._tabletSize) {
      this._renderer.addClass(this._elRef.nativeElement, `is-${this._tabletSize}-tablet`)
    }

    if (this._desktopSize) {
      this._renderer.addClass(this._elRef.nativeElement, `is-${this._desktopSize}-desktop`)
    }

    if (this._offsetSize) {
      this._renderer.addClass(this._elRef.nativeElement, `is-offset-${this._offsetSize}`)
    }
  }
}

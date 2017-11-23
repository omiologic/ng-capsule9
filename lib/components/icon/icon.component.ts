import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  ElementRef,
  Renderer2, OnChanges
} from '@angular/core';

@Component({
  selector: 'cp-icon',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit, OnChanges {

  private _color: string;

  @Input() font: string;
  @Input() icon: string;
  @Input() size: string;
  @Input() fixed: boolean;

  /** Color of the icon. */
  @Input()
  get color(): string { return this._color; }
  set color(value: string) { this.updateColor(value); }

  private _defaultFontClass = 'fa';
  private _prevFontClass: string;
  private _prevIconClass: string;
  private _prevSizeClass: string;
  private _prevFixedWidthStatus: boolean;

  get prevFontClass() { return this._prevFontClass; }
  get prevIconClass() { return this._prevIconClass; }
  get prevSizeClass() { return this._prevSizeClass; }
  get prevFixedWidthStatus() { return this._prevFixedWidthStatus; }

  constructor(
    private ref: ElementRef,
    private renderer: Renderer2
  ) {}

  updateColor(newColor: string) {
    this.setElementColor(this._color, false);
    this.setElementColor(newColor, true);
    this._color = newColor;
  }

  setElementColor(color: string, isAdd: boolean) {
    if (color != null && color !== '') {
      if (isAdd) {
        this.renderer.addClass(this.ref.nativeElement, `bg-${color}`);
      } else {
        this.renderer.removeClass(this.ref.nativeElement, `bg-${color}`);
      }
    }
  }

  ngOnInit() {
    this.updateFontIconClasses();
  }

  ngOnChanges() {
    this.updateFontIconClasses();
  }

  updateFontIconClasses() {

    const elem = this.ref.nativeElement;
    const fontClass = this.font ? this.font : this._defaultFontClass;

    if (fontClass !== this._prevFontClass) {
      if (this._prevFontClass) {
        this.renderer.removeClass(elem, this._prevFontClass);
      }
      if (fontClass) {
        this.renderer.addClass(elem, fontClass);
        this._prevFontClass = fontClass;
      }
    }

    const iconClass = this.font ? `${fontClass}-${this.icon}` : this.icon;

    if (iconClass !== this._prevIconClass) {
      if (this._prevIconClass) {
        this.renderer.removeClass(elem, this._prevIconClass);
      }
      if (this.icon) {
        this.renderer.addClass(elem, `${fontClass}-${this.icon}`);
      }
      this._prevIconClass = `${fontClass}-${this.icon}`;
    }

    const sizeClass = `fa-${this.size}`;
    if (sizeClass !== this._prevSizeClass) {
      if (this._prevSizeClass) {
        this.renderer.removeClass(elem, this._prevSizeClass);
      }
      if (this.size) {
        this.renderer.addClass(elem, `${fontClass}-${this.size}`)
      }
      this._prevSizeClass = `${fontClass}-${this.size}`;
    }

    if (this.fixed !== this._prevFixedWidthStatus) {
      if (this._prevFixedWidthStatus) {
        this.renderer.removeClass(elem, 'fa-fw');
      }
      if (this.fixed) {
        this.renderer.addClass(elem, 'fa-fw');
      }
      this._prevFixedWidthStatus = this.fixed;
    }
  }
}

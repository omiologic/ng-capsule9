import {Component, HostBinding, Input} from '@angular/core';
import {ColumnsConfig} from './column.config';

/*
 * Columns Component
 * ==================
 * Wrapper Element for ColumnComponents
 * http://bulma.io/documentation/grid/columns/
 */

@Component({
  selector: 'cp-columns',
  template: `<ng-content select="cp-column"></ng-content>`
})
export class ColumnsComponent {

  @HostBinding('class.columns') private _isColumns: boolean | undefined;

  @HostBinding('class.is-centered') private _isCentered: boolean | undefined;
  @HostBinding('class.is-vcentered') private _isVCentered: boolean | undefined;
  @HostBinding('class.is-mobile') private _isMobile: boolean | undefined;
  @HostBinding('class.is-desktop') private _isDesktop: boolean | undefined;
  @HostBinding('class.is-multiline') private _isMultiline: boolean | undefined;
  @HostBinding('class.is-layout') private _isGrid: boolean | undefined;
  @HostBinding('class.is-gapless') private _isGapless: boolean | undefined;

  @Input()
  set options(config: ColumnsConfig) {
    for (const option in config) {
      if (option) {
        switch (option) {
          case 'centered':
            this._isCentered = config[option] ? config[option] : false;
            break;
          case 'vcentered':
            this._isVCentered = config[option] ? config[option] : false;
            break;
          case 'mobile':
            this._isMobile = config[option] ? config[option] : false;
            break;
          case 'desktop':
            this._isDesktop = config[option] ? config[option] : false;
            break;
          case 'multiline':
            this._isMultiline = config[option] ? config[option] : false;
            break;
          case 'grid':
            this._isGrid = config[option] ? config[option] : false;
            break;
          case 'gapless':
            this._isGapless = config[option] ? config[option] : false;
            break;
        }
      }
    }
  }

  constructor() {
    this._isColumns = true;
  }
}

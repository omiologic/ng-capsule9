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

  @HostBinding('class.columns') private _isColumns: boolean;

  @HostBinding('class.is-centered') private _isCentered: boolean;
  @HostBinding('class.is-vcentered') private _isVCentered: boolean;
  @HostBinding('class.is-mobile') private _isMobile: boolean;
  @HostBinding('class.is-desktop') private _isDesktop: boolean;
  @HostBinding('class.is-multiline') private _isMultiline: boolean;
  @HostBinding('class.is-grid') private _isGrid: boolean;
  @HostBinding('class.is-gapless') private _isGapless: boolean;

  @Input()
  set options(config: ColumnsConfig) {
    for (const option in config) {
      if (option) {
        switch (option) {
          case 'centered':
            this._isCentered = config[option];
            break;
          case 'vcentered':
            this._isVCentered = config[option];
            break;
          case 'mobile':
            this._isMobile = config[option];
            break;
          case 'desktop':
            this._isDesktop = config[option];
            break;
          case 'multiline':
            this._isMultiline = config[option];
            break;
          case 'grid':
            this._isGrid = config[option];
            break;
          case 'gapless':
            this._isGapless = config[option];
            break;
        }
      }
    }
  }

  constructor() {
    this._isColumns = true;
  }
}

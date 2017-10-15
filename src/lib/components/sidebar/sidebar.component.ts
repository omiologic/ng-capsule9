import {Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SidebarConfig, SidebarItem} from './sidebar.model';

@Component({
  selector: 'cp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit, OnDestroy {

  @HostBinding('class.sidebar') private _isSidebar = true;
  @HostBinding('class.minified') private _isMinified = false;
  @HostBinding('class.opened')
  @Input() isOpen: boolean;

  @Input() data: Array<SidebarItem>;
  @Input() brand: any;
  @Input() options: SidebarConfig;

  ngOnInit() {
    console.log('SidebarComponent.options', this.options);
    this.setOption();
    // this.isOpen = this.isOpen ? this.isOpen : true;
  }

  setOption() {
    if (this.options) {
      this._isMinified = this.options.minified ? this.options.minified : false;
    }
  }

  ngOnDestroy() {
    this.isOpen = false;
  }
}

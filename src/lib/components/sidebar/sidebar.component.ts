import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SidebarConfig, SidebarItem} from './sidebar.model';

@Component({
  selector: 'cp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

  @HostBinding('class.sidebar') private _isSidebar = true;
  @HostBinding('class.minified') private _isMinified = false;

  @Input() data: Array<SidebarItem>;
  @Input() brand: any;
  @Input() options: SidebarConfig;

  ngOnInit() {
    console.log('SidebarComponent.options', this.options);
    this.setOption();
  }

  setOption() {
    if (this.options) {
      this._isMinified = this.options.minified ? this.options.minified : false;
    }
  }
}

import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {SidebarItem} from './sidebar.model';

@Component({
  selector: 'cp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent {
  @HostBinding('class.sidebar') private _isSidebar = true;

  @Input() data: Array<SidebarItem>;
  @Input() brand: any;

}

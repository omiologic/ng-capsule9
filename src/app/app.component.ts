import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DOCUMENTATION_SIDEBAR} from './app.data';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {SidebarComponent} from '../lib/components/sidebar/sidebar.component';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public docSidebar = DOCUMENTATION_SIDEBAR;
  public docSidebarOpen: boolean;

  brand = {
    name: 'NG Capsule 9',
    description: 'angular2+ UI component library'
  };

  constructor(public router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.docSidebarOpen = event.url.includes('documentation');
      }
    })
  }
}

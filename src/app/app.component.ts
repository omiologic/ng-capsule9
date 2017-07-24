import { Component, ViewEncapsulation } from '@angular/core';
import {appSidebar} from './app.data';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public sidebar = appSidebar;

  brand = {
    name: 'NG Capsule 9',
    description: 'angular2+ UI component library'
  };
}

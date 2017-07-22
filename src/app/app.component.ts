import { Component } from '@angular/core';
import {appSidebar} from './app.data';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app works!';
  public sidebar = appSidebar;
}

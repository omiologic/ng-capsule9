import { Component } from '@angular/core';

@Component({
  selector: 'demo-home',
  template: `<demo-md-viewer path="./assets/wiki/README.md"></demo-md-viewer>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}

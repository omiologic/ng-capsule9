import {Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'demo-example-viewer',
  template: `
    <div class="example-viewer-header">
      <span>{{name}}</span>
      <cp-icon class="pull-right" icon="code"
               ngbTooltip="view code"
               (click)="toggleCode($event)"></cp-icon>
    </div>
    <div class="example-viewer-content">
      <div class="example-viewer-code" [ngClass]="{expand: isToggled}">
        <ngb-tabset>
          <ngb-tab *ngFor="let src of srcUrls" [title]="fileName(src)">
            <ng-template ngbTabContent>
              <markdown [path]="src"></markdown>
            </ng-template>
          </ngb-tab>
        </ngb-tabset>
      </div>
      <div class="example-viewer-display">
        <div>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  // styleUrls: ['./example-viewer.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class ExampleViewerComponent {
  @Input() name: string;
  @Input() srcUrls: Array<string>;

  isToggled: boolean;

  constructor() {
    this.isToggled = false;
  }
  toggleCode(e) {
    this.isToggled = !this.isToggled
  }

  fileName(filepath: string) {
    return filepath.split('/').pop();
  }
}

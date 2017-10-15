import {Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'demo-example-viewer',
  template: `
    <div class="example-viewer-header">
      <span *ngIf="label">{{label}}</span>
      <cp-icon class="pull-right" icon="code"
               (click)="toggleCode($event)"></cp-icon>
    </div>
    <div class="example-viewer-content">
      <div class="example-viewer-display">
        <div>
          <ng-content></ng-content>
        </div>
      </div>
      <div class="example-viewer-code" [ngClass]="{expand: isToggled}">
        <cp-tabset>
          <cp-tab *ngFor="let src of srcUrls" [title]="fileName(src)">
            <ng-template tab-content>
              <demo-md-viewer [path]="src"></demo-md-viewer>
            </ng-template>
          </cp-tab>
        </cp-tabset>
      </div>
    </div>
  `,
  // styleUrls: ['./example-viewer.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class ExampleViewerComponent {
  @Input() label: string;
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

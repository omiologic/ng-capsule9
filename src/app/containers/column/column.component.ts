import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'demo-column',
  template: `<demo-doc-viewer name="Menu" route="column"></demo-doc-viewer>`,
  encapsulation: ViewEncapsulation.None
})

export class DemoColumnComponent {}

@Component({
  selector: 'demo-column-overview',
  template: `<markdown-viewer path="./assets/docs/modules/column/column.overview.md"></markdown-viewer>`,
  encapsulation: ViewEncapsulation.None
})

export class DemoColumnOverviewComponent {}

@Component({
  selector: 'demo-column-api',
  template: `<markdown-viewer path="./assets/docs/modules/column/column.api.md"></markdown-viewer>`,
  encapsulation: ViewEncapsulation.None
})
export class DemoColumnAPIComponent {}


@Component({
  selector: 'demo-column-example',
  templateUrl: './column.example.html',
  encapsulation: ViewEncapsulation.None
})
export class DemoColumnExampleComponent {}


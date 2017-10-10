import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'demo-column',
  template: `<demo-doc-viewer label="Column" description="" route="column"
                              [routes]="routes"></demo-doc-viewer>`,
  encapsulation: ViewEncapsulation.None
})

export class DemoColumnComponent {
  public routes = [
    {
      'path': 'basics',
      'title': 'Basics'
    },
    {
      'path': 'sizes',
      'title': 'Sized'
    },
    {
      'path': 'responsiveness',
      'title': 'Responsive'
    }
  ]
}

@Component({
  selector: 'demo-column-basic',
  template: `
    <demo-md-viewer path="./assets/wiki/components/column/column.overview.md"></demo-md-viewer>
    <demo-example-viewer [srcUrls]="['./assets/wiki/components/column/examples/column.basic.html']">
      <cp-columns>
        <cp-column>
          First column
        </cp-column>
        <cp-column>
          Second column
        </cp-column>
        <cp-column>
          Third column
        </cp-column>
        <cp-column>
          Fourth column
        </cp-column>
      </cp-columns>
    </demo-example-viewer>
  `,
  encapsulation: ViewEncapsulation.None
})

export class DemoColumnOverviewComponent {}

@Component({
  selector: 'demo-column-api',
  template: `<demo-md-viewer path="./assets/wiki/components/column/column.api.md"></demo-md-viewer>`,
  encapsulation: ViewEncapsulation.None
})
export class DemoColumnAPIComponent {}


@Component({
  selector: 'demo-column-example',
  templateUrl: './column.example.html',
  encapsulation: ViewEncapsulation.None
})
export class DemoColumnExampleComponent {}


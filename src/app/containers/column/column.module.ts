import {NgModule} from '@angular/core';
import {DemoColumnRoutes} from './column.routes';
import {
  DemoColumnAPIComponent,
  DemoColumnComponent,
  DemoColumnExampleComponent,
  DemoColumnOverviewComponent
} from './column.component';

const COMPONENTS = [
  DemoColumnComponent,
  DemoColumnOverviewComponent,
  DemoColumnExampleComponent,
  DemoColumnAPIComponent
];
@NgModule({
  declarations: COMPONENTS,
  imports: [
    DemoColumnRoutes
  ],
  exports: COMPONENTS
})
export class DemoColumnModule {}

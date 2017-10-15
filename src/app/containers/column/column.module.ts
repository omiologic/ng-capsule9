import {NgModule} from '@angular/core';
import {DemoColumnRoutes} from './column.routes';
import {
  DemoColumnAPIComponent,
  DemoColumnComponent,
  DemoColumnExampleComponent,
  DemoColumnOverviewComponent
} from './column.component';
import {ViewerModule} from '../../components/viewer/viewer.module';
import {ColumnModule} from '../../../lib/components/column/column.module';
import {CommonModule} from '@angular/common';
import {MarkdownToHtmlModule} from 'ng2-markdown-to-html';

const COMPONENTS = [
  DemoColumnComponent,
  DemoColumnOverviewComponent,
  DemoColumnExampleComponent,
  DemoColumnAPIComponent
];
@NgModule({
  declarations: COMPONENTS,
  imports: [
    ViewerModule,
    ColumnModule,
    CommonModule
  ],
  exports: COMPONENTS
})
export class DemoColumnModule {}

import {NgModule} from '@angular/core';
import {MarkdownViewerComponent} from './markdown-viewer/markdown-viewer.component';
import {DocViewerComponent} from './doc-viewer/doc-viewer.component';
import {ExampleViewerComponent} from './example-viewer/example-viewer.component';
import {MarkdownModule} from 'angular2-markdown';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TabsetModule} from '../../../lib/components/tabset/tabset.module';
import {IconModule} from '../../../lib/components/icon/icon.module';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';

const VIEWER_COMPONENTS = [
  MarkdownViewerComponent,
  DocViewerComponent,
  ExampleViewerComponent
];

@NgModule({
  declarations: VIEWER_COMPONENTS,
  imports: [
    MarkdownModule,
    CommonModule,
    RouterModule,
    TabsetModule,
    IconModule
  ],
  exports: VIEWER_COMPONENTS
})

export class ViewerModule {}

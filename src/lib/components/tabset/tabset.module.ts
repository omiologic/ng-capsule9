import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import {TabComponent, TabContentDirective, TabsetComponent, TabTitleDirective} from './tabset.component';

@NgModule({
  declarations: [
    TabComponent,
    TabsetComponent,
    TabTitleDirective,
    TabContentDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TabComponent,
    TabsetComponent,
    TabTitleDirective,
    TabContentDirective
  ]
})
export class TabsetModule { }

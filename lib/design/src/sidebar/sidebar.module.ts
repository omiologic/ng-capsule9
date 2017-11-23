import {NgModule} from '@angular/core';
import {SidebarCloseComponent, SidebarComponent, SidebarToggleComponent} from './sidebar.component';
import {CommonModule} from '@angular/common';

const SIDEBAR_COMPONENTS = [
  SidebarComponent,
  SidebarToggleComponent,
  SidebarCloseComponent
];

@NgModule({
  declarations: SIDEBAR_COMPONENTS,
  imports: [CommonModule],
  exports: SIDEBAR_COMPONENTS
})
export class SidebarModule {}

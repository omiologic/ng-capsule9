import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {MenuModule} from '../../menu/menu.module';
import {RouterModule} from '@angular/router';
import {IconModule} from '../../icon/icon.module';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    IconModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }

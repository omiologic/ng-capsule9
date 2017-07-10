import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {MenuModule} from '../menu/menu.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }

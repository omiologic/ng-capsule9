import { NgModule } from '@angular/core';
import {MenuComponent, MenuItemComponent, MenuLabelComponent, MenuListComponent} from './menu.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MenuComponent,
    MenuLabelComponent,
    MenuItemComponent,
    MenuListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    MenuLabelComponent,
    MenuItemComponent,
    MenuListComponent
  ]
})
export class MenuModule { }

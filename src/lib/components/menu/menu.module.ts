import { NgModule } from '@angular/core';
import {MenuComponent, MenuItemComponent, MenuLabelComponent} from './menu.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MenuComponent,
    MenuLabelComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    MenuLabelComponent,
    MenuItemComponent
  ]
})
export class MenuModule { }

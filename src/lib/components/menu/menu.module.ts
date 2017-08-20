import { NgModule } from '@angular/core';
import {MenuComponent, MenuItemComponent, MenuLabelComponent, MenuListComponent} from './menu.component';
import { CommonModule } from '@angular/common';
import {ExpandableDirective, HasSubDirective, SubListDirective} from './expand/expand.directive';
import {ExpandableService} from './expand/expand.service';

const MENU_MODULE_EXPORTS = [
  MenuComponent,
  MenuLabelComponent,
  MenuItemComponent,
  MenuListComponent,
  ExpandableDirective,
  HasSubDirective,
  SubListDirective
];

@NgModule({
  declarations: MENU_MODULE_EXPORTS,
  imports: [
    CommonModule
  ],
  providers: [ExpandableService],
  exports: MENU_MODULE_EXPORTS
})
export class MenuModule { }

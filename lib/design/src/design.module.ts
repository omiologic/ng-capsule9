import { NgModule } from '@angular/core';
import { DropdownModule } from './dropdown/dropdown.module';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { StickyModule } from './sticky/sticky.module';
import { TreeMenuModule } from './tree-menu/tree-menu.module';
import { ColumnModule } from './column/column.module';
import { IconModule } from './icon/icon.module';
import { ModalModule } from './modal/modal.module';
import { TabsetModule } from './tabset/tabset.module';
import { DesignUtilities } from './utility/utility.module';

const DESIGN_MODULES = [
  DropdownModule,
  NavbarModule,
  SidebarModule,
  StickyModule,
  TreeMenuModule,
  ColumnModule,
  IconModule,
  ModalModule,
  TabsetModule,
  DesignUtilities
];

@NgModule({
  imports: DESIGN_MODULES,
  exports: DESIGN_MODULES
})
export class DesignModule { }

import { ModuleWithProviders, NgModule } from '@angular/core';
import {MenuModule} from './components/menu/menu.module';
import {ColumnModule} from './components/column/column.module';
import {SidebarModule} from './components/sidebar/sidebar.module';
import {TabsetModule} from './components/tabset/tabset.module';
import {ModalModule} from './components/modal/modal.module';

const UI_MODULES = [
  MenuModule,
  ColumnModule,
  SidebarModule,
  TabsetModule,
  ModalModule
];

@NgModule({
  imports: [...UI_MODULES],
  exports: UI_MODULES
})

export class NgCapsule9Module {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgCapsule9Module,
      providers: []
    }
  }
}

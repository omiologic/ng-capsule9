import { ModuleWithProviders, NgModule } from '@angular/core';
import {MenuModule} from './components/menu/menu.module';

const UI_MODULES = [
  MenuModule
];

@NgModule({
  imports: [...UI_MODULES],
  exports: UI_MODULES
})

export class Ng4UIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng4UIModule,
      providers: []
    }
  }
}

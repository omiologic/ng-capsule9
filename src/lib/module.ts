import { ModuleWithProviders, NgModule } from '@angular/core';
import {MenuModule} from './components/menu/menu.module';

const UI_MODULES = [
  MenuModule
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

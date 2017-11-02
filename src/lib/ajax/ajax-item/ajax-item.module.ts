import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjaxItemActions } from './ajax-item.actions';
import { AjaxItemEpics } from './ajax-item.epics';
import { AjaxItemService, AJAX_ITEM_API_URLS } from './ajax-item.service';
import { HttpModule } from '@angular/http';
import {AjaxItemOptions} from './ajax-item.types';

@NgModule({
  imports: [CommonModule, HttpModule],
  providers: [AjaxItemActions, AjaxItemEpics, AjaxItemService],
})
export class AjaxItemModule {
  static forRoot(options: AjaxItemOptions ): ModuleWithProviders {
    return {
      ngModule: AjaxItemModule,
      providers: [
        {provide: AJAX_ITEM_API_URLS, useValue: options.urls}
      ],
    };
  }
}

import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {AjaxItemOptions} from './ajax-item/ajax-item.types';
import {AjaxListOptions} from './ajax-list/ajax-list.types';

import {AJAX_LIST_API_URLS, AjaxListService} from './ajax-list/ajax-list.service';
import {AJAX_ITEM_API_URLS, AjaxItemService} from './ajax-item/ajax-item.service';

import {AjaxListActions} from './ajax-list/ajax-list.actions';
import {AjaxListEpics} from './ajax-list/ajax-list.epics';
import {AjaxItemActions} from './ajax-item/ajax-item.actions';
import {AjaxItemEpics} from './ajax-item/ajax-item.epics';

const AJAX_MODULE_PROVIDERS = [
  AjaxListActions, AjaxListEpics, AjaxListService,
  AjaxItemActions, AjaxItemEpics, AjaxItemService
];
@NgModule({
  imports: [CommonModule, HttpModule],
  providers: AJAX_MODULE_PROVIDERS,
})
export class AjaxModule {
  static forRoot(options: {
    list: AjaxListOptions,
    item: AjaxItemOptions
  }): ModuleWithProviders {
    return {
      ngModule: AjaxModule,
      providers: [
        { provide: AJAX_LIST_API_URLS, useValue: options.list.urls },
        { provide: AJAX_ITEM_API_URLS, useValue: options.item.urls },
        ...AJAX_MODULE_PROVIDERS
      ],
    };
  }
}

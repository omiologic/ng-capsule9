import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjaxListActions } from './ajax-list.actions';
import { AjaxListEpics } from './ajax-list.epics';
import { AjaxListService, AJAX_LIST_API_URLS } from './ajax-list.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [CommonModule, HttpModule],
  providers: [AjaxListActions, AjaxListEpics, AjaxListService],
})
export class AjaxListModule {
  static forRoot(ajaxListUrls?: any): ModuleWithProviders {
    return {
      ngModule: AjaxListModule,
      providers: [
        {provide: AJAX_LIST_API_URLS, useValue: ajaxListUrls}
      ],
    };
  }
}

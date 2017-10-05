import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';

import { MarkdownViewerComponent } from './components/viewer/markdown-viewer/markdown-viewer.component';
import { MarkdownModule } from 'angular2-markdown';
import { NgCapsule9Module } from '../lib/module';
import { DemoMenuComponent } from './containers/menu/menu.component';
import { DemoColumnComponent } from './containers/column/column.component';
import {DemoTabsComponent} from './containers/tabs/tabs.component';
import { DemoModalComponent } from './containers/modal/modal.component'
import {DocViewerComponent} from './components/viewer/doc-viewer/doc-viewer.component';
import {DemoColumnModule} from './containers/column/column.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DemoMenuComponent,
    DemoTabsComponent,
    DemoModalComponent,
    MarkdownViewerComponent,
    DocViewerComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgCapsule9Module.forRoot(),
    MarkdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    DemoColumnModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

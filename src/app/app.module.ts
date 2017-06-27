import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { ReferenceComponent } from './containers/references/references.component';
import { MenuAPIComponent } from './containers/menu/menu.component';
import {MarkdownViewerComponent} from './components/markdown-viewer/markdown-viewer.component';
import {Ng4UIModule} from '../lib/module';
import {MarkdownModule} from 'angular2-markdown';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    MenuAPIComponent,
    ReferenceComponent,
    MarkdownViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng4UIModule.forRoot(),
    MarkdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HomeComponent } from './containers/home/home.component';
import { DemoMenuComponent } from './containers/menu/menu.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import {DemoColumnComponent} from './containers/column/column.component';
import {DemoTabsComponent} from './containers/tabs/tabs.component';
import {DemoModalComponent} from './containers/modal/modal.component';


export const appRoutes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'module/menu', component: DemoMenuComponent },
  { path: 'module/column', component: DemoColumnComponent },
  { path: 'module/tabs', component: DemoTabsComponent },
  { path: 'module/modal', component: DemoModalComponent },
  { path: '**', component: NotFoundComponent }
];

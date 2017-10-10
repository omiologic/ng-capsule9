import { HomeComponent } from './containers/home/home.component';
import { DemoMenuComponent } from './containers/menu/menu.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import {DemoTabsComponent} from './containers/tabs/tabs.component';
import {DemoModalComponent} from './containers/modal/modal.component';
import {DemoStartComponent} from './containers/start/start.component';
import {DemoColumnComponent, DemoColumnOverviewComponent} from './containers/column/column.component';

export const appRoutes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'documentation',
    children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { path: 'start', component: DemoStartComponent },
      {
        path: 'column', component: DemoColumnComponent,
        children: [
          { path: '', redirectTo: 'basics', pathMatch: 'full' },
          { path: 'basics', component: DemoColumnOverviewComponent },
          { path: 'sizes', component: DemoColumnOverviewComponent },
          { path: 'responsiveness', component: DemoColumnOverviewComponent },
          { path: 'nesting', component: DemoColumnOverviewComponent },
          { path: 'gap', component: DemoColumnOverviewComponent },
          { path: 'options', component: DemoColumnOverviewComponent },
        ]
      },
      { path: 'menu', component: DemoMenuComponent },
      { path: 'tabs', component: DemoTabsComponent },
      { path: 'modal', component: DemoModalComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

import {RouterModule} from '@angular/router';
import {
  DemoColumnComponent,
  DemoColumnOverviewComponent,
  DemoColumnExampleComponent,
  DemoColumnAPIComponent
} from './column.component';

export const DemoColumnRoutes = RouterModule.forChild([
  {
    path: 'modules/menu',
    component: DemoColumnComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: DemoColumnOverviewComponent },
      { path: 'api', component: DemoColumnAPIComponent },
      { path: 'example', component: DemoColumnExampleComponent },
    ]
  },
])

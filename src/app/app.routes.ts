import { HomeComponent } from './containers/home/home.component';
import { ReferenceComponent } from './containers/references/references.component';
import { MenuAPIComponent } from './containers/menu/menu.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';


export const appRoutes = [
  {path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'references', component: ReferenceComponent},
  {path: 'reference/menu', component: MenuAPIComponent},
  {path: '**', component: NotFoundComponent }
];

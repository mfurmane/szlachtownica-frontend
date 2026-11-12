import { Routes } from '@angular/router';
import { DetailsViewComponent } from './components/details-view/details-view.component';
import { elementExistsGuard } from './guards/element-exists.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'details', children: [
    { path: '', component: DetailsViewComponent },
    { path: 'region/:regionId', component: DetailsViewComponent, canActivate: [elementExistsGuard] },
    { path: 'place/:placeId', component: DetailsViewComponent, canActivate: [elementExistsGuard] },
  ] },
  {
    path: 'search', loadComponent: () => import('./components/search/search.component')
      .then((m: typeof import('./components/search/search.component')) => m.SearchComponent)
  },
  {
    path: 'region-filters', loadComponent: () => import('./components/forms/region-filter/region-filter.component')
      .then((m: typeof import('./components/forms/region-filter/region-filter.component')) => m.RegionFilterComponent)
  },
  {
    path: 'settings', loadComponent: () => import('./components/forms/coloring-settings/coloring-settings.component')
      .then((m: typeof import('./components/forms/coloring-settings/coloring-settings.component')) => m.ColoringSettingsComponent)
  },
  { path: '**', redirectTo: 'details' }
];

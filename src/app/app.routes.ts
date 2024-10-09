import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./feature/feature.module').then((f) => f.FeatureModule),
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@devsu/ui/layouts').then((l) => l.BaseLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },

      {
        path: 'products',
        loadChildren: () =>
          import('@devsu/ui/pages').then((m) => m.productsRoutes),
      },
    ],
  },

  {
    path: '404',
    loadComponent: () =>
      import('@devsu/ui/errors').then((m) => m.NotFoundComponent),
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];

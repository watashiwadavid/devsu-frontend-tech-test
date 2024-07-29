import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/products-list.component').then(
        (c) => c.ProductsListComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./form/product-form.component').then(
        (c) => c.ProductFormComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./form/product-form.component').then(
        (c) => c.ProductFormComponent
      ),
  },
];

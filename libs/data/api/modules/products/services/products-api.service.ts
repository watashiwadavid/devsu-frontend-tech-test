import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiServiceBase } from '../../../common';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService extends ApiServiceBase<Product, string> {
  constructor() {
    super('/products');
  }
}

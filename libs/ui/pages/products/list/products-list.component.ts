import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product, ProductsApiService } from '@devsu/data/api';

@Component({
  selector: 'lib-products-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  private productsApi = inject(ProductsApiService);
  private router = inject(Router);

  public products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    const result = await this.productsApi.getAll();
    this.products.set(result.data);
  }
}

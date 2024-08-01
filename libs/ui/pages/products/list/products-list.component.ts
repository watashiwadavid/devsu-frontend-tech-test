import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Product, ProductsApiService } from '@devsu/data/api';

@Component({
  selector: 'lib-products-list',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  private productsApi = inject(ProductsApiService);

  protected products = signal<Product[]>([]);
  protected filter = model<string>('');
  protected take = model<number>(2);

  protected visibleProducts: Signal<Product[]> = computed(() => {
    const start = this.currentPage() * this.take();
    const end = start + this.take();
    return this.products()
      .filter((x) =>
        x.name.toLowerCase().includes(this.filter().trim().toLowerCase())
      )
      .slice(start, end);
  });

  protected currentPage = signal<number>(0);
  protected totalPages: Signal<number> = computed(() =>
    Math.ceil(this.products().length / this.take())
  );

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    const result = await this.productsApi.getAll();
    this.products.set(result.data);
  }

  prevPage(): void {
    this.currentPage.set(this.currentPage() - 1);
  }

  nextPage(): void {
    this.currentPage.set(this.currentPage() + 1);
  }
}

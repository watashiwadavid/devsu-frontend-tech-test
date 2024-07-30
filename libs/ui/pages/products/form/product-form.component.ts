import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsApiService } from '@devsu/data/api';
import {
  IFormGroup,
  RxFormBuilder,
  RxReactiveFormsModule,
} from '@rxweb/reactive-form-validators';
import { ProductForm } from './product-form.model';

@Component({
  selector: 'lib-product-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RxReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  private productsApi = inject(ProductsApiService);
  private formBuilder = inject(RxFormBuilder);

  protected form!: IFormGroup<ProductForm>;

  async ngOnInit(): Promise<void> {
    const form = this.formBuilder.formGroup(new ProductForm());
  }

  protected async onReset(): Promise<void> {}

  protected async onSubmit(): Promise<void> {}

  private async create(): Promise<void> {}
}

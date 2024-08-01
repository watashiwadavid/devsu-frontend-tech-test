import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from '@devsu/data/api';
import {
  IFormGroup,
  RxFormBuilder,
  RxReactiveFormsModule,
} from '@rxweb/reactive-form-validators';
import { debounceTime } from 'rxjs';
import { ProductForm } from './product-form.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-product-form',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private productsApi = inject(ProductsApiService);
  private formBuilder = inject(RxFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected form: IFormGroup<ProductForm> = this.formBuilder.formGroup(
    new ProductForm()
  ) as IFormGroup<ProductForm>;

  protected id: string | null = null;
  protected currentDate: Date = new Date();

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadForm();
    this.handleReleaseDateChange();
  }

  protected async handleIdChange(): Promise<void> {
    const value: string = this.form.value.id;
    if (this.form.controls.id.invalid || !value.trim()) return;

    this.form.clearBackEndErrors();
    const idExists = await this.productsApi.validateId(value.trim());

    if (idExists) {
      this.form.controls.id.setBackEndErrors({
        errorMessage: 'Id no válido',
      });
      this.form.controls.id.updateValueAndValidity({ emitEvent: false });
      this.form.controls.id.markAsTouched();
    }
  }

  async loadForm(): Promise<void> {
    try {
      let formData = new ProductForm();

      if (this.id) {
        const product = await this.productsApi.getById(this.id);

        formData = new ProductForm({
          id: product.id,
          name: product.name,
          description: product.description,
          logo: product.logo,
          releaseDate: product.date_release,
          revisionDate: product.date_revision,
        });
      }

      this.form = this.formBuilder.formGroup(
        formData
      ) as IFormGroup<ProductForm>;
    } catch {
      alert('Este producto no existe o no tiene acceso');
      this.router.navigate([this.id ? '../..' : '..'], {
        relativeTo: this.route,
      });
    }
  }

  protected handleReleaseDateChange(): void {
    this.form.controls.releaseDate?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string | undefined) => {
        const revisionDate = new Date(value!);
        revisionDate?.setFullYear(revisionDate.getFullYear() + 1);
        this.form.controls.revisionDate?.setValue(
          revisionDate.toISOString().split('T')[0]
        );
      });
  }

  protected async onReset(): Promise<void> {
    this.form.clearBackEndErrors();
    this.form.resetForm();
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      return;
    }

    try {
      this.id ? await this.update() : await this.create();

      this.router.navigate([this.id ? '../..' : '..'], {
        relativeTo: this.route,
      });
    } catch (ex) {
      alert(ex);
    }
  }

  private async create(): Promise<void> {
    const value = this.form.value;
    await this.productsApi.create({
      id: value.id,
      name: value.name,
      description: value.description,
      logo: value.logo,
      date_release: value.releaseDate,
      date_revision: value.revisionDate,
    });
  }

  private async update(): Promise<void> {
    const value = this.form.value;
    await this.productsApi.edit(this.id!, {
      id: value.id,
      name: value.name,
      description: value.description,
      logo: value.logo,
      date_release: value.releaseDate,
      date_revision: value.revisionDate,
    });
  }
}

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsApiService } from '@devsu/data/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

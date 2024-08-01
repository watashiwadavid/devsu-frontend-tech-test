import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-404',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './404.component.html',
  styleUrl: './404.component.scss',
})
export class NotFoundComponent {}

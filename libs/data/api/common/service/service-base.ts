import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { DEVSU_API_CONFIG, DevsuApiConfig } from '../../config';
import {
  catchError,
  lastValueFrom,
  map,
  Subject,
  takeUntil,
  throwError,
  timeout,
} from 'rxjs';
import { ApiListResult } from '../models/api-list-result.model';

export class ApiServiceBase<T> {
  private http = inject(HttpClient);
  private apiConfig: DevsuApiConfig = inject(DEVSU_API_CONFIG);

  private unsubscriber: Subject<void> = new Subject<void>();

  private get url(): string {
    return this.apiConfig.apiUrl + this.endpoint;
  }

  constructor(private endpoint: string) {}

  public destroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
    this.unsubscriber = new Subject();
  }

  public async getAll(): Promise<T[]> {
    return lastValueFrom(
      this.http.get<ApiListResult<T>>(this.url).pipe(
        map((x) => x.data),
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }
}

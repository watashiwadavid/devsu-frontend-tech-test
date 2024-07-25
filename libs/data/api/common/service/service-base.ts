import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { DEVSU_API_CONFIG, DevsuApiConfig } from '../../config';
import {
  catchError,
  lastValueFrom,
  map,
  pipe,
  Subject,
  takeUntil,
  throwError,
  timeout,
} from 'rxjs';
import { ApiListResult } from '../models/api-list-result.model';

export class ApiServiceBase<T, K = number> {
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

  /* ***************************
   * Query Methods
   ***************************** */

  public async exists(id: K): Promise<boolean> {
    return lastValueFrom(
      this.http.get<boolean>(`${this.url}/verification/${id}`).pipe(
        // map((x) => x.data),
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
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

  /* ***************************
   * Action Methods
   ***************************** */

  public async create(t: T): Promise<T> {
    return lastValueFrom(
      this.http.post<T>(this.url, t).pipe(
        // map((x) => x.data),
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }

  public async edit(id: K, t: Omit<T, 'id'>) {
    return lastValueFrom(
      this.http.put<T>(`${this.url}/${id}`, t).pipe(
        // map((x) => x.data),
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }

  public async delete(id: K) {
    return lastValueFrom(
      this.http.delete<T>(`${this.url}/${id}`).pipe(
        // map((x) => x.data),
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }
}

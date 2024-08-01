import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  lastValueFrom,
  Subject,
  takeUntil,
  throwError,
  timeout,
} from 'rxjs';
import { DEVSU_API_CONFIG, DevsuApiConfig } from '../../config';
import { ApiSuccessResult } from '../models/api-success-result.model';

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

  public async getAll(): Promise<ApiSuccessResult<T[]>> {
    return lastValueFrom(
      this.http.get<ApiSuccessResult<T[]>>(this.url).pipe(
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }

  public async getById(id: K): Promise<T> {
    return lastValueFrom(
      this.http.get<T>(`${this.url}/${id}`).pipe(
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }

  public async validateId(id: K): Promise<boolean> {
    return lastValueFrom(
      this.http.get<boolean>(`${this.url}/verification/${id}`).pipe(
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

  public async create(t: T): Promise<ApiSuccessResult<T>> {
    return lastValueFrom(
      this.http.post<ApiSuccessResult<T>>(this.url, t).pipe(
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }

  public async edit(id: K, t: T): Promise<ApiSuccessResult<T>> {
    return lastValueFrom(
      this.http.put<ApiSuccessResult<T>>(`${this.url}/${id}`, t).pipe(
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }

  public async delete(id: K): Promise<Pick<ApiSuccessResult<T>, 'message'>> {
    return lastValueFrom(
      this.http.delete<ApiSuccessResult<T>>(`${this.url}/${id}`).pipe(
        timeout(5000),
        catchError(() => {
          return throwError(() => new Error('Error during HTTP request'));
        }),
        takeUntil(this.unsubscriber)
      )
    );
  }
}

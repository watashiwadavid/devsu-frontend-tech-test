import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApiServiceBase } from './api-service-base';
import { DEVSU_API_CONFIG, DevsuApiConfig } from '../../config';
import { ApiSuccessResult } from '../models/api-success-result.model';
import { provideHttpClient } from '@angular/common/http';

describe('ApiServiceBase', () => {
  let service: ApiServiceBase<any>;
  let httpMock: HttpTestingController;
  const apiConfig: DevsuApiConfig = { apiUrl: 'http://localhost:3000' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DEVSU_API_CONFIG, useValue: apiConfig },
      ],
    });

    service = new ApiServiceBase('testEndpoint');
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items', async () => {
    const mockResponse: ApiSuccessResult<any[]> = {
      data: [],
      message: 'Success',
    };

    service.getAll().then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiConfig.apiUrl}/testEndpoint`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get item by id', async () => {
    const mockResponse: ApiSuccessResult<any> = {
      data: {},
      message: 'Success',
    };

    service.getById(1).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiConfig.apiUrl}/testEndpoint/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should check if item exists', async () => {
    service.validateId(1).then((response) => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne(
      `${apiConfig.apiUrl}/testEndpoint/verification/1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should create an item', async () => {
    const mockItem = { name: 'Test Item' };
    const mockResponse: ApiSuccessResult<any> = {
      data: mockItem,
      message: 'Created',
    };

    service.create(mockItem).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiConfig.apiUrl}/testEndpoint`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should edit an item', async () => {
    const mockItem = { name: 'Updated Item' };
    const mockResponse: ApiSuccessResult<any> = {
      data: mockItem,
      message: 'Updated',
    };

    service.edit(1, mockItem).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiConfig.apiUrl}/testEndpoint/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should delete an item', async () => {
    const mockResponse: Pick<ApiSuccessResult<any>, 'message'> = {
      message: 'Deleted',
    };

    service.delete(1).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiConfig.apiUrl}/testEndpoint/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should unsubscribe on destroy', () => {
    service.destroy();
    expect(service['unsubscriber'].isStopped).toBeTrue();
  });
});

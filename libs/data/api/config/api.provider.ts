import { Provider } from '@angular/core';
import { DEVSU_API_CONFIG, DevsuApiConfig } from './api.config';

export const provideApi = (apiUrl: string): Provider => {
  return {
    provide: DEVSU_API_CONFIG,
    useValue: {
      apiUrl,
    } as DevsuApiConfig,
  };
};

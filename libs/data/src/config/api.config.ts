import { InjectionToken } from '@angular/core';

export type DevsuApiConfig = {
  apiUrl: string;
};

export const DEVSU_API_CONFIG = new InjectionToken<DevsuApiConfig>(
  'DEVSU_API_CONFIG'
);

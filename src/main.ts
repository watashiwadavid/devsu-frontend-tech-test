import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from '@devsu/ui/pages';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

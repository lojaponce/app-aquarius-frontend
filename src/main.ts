// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { AuthInterceptor } from './app/services/auth-interceptor'; // ✅ importa correctamente

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])) // ✅ registra el interceptor correctamente
  ]
}).catch(err => console.error(err));

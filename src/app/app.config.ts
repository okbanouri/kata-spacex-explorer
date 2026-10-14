import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { launchReducer } from './state/launch.reducer';
import { LaunchEffects } from './state/launch.effects';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),

    provideStore({ launch: launchReducer }),

    provideEffects([LaunchEffects]),

    isDevMode() ? provideStoreDevtools({ maxAge: 25 }) : []
  ]
};

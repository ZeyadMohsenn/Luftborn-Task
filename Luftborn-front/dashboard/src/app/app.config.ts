import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';

import { AccountsAPI, GroupWebAPI ,AdWebAPI, API_BASE_URL, AreaOfInterestAPI, AuthAPI, CommentWebAPI, CouponWebAPI, DepositWebAPI, NotaryAPI, PackageWebAPI, PostWebAPI, PropertyAPI, SubscriptionWebAPI } from './core/services/REM-api-service';
import { AppLayoutModule } from './layout/app.layout.module';


export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes , withComponentInputBinding(), withViewTransitions()),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',

        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),

    provideHttpClient(withInterceptors([loaderInterceptor, jwtInterceptor])),
    {
      provide: API_BASE_URL,
      useValue: environment.ApiUrl,
    },
    AppLayoutModule,
    ConfirmationService,
    AccountsAPI,
    AuthAPI,
    AreaOfInterestAPI,
    PostWebAPI,
    PropertyAPI,
    NotaryAPI,
    DepositWebAPI,
    CommentWebAPI,
    AdWebAPI,
    PackageWebAPI,
    CouponWebAPI,
    SubscriptionWebAPI,
    GroupWebAPI
  ],
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

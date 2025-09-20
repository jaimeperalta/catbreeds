import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpBackend, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { IonicModule } from "@ionic/angular";
import { Intercept } from './app/core/intercept/intercept';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([Intercept])
    ),
    importProvidersFrom(
      IonicModule.forRoot(),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: translatePartialLoader,
          deps: [HttpBackend],
        },
        isolate: true
      })
    )
  ]
});

function translatePartialLoader(http: HttpBackend): TranslateLoader {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/", suffix: "/home.json" },
    { prefix: "./assets/i18n/", suffix: "/general.json" },
    { prefix: "./assets/i18n/", suffix: "/details.json" },
  ]);
}

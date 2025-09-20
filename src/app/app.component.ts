import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from "@ngx-translate/core";
import { CONSTANTS } from '@shared/constants/constants';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private translateService = inject(TranslateService);

  constructor() {
    this.setTranslateConfig();
    this.showSplash();
  }

  /**
   * Inicia el servicio de lenguaje por defecto asignamos ES
   */
  private setTranslateConfig(): void {
    const { ES } = CONSTANTS.LANG;

    this.translateService.addLangs([ES]);
    this.translateService.setFallbackLang(ES);
    this.translateService.use(ES);
  }

  private async showSplash(): Promise<void> {
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000
    })
  }
}

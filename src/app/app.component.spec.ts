import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { CONSTANTS } from '@shared/constants/constants';
import { ActivatedRoute, provideRouter } from '@angular/router';

// Mock de TranslateService
class TranslateServiceMock {
  addLangs = jasmine.createSpy('addLangs');
  setFallbackLang = jasmine.createSpy('setFallbackLang');
  use = jasmine.createSpy('use');
}

describe('AppComponent', () => {
  let translateService: TranslateServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock },
        provideRouter([])
      ]
    }).compileComponents();

    translateService = TestBed.inject(TranslateService) as unknown as TranslateServiceMock;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should configure TranslateService with ES language', () => {
    TestBed.createComponent(AppComponent); // dispara constructor

    const { ES } = CONSTANTS.LANG;
    expect(translateService.addLangs).toHaveBeenCalledWith([ES]);
    expect(translateService.setFallbackLang).toHaveBeenCalledWith(ES);
    expect(translateService.use).toHaveBeenCalledWith(ES);
  });
});

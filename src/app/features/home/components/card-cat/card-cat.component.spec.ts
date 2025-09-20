import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CardCatComponent } from './card-cat.component';
import { CatsService } from '@shared/services/cats-service';
import { NavController, IonicModule } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { Cat } from '@shared/interfaces/cat.interface';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Mock NavController
class NavControllerMock {
  navigateForward = jasmine.createSpy('navigateForward');
}

// Mock CatsService
class CatsServiceMock {
  catInfo = { set: jasmine.createSpy('catInfo.set') };
  getImgData = jasmine.createSpy('getImgData').and.returnValue(of('https://example.com/cat.jpg'));
}

describe('CardCatComponent', () => {
  let component: CardCatComponent;
  let fixture: ComponentFixture<CardCatComponent>;
  let catsService: CatsServiceMock;
  let navCtrl: NavControllerMock;

  const mockCat: Cat = { id: '1', name: 'Michi' } as Cat;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCatComponent],
      providers: [
        importProvidersFrom(
          IonicModule.forRoot(),
          TranslateModule.forRoot()
        ),
        { provide: CatsService, useClass: CatsServiceMock },
        { provide: NavController, useClass: NavControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardCatComponent);
    component = fixture.componentInstance;
    component.cat = mockCat;
    catsService = TestBed.inject(CatsService) as unknown as CatsServiceMock;
    navCtrl = TestBed.inject(NavController) as unknown as NavControllerMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getUrlImg and update imgState', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(catsService.getImgData).toHaveBeenCalledWith('1');
    const state = component.imgState();
    expect(state.isLoading).toBeFalse();
    expect(state.url).toBe('https://example.com/cat.jpg');
  }));

  it('openDetail should not navigate if isLoading = true', () => {
    component.imgState.set({ isLoading: true, url: '' });
    component.openDetail();

    expect(catsService.catInfo.set).not.toHaveBeenCalled();
    expect(navCtrl.navigateForward).not.toHaveBeenCalled();
  });

  it('openDetail should navigate and set catInfo if isLoading = false', () => {
    component.imgState.set({ isLoading: false, url: 'https://example.com/cat.jpg' });
    component.openDetail();

    expect(catsService.catInfo.set).toHaveBeenCalledWith({
      info: mockCat,
      img: 'https://example.com/cat.jpg'
    });
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/detail');
  });

  it('getUrlImg should handle error', fakeAsync(() => {
    catsService.getImgData.and.returnValue(throwError(() => new Error('Network Error')));
    
    try {
      component.ngOnInit();
      tick();
    } catch {}

    const state = component.imgState();
    expect(state.isLoading).toBeFalse();
    expect(state.error).toBeDefined();
  }));
});

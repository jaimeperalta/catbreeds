import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomePage } from './home.page';
import { CatsService } from '@shared/services/cats-service';
import { of, throwError } from 'rxjs';
import { CONSTANTS } from '@shared/constants/constants';
import { Cat } from '@shared/interfaces/cat.interface';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

// Mock del CatsService
class CatsServiceMock {
  getPaginatedCats = jasmine.createSpy('getPaginatedCats').and.returnValue(of([{ id: '1', name: 'Michi' } as Cat]));
  getByName = jasmine.createSpy('getByName').and.returnValue(of([{ id: '2', name: 'Garfield' } as Cat]));
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let catsService: CatsServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        importProvidersFrom(
          IonicModule.forRoot(),
          TranslateModule.forRoot()
        ),
        { provide: CatsService, useClass: CatsServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    catsService = TestBed.inject(CatsService) as unknown as CatsServiceMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getPaginatedCats', () => {
    spyOn(component, 'getPaginatedCats').and.callThrough();
    component.ngOnInit();
    expect(component.getPaginatedCats).toHaveBeenCalledWith(CONSTANTS.INITIAL_PAGE);
  });

  it('getPaginatedCats should update catState and call service', fakeAsync(() => {
    component.getPaginatedCats(0);
    tick(); // avanza el observable

    const state = component.catState();
    expect(catsService.getPaginatedCats).toHaveBeenCalledWith(0);
    expect(state.data.length).toBe(1);
    expect(state.loadingInitial).toBeFalse();
    expect(state.loadingMore).toBeFalse();
  }));

  it('getPaginatedCats should handle error', fakeAsync(() => {
    catsService.getPaginatedCats.and.returnValue(throwError(() => new Error('Network Error')));
    try {
      component.getPaginatedCats(0);
      tick();
    } catch {}
    const state = component.catState();
    expect(state.error).toBeDefined();
    expect(state.loadingInitial).toBeFalse();
    expect(state.loadingMore).toBeFalse();
  }));

  it('handleInput with value should call getByname', () => {
    spyOn<any>(component, 'getByname').and.callThrough();
    component.handleInput({ detail: { value: 'Garfield' } } as CustomEvent);
    expect(component['getByname']).toHaveBeenCalledWith('Garfield');
  });

  it('handleInput with empty value should reset state and call getPaginatedCats', () => {
    spyOn(component, 'getPaginatedCats').and.callThrough();
    component.handleInput({ detail: { value: '' } } as CustomEvent);
    const state = component.catState();
    expect(state.data.length).toBe(1);
    expect(component.getPaginatedCats).toHaveBeenCalled();
  });

  it('getByname should update catState with search results', fakeAsync(() => {
    component['getByname']('Garfield');
    tick();

    const state = component.catState();
    expect(catsService.getByName).toHaveBeenCalledWith('Garfield');
    expect(state.data.length).toBe(1);
    expect(state.loadingInitial).toBeFalse();
  }));

  it('getByname should handle error', fakeAsync(() => {
    catsService.getByName.and.returnValue(throwError(() => new Error('Search Error')));
    try {
      component['getByname']('Michi');
      tick();
    } catch {}
    const state = component.catState();
    expect(state.error).toBeDefined();
    expect(state.loadingInitial).toBeFalse();
  }));
});

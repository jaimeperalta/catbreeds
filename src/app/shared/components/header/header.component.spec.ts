import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NavController, IonicModule } from '@ionic/angular';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Mock NavController
class NavControllerMock {
  back = jasmine.createSpy('back');
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navCtrl: NavControllerMock;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        importProvidersFrom(
          IonicModule.forRoot(),
          TranslateModule.forRoot()
        ),
        { provide: NavController, useClass: NavControllerMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController) as unknown as NavControllerMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept inputs', () => {
    component.showBackButton = true;
    component.title = 'My Title';
    fixture.detectChanges();

    expect(component.showBackButton).toBeTrue();
    expect(component.title).toBe('My Title');
  });

  it('should call NavController.back when back() is invoked', () => {
    component.back();
    expect(navCtrl.back).toHaveBeenCalled();
  });
});

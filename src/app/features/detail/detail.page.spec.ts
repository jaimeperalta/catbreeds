import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPage } from './detail.page';
import { importProvidersFrom, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CatsService } from '@shared/services/cats-service';
import { Cat } from '@shared/interfaces/cat.interface';
class CatsServiceMock {
  catInfo = signal({
    info:{ id: '2', name: 'Garfield', weight: {
      metric: "1"
    }} as Cat,
    img: "test",

  });
}

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [DetailPage],
      providers: [
        importProvidersFrom(
          IonicModule.forRoot(),
          TranslateModule.forRoot()
        ),
        { provide: CatsService, useClass: CatsServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressLvlComponent } from './progress-lvl.component';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('ProgressLvlComponent', () => {
  let component: ProgressLvlComponent;
  let fixture: ComponentFixture<ProgressLvlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ProgressLvlComponent],
      providers:[
        importProvidersFrom(
          IonicModule.forRoot(),
          TranslateModule.forRoot()
        )
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressLvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

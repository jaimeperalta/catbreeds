import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardCatSkeletonComponent } from './card-cat-skeleton.component';
import { importProvidersFrom } from '@angular/core';

describe('CardCatSkeletonComponent', () => {
  let component: CardCatSkeletonComponent;
  let fixture: ComponentFixture<CardCatSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CardCatSkeletonComponent],
      providers: [
        importProvidersFrom(
          IonicModule.forRoot()
        )
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardCatSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

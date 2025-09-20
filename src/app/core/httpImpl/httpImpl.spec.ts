import { TestBed } from '@angular/core/testing';
import { HttpImpl } from './httpImpl';

describe('Http', () => {
  let service: HttpImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

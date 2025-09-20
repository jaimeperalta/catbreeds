import { TestBed } from '@angular/core/testing';
import { HttpImpl } from 'src/app/core/httpImpl/httpImpl';
import { of } from 'rxjs';
import { CONSTANTS } from '@shared/constants/constants';
import { environment } from 'src/environments/environment';
import { Cat } from '@shared/interfaces/cat.interface';
import { CatImgResponse } from '@shared/interfaces/catImgResponse';
import { CatsService } from './cats-service';

// Mock de HttpImpl
class HttpImplMock {
  doGet = jasmine.createSpy('doGet');
}

describe('CatsService', () => {
  let service: CatsService;
  let httpImpl: HttpImplMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CatsService,
        { provide: HttpImpl, useClass: HttpImplMock }
      ]
    });

    service = TestBed.inject(CatsService);
    httpImpl = TestBed.inject(HttpImpl) as unknown as HttpImplMock;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPaginatedCats', () => {
    it('should call httpImpl.doGet with correct config and return cats', (done) => {
      const mockCats: Cat[] = [{ id: '1', name: 'Michi' } as Cat];

      httpImpl.doGet.and.returnValue(of(mockCats));

      service.getPaginatedCats().subscribe((result) => {
        expect(result).toEqual(mockCats);
        expect(httpImpl.doGet).toHaveBeenCalledWith({
          url: environment.allCats,
          params: {
            limit: CONSTANTS.PAGINATION_LIMIT,
            page: String(CONSTANTS.INITIAL_PAGE)
          }
        });
        done();
      });
    });
  });

  describe('getImgData', () => {
    it('should map response to image url', (done) => {
      const mockResponse: CatImgResponse[] = [
        { url: 'https://example.com/cat.jpg' } as CatImgResponse
      ];

      httpImpl.doGet.and.returnValue(of(mockResponse));

      service.getImgData('abc').subscribe((url) => {
        expect(url).toBe('https://example.com/cat.jpg');
        expect(httpImpl.doGet).toHaveBeenCalledWith({
          url: environment.search,
          params: {
            limit: '1',
            breed_ids: 'abc'
          }
        });
        done();
      });
    });
  });

  describe('getByName', () => {
    it('should call httpImpl.doGet with correct config and return cats', (done) => {
      const mockCats: Cat[] = [{ id: '2', name: 'Garfield' } as Cat];

      httpImpl.doGet.and.returnValue(of(mockCats));

      service.getByName('Garfield').subscribe((result) => {
        expect(result).toEqual(mockCats);
        expect(httpImpl.doGet).toHaveBeenCalledWith({
          url: environment.breedsSearch,
          params: {
            q: 'Garfield'
          }
        });
        done();
      });
    });
  });
});

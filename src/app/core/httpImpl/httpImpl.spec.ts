import { TestBed } from '@angular/core/testing';
import { HttpImpl } from './httpImpl';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('HttpImpl', () => {
  let service: HttpImpl;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        HttpImpl,
        { provide: HttpClient, useValue: spy }
      ]
    });

    service = TestBed.inject(HttpImpl);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('doGet should call HttpClient.get with correct url and params', (done) => {
    const mockData = { success: true };
    const url = 'https://api.example.com/data';
    const params = {'page': '1'}

    httpClient.get.and.returnValue(of(mockData));

    service.doGet({ url, params }).subscribe(result => {
      expect(result).toEqual(mockData);
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
      done();
    });
  });

  it('doGet should handle multiple params correctly', (done) => {
    const mockData = [1, 2, 3];
    const url = 'https://api.example.com/list';
    const params = {'limit': '10'}

    httpClient.get.and.returnValue(of(mockData));

    service.doGet({ url, params }).subscribe(result => {
      expect(result).toEqual(mockData);
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
      done();
    });
  });
});

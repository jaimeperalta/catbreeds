import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CapacitorHttp, HttpParams, HttpResponse } from '@capacitor/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpImpl {

  private httpClient = inject(HttpClient);

  doGet = <T>(config: {
    url: string,
    params: HttpParams
  }): Observable<T> => {
    return this.httpClient.get<T>(config.url,{params: config.params});
  }
}

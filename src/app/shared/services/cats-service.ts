import { inject, Injectable, signal } from '@angular/core';
import { CONSTANTS } from '@shared/constants/constants';
import { Cat } from '@shared/interfaces/cat.interface';
import { CatImgResponse } from '@shared/interfaces/catImgResponse';
import { map, Observable } from 'rxjs';
import { HttpImpl } from 'src/app/core/httpImpl/httpImpl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  
  catInfo = signal<{info:Cat, img:string} | null>( null);
  private httpImpl = inject(HttpImpl);

  getPaginatedCats(page = CONSTANTS.INITIAL_PAGE): Observable<Cat[]> {
    const config = {
      url: environment.allCats,
      params: {
        limit: CONSTANTS.PAGINATION_LIMIT,
        page: String(page)
      }
    }
    return this.httpImpl.doGet<Cat[]>(config);
  }

  getImgData(imgId: string): Observable<string> {
    const config = {
      url: environment.search,
      params: {
        limit: "1",
        breed_ids: imgId
      }
    }
    return this.httpImpl.doGet<CatImgResponse[]>(config).pipe(
      map(arr => arr[0].url)
    );
  }

  getByName(catName: string): Observable<Cat[]> {
    const config = {
      url: environment.breedsSearch,
      params: {
        q: catName
      }
    }
    return this.httpImpl.doGet<Cat[]>(config);
  }
}

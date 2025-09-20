import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar
} from '@ionic/angular/standalone';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CatsService } from '@shared/services/cats-service';
import { CardCatComponent } from './components/card-cat/card-cat.component';
import { catchError, finalize } from 'rxjs';
import { CatState } from '@shared/interfaces/catData';
import { CONSTANTS } from '@shared/constants/constants';
import { CardCatSkeletonComponent } from './components/card-cat-skeleton/card-cat-skeleton.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ErrorComponent } from '@shared/components/error/error.component';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    HeaderComponent,
    CardCatComponent,
    CardCatSkeletonComponent,
    ErrorComponent,
    NoDataComponent,
    IonSearchbar,
    TranslatePipe
  ],
})
export class HomePage implements OnInit {

  catState = signal<CatState>(CONSTANTS.INITIAL_STATE);

  private catsService = inject(CatsService);

  ngOnInit(): void {
    this.getPaginatedCats(CONSTANTS.INITIAL_PAGE);
  }

  getPaginatedCats(pageNumber = CONSTANTS.INITIAL_PAGE, infiniteScrollEvent?: any) {
    const { page, data } = this.catState();

    this.catState.update(s => ({
      ...s,
      error: undefined,
      loadingInitial: !pageNumber,
      loadingMore: !!pageNumber
    }));

    this.catsService.getPaginatedCats(!pageNumber ? pageNumber : pageNumber + 1)
      .pipe(
        catchError(error => {
          this.catState.update(s => ({ ...s, loadingInitial: false, error }));
          throw error;
        }),
        finalize(() => {
          if (infiniteScrollEvent) {
            infiniteScrollEvent.target.complete();
          }
          this.catState.update(s => ({ ...s, loadingInitial: false, loadingMore: false }));
        })
      )
      .subscribe(res => {
        const newData = [...data, ...res];

        this.catState.update(s => ({
          ...s,
          data: newData,
          page: page + 1
        }));
      });
  }

  handleInput(event: CustomEvent): void {
    const { value } = event.detail;

    if (value) {
      this.getByname(value);
    } else {
      this.catState.update(() => CONSTANTS.INITIAL_STATE);
      this.getPaginatedCats();
    }
  }

  private getByname(catName: string): void {
    this.catState.update(() => ({
      ...CONSTANTS.INITIAL_STATE,
      loadingInitial: true,
      hasInfiniteScroll: false
    }));

    this.catsService.getByName(catName)
      .pipe(
        catchError(error => {
          this.catState.update(s => ({ ...s, loadingInitial: false, error }));
          throw error;
        }),
        finalize(() => {
          this.catState.update(s => ({ ...s, loadingInitial: false }));
        })
      )
      .subscribe(res => {
        this.catState.update(s => ({
          ...s,
          data: res
        }));
      });
  }
}

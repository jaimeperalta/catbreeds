import { Component, inject, Input, signal } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonItem,
  IonSkeletonText
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { Cat } from '@shared/interfaces/cat.interface';
import { CatImgState } from '@shared/interfaces/catImgState';
import { CatsService } from '@shared/services/cats-service';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-card-cat',
  templateUrl: './card-cat.component.html',
  styleUrls: ['./card-cat.component.scss'],
  imports: [
    TranslatePipe,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonItem,
    IonSkeletonText
  ]
})
export class CardCatComponent {
  @Input() cat!: Cat;

  imgState = signal<CatImgState>({
    isLoading: true,
    url: ""
  })
  noImgSrc = "/assets/imgs/no_img.png";

  private catsService = inject(CatsService);

  constructor(private router: NavController) { }

  ngOnInit(): void {
    this.getUrlImg();
  }

  openDetail(): void {
    if(this.imgState().isLoading) { return; }
    
    this.catsService.catInfo.set({info: this.cat, img: this.imgState().url});
    this.router.navigateForward("/detail");
  }

  private getUrlImg(): void {
    this.catsService.getImgData(this.cat.id)
      .pipe(
        catchError(error => {
          this.imgState.update(s => ({ ...s, isLoading: false, error }));
          throw error;
        }),
        finalize(() => {
          this.imgState.update(s => ({ ...s, isLoading: false }));
        })
      )
      .subscribe(res => {
        this.imgState.update(s => ({ ...s, url: res }));
      })
  }
}

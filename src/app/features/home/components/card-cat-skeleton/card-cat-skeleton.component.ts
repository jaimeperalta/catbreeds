import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonSkeletonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-card-cat-skeleton',
  templateUrl: './card-cat-skeleton.component.html',
  styleUrls: ['./card-cat-skeleton.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonSkeletonText
  ]
})
export class CardCatSkeletonComponent {

}

import { Component, Input, OnInit } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonProgressBar
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-progress-lvl',
  templateUrl: './progress-lvl.component.html',
  styleUrls: ['./progress-lvl.component.scss'],
  imports: [
    IonItem,
    IonLabel,
    IonProgressBar,
    TranslatePipe
  ]
})
export class ProgressLvlComponent {
  @Input() title!: string;
  @Input() progress!: number;
}

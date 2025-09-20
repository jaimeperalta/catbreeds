import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CatsService } from '@shared/services/cats-service';
import { addIcons } from 'ionicons';
import { caretBack } from 'ionicons/icons';
import {
  IonCard,
  IonItem,
  IonText
} from '@ionic/angular/standalone';
import { ProgressLvlComponent } from './components/progress-lvl/progress-lvl.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent,
    HeaderComponent,
    TranslatePipe,
    IonCard,
    IonItem,
    IonText,
    ProgressLvlComponent
  ]
})
export class DetailPage {
  catsService = inject(CatsService);

  constructor() {
    addIcons({
      'caret-back': caretBack
    })
  }

}

import { Component } from '@angular/core';
import { IonText,
  IonGrid
 } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  imports: [
    IonText,
    IonGrid,
    TranslatePipe
  ]
})
export class NoDataComponent {
  imgNoData = "/assets/imgs/no_data.png";
}

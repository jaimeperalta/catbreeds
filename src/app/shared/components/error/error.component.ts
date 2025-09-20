import { Component, EventEmitter, Output } from '@angular/core';
import { IonText,
  IonGrid,
  IonButton
 } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [
    IonText,
    IonGrid,
    IonButton,
    TranslatePipe
  ]
})
export class ErrorComponent {

  @Output() retry: EventEmitter<void> = new EventEmitter<void>();
  imgError = "/assets/imgs/error.png";
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonBackButton
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    TranslatePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton
  ]
})
export class HeaderComponent {
  @Input() showBackButton = false;
  @Input() title!: string | undefined;
  private router = inject(NavController);

  constructor() {
    this.registerIcons();
  }

  back(): void {
    this.router.back();
  }

  private registerIcons() {
    addIcons({ 'chevron-back-outline': chevronBackOutline });
  }
}

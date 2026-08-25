import { Component } from '@angular/core';
import { IonContent, IonHeader, IonItem, IonItemGroup, IonList, IonListHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonHeader, IonItem, IonItemGroup, IonList, IonListHeader, IonTitle, IonToolbar]
})
export class HomePage {
  constructor() { }
}

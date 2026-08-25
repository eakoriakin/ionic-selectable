import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { ModalComponent } from './modal/modal.component';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'inside-modal',
  templateUrl: './inside-modal.page.html',
  styleUrls: ['./inside-modal.page.scss'],
  imports: [IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar]
})
export class InsideModalPage {
  private modalController = inject(ModalController);


  async openModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    });

    modal.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'inside-modal',
  templateUrl: './inside-modal.page.html',
  styleUrls: ['./inside-modal.page.scss']
})
export class InsideModalPage implements OnInit {
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    });

    modal.present();
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { IonicSelectableComponent, IonicSelectableModule } from '../../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../../services';
import { Port } from '../../../types';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../../components/ionic-selectable/ionic-selectable.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonicSelectableModule
  ]
})
export class ModalComponent {
  private modalController = inject(ModalController);
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;
  portsSubscription: Subscription | undefined;

  close() {
    this.modalController.dismiss();
  }

  filterPorts(ports: Port[], text: string) {
    return ports.filter(port => {
      return port.name.toLowerCase().indexOf(text) !== -1 ||
        port?.country?.name.toLowerCase().indexOf(text) !== -1;
    });
  }

  searchPorts(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.portsSubscription = this.portService.getPortsAsync().subscribe(ports => {
      // Subscription will be closed when unsubscribed manually.
      if (this.portsSubscription?.closed) {
        return;
      }

      event.component.items = this.filterPorts(ports, text);
      event.component.endSearch();
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';

@Component({
  selector: 'initial-value',
  templateUrl: './initial-value.page.html',
  styleUrls: ['./initial-value.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule]
})
export class InitialValuePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;
  selectedPorts: Port[] = [];

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.port = this.ports[8];
    this.selectedPorts = [this.ports[14], this.ports[18]];
  }
}

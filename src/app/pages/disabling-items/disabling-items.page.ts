import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'disabling-items',
  templateUrl: './disabling-items.page.html',
  styleUrls: ['./disabling-items.page.scss'],
  imports: [FormsModule, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class DisablingItemsPage implements OnInit {
  private portService = inject(PortService);

  @ViewChild('loadingPortsComponent') loadingPortsComponent: IonicSelectableComponent | undefined;
  @ViewChild('dischargingPortsComponent') dischargingPortsComponent: IonicSelectableComponent | undefined;
  ports: Port[] = [];
  loadingPorts: Port[] = [];
  dischargingPorts: Port[] = [];
  disabledLoadingPorts: Port[] = [];
  disabledDischargingPorts: Port[] = [];

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  loadingPortChange(_event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.disabledDischargingPorts = this.loadingPorts;
  }

  dischargingPortChange(_event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.disabledLoadingPorts = this.dischargingPorts;
  }

  clear() {
    this.loadingPortsComponent?.clear();
    this.dischargingPortsComponent?.clear();
    this.disabledDischargingPorts = [];
    this.disabledLoadingPorts = [];
  }
}

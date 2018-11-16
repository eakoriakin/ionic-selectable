import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-disabling-items',
  templateUrl: 'disabling-items.html'
})
export class DisablingItemsPage {
  ports: Port[];
  loadingPorts: Port[] = [];
  dischargingPorts: Port[] = [];
  disabledLoadingPorts: Port[] = [];
  disabledDischargingPorts: Port[] = [];

  constructor(
    private portService: PortService
  ) {
    this.ports = this.portService.getPorts();
  }

  loadingPortChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.disabledDischargingPorts = this.loadingPorts;
  }

  dischargingPortChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.disabledLoadingPorts = this.dischargingPorts;
  }
}

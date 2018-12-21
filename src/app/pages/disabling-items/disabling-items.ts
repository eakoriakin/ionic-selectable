import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('loadingPortsComponent') loadingPortsComponent: IonicSelectableComponent;
  @ViewChild('dischargingPortsComponent') dischargingPortsComponent: IonicSelectableComponent;
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

  clear() {
    this.loadingPortsComponent.clear();
    this.dischargingPortsComponent.clear();
    this.disabledDischargingPorts = [];
    this.disabledLoadingPorts = [];
  }
}

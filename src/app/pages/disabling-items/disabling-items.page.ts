import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'disabling-items',
  templateUrl: './disabling-items.page.html',
  styleUrls: ['./disabling-items.page.scss'],
})
export class DisablingItemsPage implements OnInit {
  @ViewChild('loadingPortsComponent') loadingPortsComponent: IonicSelectableComponent;
  @ViewChild('dischargingPortsComponent') dischargingPortsComponent: IonicSelectableComponent;
  ports: Port[];
  loadingPorts: Port[] = [];
  dischargingPorts: Port[] = [];
  disabledLoadingPorts: Port[] = [];
  disabledDischargingPorts: Port[] = [];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
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

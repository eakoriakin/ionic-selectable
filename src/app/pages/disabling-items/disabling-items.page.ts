import { Component, OnInit, ViewChild } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'disabling-items',
    templateUrl: './disabling-items.page.html',
    styleUrls: ['./disabling-items.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        WikiUrlPipe,
    ],
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

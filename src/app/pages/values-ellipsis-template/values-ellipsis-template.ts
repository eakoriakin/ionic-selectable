import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-values-ellipsis-template',
  templateUrl: 'values-ellipsis-template.html'
})
export class ValuesEllipsisTemplatePage {
  ports: Port[];
  selectedPorts: Port[];

  constructor(
    private portService: PortService
  ) {
    this.ports = this.portService.getPorts();
    this.selectedPorts = [
      this.ports[5],
      this.ports[8],
      this.ports[9],
      this.ports[10],
      this.ports[11],
      this.ports[12],
      this.ports[13],
      this.ports[14],
      this.ports[15],
      this.ports[16],
      this.ports[17],
      this.ports[18],
      this.ports[19]
    ];
  }

  formatPorts(ports: Port[]) {
    return ports.map(port => port.name).join(', ');
  }
}

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'grouping-virtual-scroll',
  templateUrl: './grouping-virtual-scroll.page.html',
  styleUrls: ['./grouping-virtual-scroll.page.scss'],
})
export class GroupingVirtualScrollPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  getGroupText(port: Port, portIndex: number, ports: Port[]) {
    if (portIndex === 0 || port.country.id !== ports[portIndex - 1].country.id) {
      return port.country.name;
    }

    return null;
  }
}

import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-grouping-virtual-scroll',
    templateUrl: 'grouping-virtual-scroll.html'
})
export class GroupingVirtualScrollPage {
    ports: Port[];
    port: Port;

    constructor(
        private portService: PortService
    ) {
        this.ports = this.portService.getPorts();
    }

    getGroupText(port: Port, portIndex: number, ports: Port[]) {
        if (portIndex === 0 || port.country.id !== ports[portIndex - 1].country.id) {
            return port.country.name;
        }

        return null;
    }
}

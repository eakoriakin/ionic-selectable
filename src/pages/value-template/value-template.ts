import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-value-template',
    templateUrl: 'value-template.html'
})
export class ValueTemplatePage {
    ports: Port[];
    port: Port;

    constructor(
        private portService: PortService
    ) {
        this.ports = this.portService.getPorts();
        this.port = this.ports[4];
    }
}

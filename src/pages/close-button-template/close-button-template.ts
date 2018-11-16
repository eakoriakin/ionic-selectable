import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-close-button-template',
    templateUrl: 'close-button-template.html'
})
export class CloseButtonTemplatePage {
    ports: Port[];
    port: Port;

    constructor(
        private portService: PortService
    ) {
        this.ports = this.portService.getPorts();
    }
}

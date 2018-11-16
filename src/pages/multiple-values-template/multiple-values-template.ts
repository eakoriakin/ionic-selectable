import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-multiple-values-template',
    templateUrl: 'multiple-values-template.html'
})
export class MultipleValuesTemplatePage {
    ports: Port[];
    selectedPorts: Port[];

    constructor(
        private portService: PortService
    ) {
        this.ports = this.portService.getPorts();
        this.selectedPorts = [this.ports[5], this.ports[8]];
    }
}

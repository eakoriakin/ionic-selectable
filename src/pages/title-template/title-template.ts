import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-title-template',
    templateUrl: 'title-template.html'
})
export class TitleTemplatePage {
    ports: Port[];
    port: Port;

    constructor(
        private portService: PortService
    ) {
        this.ports = this.portService.getPorts();
    }
}

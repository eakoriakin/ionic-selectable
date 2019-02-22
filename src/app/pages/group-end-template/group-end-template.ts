import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-group-end-template',
  templateUrl: 'group-end-template.html'
})
export class GroupEndTemplatePage {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) {
    this.ports = this.portService.getPorts();
  }
}

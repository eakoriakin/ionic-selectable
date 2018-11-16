import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-item-right-template',
  templateUrl: 'item-right-template.html'
})
export class ItemRightTemplatePage {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) {
    this.ports = this.portService.getPorts();
  }
}

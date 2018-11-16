import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-message-template',
  templateUrl: 'message-template.html'
})
export class MessageTemplatePage {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) {
    this.ports = this.portService.getPorts();
  }
}

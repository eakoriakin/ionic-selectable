import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-header-template',
  templateUrl: 'header-template.html'
})
export class HeaderTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

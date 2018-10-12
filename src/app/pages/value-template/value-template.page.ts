import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'value-template',
  templateUrl: './value-template.page.html',
  styleUrls: ['./value-template.page.scss'],
})
export class ValueTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.port = this.ports[4];
  }
}

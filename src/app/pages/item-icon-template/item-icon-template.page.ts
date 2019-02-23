import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'item-icon-template',
  templateUrl: './item-icon-template.page.html',
  styleUrls: ['./item-icon-template.page.scss'],
})
export class ItemIconTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

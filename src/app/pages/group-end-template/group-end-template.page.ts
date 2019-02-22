import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'group-end-template',
  templateUrl: './group-end-template.page.html',
  styleUrls: ['./group-end-template.page.scss'],
})
export class GroupEndTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'placeholder-template',
  templateUrl: './placeholder-template.page.html',
  styleUrls: ['./placeholder-template.page.scss'],
})
export class PlaceholderTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'footer-template',
  templateUrl: './footer-template.page.html',
  styleUrls: ['./footer-template.page.scss'],
})
export class FooterTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

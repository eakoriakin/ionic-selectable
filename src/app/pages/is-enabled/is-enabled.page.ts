import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'is-enabled',
  templateUrl: './is-enabled.page.html',
  styleUrls: ['./is-enabled.page.scss']
})
export class IsEnabledPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.port = this.ports[11];
  }
}

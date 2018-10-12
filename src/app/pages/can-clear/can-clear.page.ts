import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'can-clear',
  templateUrl: './can-clear.page.html',
  styleUrls: ['./can-clear.page.scss']
})
export class CanClearPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.port = this.ports[1];
  }
}

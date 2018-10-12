import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'is-multiple',
  templateUrl: './is-multiple.page.html',
  styleUrls: ['./is-multiple.page.scss']
})
export class IsMultiplePage implements OnInit {
  ports: Port[];
  selectedPorts: Port[];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.selectedPorts = [this.ports[1], this.ports[3]];
  }
}

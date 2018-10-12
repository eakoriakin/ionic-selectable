import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'labels',
  templateUrl: './labels.page.html',
  styleUrls: ['./labels.page.scss']
})
export class LabelsPage implements OnInit {
  ports: Port[];
  port: Port;
  portStacked: Port;
  portFloating: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

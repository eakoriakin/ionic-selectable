import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'multiple-values-template',
  templateUrl: './multiple-values-template.page.html',
  styleUrls: ['./multiple-values-template.page.scss'],
})
export class MultipleValuesTemplatePage implements OnInit {
  ports: Port[];
  selectedPorts: Port[];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.selectedPorts = [this.ports[5], this.ports[8]];
  }
}

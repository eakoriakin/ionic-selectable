import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'labels',
  templateUrl: './labels.page.html',
  styleUrls: ['./labels.page.scss']
})
export class LabelsPage implements OnInit {
  ports: Port[] = [];
  portEmpty: Port | undefined;
  portEmptyNative: number | undefined;
  portDefault: Port | undefined;
  portDefaultNative: number | undefined;
  portFixed: Port | undefined;
  portFixedNative: number | undefined;
  portStacked: Port | undefined;
  portStackedNative: number | undefined;
  portFloating: Port | undefined;
  portFloatingNative: number | undefined;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  clear() {
    this.portEmpty = undefined;
    this.portEmptyNative = undefined;
    this.portDefault = undefined;
    this.portDefaultNative = undefined;
    this.portFixed = undefined;
    this.portFixedNative = undefined;
    this.portStacked = undefined;
    this.portStackedNative = undefined;
    this.portFloating = undefined;
    this.portFloatingNative = undefined;
  }
}

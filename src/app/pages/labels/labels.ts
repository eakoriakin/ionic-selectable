import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-labels',
  templateUrl: 'labels.html'
})
export class LabelsPage implements OnInit {
  ports: Port[];
  portEmpty: Port;
  portEmptyNative: number;
  portDefault: Port;
  portDefaultNative: number;
  portFixed: Port;
  portFixedNative: number;
  portStacked: Port;
  portStackedNative: number;
  portFloating: Port;
  portFloatingNative: number;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  clear() {
    this.portEmpty = null;
    this.portEmptyNative = null;
    this.portDefault = null;
    this.portDefaultNative = null;
    this.portFixed = null;
    this.portFixedNative = null;
    this.portStacked = null;
    this.portStackedNative = null;
    this.portFloating = null;
    this.portFloatingNative = null;
  }
}

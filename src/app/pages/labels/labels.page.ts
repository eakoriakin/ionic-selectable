import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'labels',
    templateUrl: './labels.page.html',
    styleUrls: ['./labels.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule]
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

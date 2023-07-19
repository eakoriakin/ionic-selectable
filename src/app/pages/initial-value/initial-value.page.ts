import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'initial-value',
    templateUrl: './initial-value.page.html',
    styleUrls: ['./initial-value.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule]
})
export class InitialValuePage implements OnInit {
  ports: Port[];
  port: Port;
  selectedPorts: Port[];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.port = this.ports[8];
    this.selectedPorts = [this.ports[14], this.ports[18]];
  }
}

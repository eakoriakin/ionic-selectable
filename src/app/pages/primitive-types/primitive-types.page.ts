import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';

@Component({
  selector: 'primitive-types',
  templateUrl: './primitive-types.page.html',
  styleUrls: ['./primitive-types.page.scss']
})
export class PrimitiveTypesPage implements OnInit {
  ports: string[];
  terminals: number[];
  port: string;
  terminal: number;
  towageRequired: boolean;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts().map(port => port.name);
    this.terminals = [1, 2, 3, 4, 5];
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: string
  }) {
    console.log('port:', event.value);
  }

  terminalChange(event: {
    component: IonicSelectableComponent,
    value: number
  }) {
    console.log('terminal:', event.value);
  }

  towageRequiredChange(event: {
    component: IonicSelectableComponent,
    value: boolean
  }) {
    console.log('towageRequired:', event.value);
  }
}

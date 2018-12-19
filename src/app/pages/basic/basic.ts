import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-basic',
  templateUrl: 'basic.html'
})
export class BasicPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
}

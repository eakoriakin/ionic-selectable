import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'icon-template',
  templateUrl: './icon-template.page.html',
  styleUrls: ['./icon-template.page.scss'],
})
export class IconTemplatePage implements OnInit {
  ports: Port[];
  port: Port;
  portCustom: Port;

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

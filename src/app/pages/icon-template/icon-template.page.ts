import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { IonicSelectableIconTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-icon-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'icon-template',
    templateUrl: './icon-template.page.html',
    styleUrls: ['./icon-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableIconTemplateDirective,
    ],
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

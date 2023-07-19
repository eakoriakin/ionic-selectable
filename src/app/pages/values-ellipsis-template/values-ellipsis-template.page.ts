import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { IonicSelectableValueTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-value-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'values-ellipsis-template',
    templateUrl: './values-ellipsis-template.page.html',
    styleUrls: ['./values-ellipsis-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableValueTemplateDirective,
        WikiUrlPipe,
    ],
})
export class ValuesEllipsisTemplatePage implements OnInit {
  ports: Port[];
  selectedPorts: Port[];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.selectedPorts = [
      this.ports[5],
      this.ports[8],
      this.ports[9],
      this.ports[10],
      this.ports[11],
      this.ports[12],
      this.ports[13],
      this.ports[14],
      this.ports[15],
      this.ports[16],
      this.ports[17],
      this.ports[18],
      this.ports[19]
    ];
  }

  formatPorts(ports: Port[]) {
    return ports.map(port => port.name).join(', ');
  }
}

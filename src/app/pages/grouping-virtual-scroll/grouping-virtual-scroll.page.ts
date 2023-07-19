import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'grouping-virtual-scroll',
    templateUrl: './grouping-virtual-scroll.page.html',
    styleUrls: ['./grouping-virtual-scroll.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        WikiUrlPipe,
    ],
})
export class GroupingVirtualScrollPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  getGroupText(port: Port, portIndex: number, ports: Port[]) {
    if (portIndex === 0 || port.country.id !== ports[portIndex - 1].country.id) {
      return port.country.name;
    }

    return null;
  }
}

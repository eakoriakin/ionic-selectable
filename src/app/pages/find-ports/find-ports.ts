import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-find-ports',
  templateUrl: 'find-ports.html'
})
export class FindPortsPage {
  ports: Port[];
  countries: Country[];
  country: Port;
  port: Port;

  constructor(
    private portService: PortService
  ) {
    this.ports = this.portService.getPorts();
    this.countries = this.portService.getCountries();
  }

  filterPorts(ports: Port[], text: string) {
    return ports.filter(port => {
      return port.name.toLowerCase().indexOf(text) !== -1 ||
        port.country.name.toLowerCase().indexOf(text) !== -1;
    });
  }

  searchPorts(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 1) {
      return;
    }

    event.component.startSearch();

    this.portService.getPortsAsync(null, null, 5000).subscribe(ports => {
      let items = this.filterPorts(ports, text);

      if (this.country) {
        items = items.filter(port => port.country.id === this.country.id);
      }

      event.component.items = items;
      event.component.endSearch();
    });
  }
}

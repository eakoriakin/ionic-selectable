import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';

@Component({
  selector: 'find-ports',
  templateUrl: './find-ports.page.html',
  styleUrls: ['./find-ports.page.scss'],
})
export class FindPortsPage implements OnInit {
  ports: Port[];
  countries: Country[];
  country: Port;
  port: Port;

  constructor(
    public portService: PortService
  ) { }

  ngOnInit() {
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
    const text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 1) {
      return;
    }

    event.component.startSearch();

    this.portService.getPortsAsync(null, null).subscribe(ports => {
      let items = this.filterPorts(ports, text);

      if (this.country) {
        items = items.filter(port => port.country.id === this.country.id);
      }

      event.component.items = items;
      event.component.endSearch();
    });
  }

  countryChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.port = null;
  }
}

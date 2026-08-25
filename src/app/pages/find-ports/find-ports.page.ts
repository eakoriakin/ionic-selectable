import { Component, OnInit, inject } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonBadge, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';

@Component({
  selector: 'find-ports',
  templateUrl: './find-ports.page.html',
  styleUrls: ['./find-ports.page.scss'],
  imports: [CommonModule, FormsModule, IonBackButton, IonBadge, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule]
})
export class FindPortsPage implements OnInit {
  portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;
  countries: Country[] = [];
  country: Port | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.countries = this.portService.getCountries();
  }

  filterPorts(ports: Port[], text: string) {
    return ports.filter(port => {
      return port.name.toLowerCase().indexOf(text) !== -1 ||
        port?.country?.name.toLowerCase().indexOf(text) !== -1;
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

    this.portService.getPortsAsync(undefined, undefined).subscribe(ports => {
      let items = this.filterPorts(ports, text);

      if (this.country) {
        items = items.filter(port => port?.country?.id === this.country?.id);
      }

      event.component.items = items;
      event.component.endSearch();
    });
  }

  countryChange(_event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.port = undefined;
  }
}

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Country, Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'cascading',
    templateUrl: './cascading.page.html',
    styleUrls: ['./cascading.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule]
})
export class CascadingPage implements OnInit {
  ports: Port[];
  countries: Country[];
  country: Country;
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.countries = this.portService.getCountries();
  }

  countryChange(event: {
    component: IonicSelectableComponent,
    value: Country
  }) {
    if (event.value) {
      this.ports = this.portService.getPorts().filter(port => {
        return port.country.id === event.value.id;
      });
    } else {
      this.ports = [];
      this.port = null;
    }
  }
}

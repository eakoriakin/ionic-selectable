import { Component, OnInit, inject } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';

@Component({
  selector: 'cascading',
  templateUrl: './cascading.page.html',
  styleUrls: ['./cascading.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule]
})
export class CascadingPage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;
  countries: Country[] = [];
  country: Country | undefined;

  ngOnInit() {
    this.countries = this.portService.getCountries();
  }

  countryChange(event: {
    component: IonicSelectableComponent,
    value: Country
  }) {
    if (event.value) {
      this.ports = this.portService.getPorts().filter(port => {
        return port?.country?.id === event.value.id;
      });
    } else {
      this.ports = [];
      this.port = undefined;
    }
  }
}

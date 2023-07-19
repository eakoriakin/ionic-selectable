import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { IonicSelectableItemTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-item-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'on-search',
    templateUrl: './on-search.page.html',
    styleUrls: ['./on-search.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule, IonicSelectableItemTemplateDirective, WikiUrlPipe]
})
export class OnSearchPage implements OnInit {
  ports: Port[];
  port: Port;
  portsSubscription: Subscription;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  filterPorts(ports: Port[], text: string) {
    return ports.filter(port => {
      return port.name.toLowerCase().indexOf(text) !== -1 ||
        port.country.name.toLowerCase().indexOf(text) !== -1 ||
        port.id.toString().toLowerCase().indexOf(text) !== -1;
    });
  }

  searchPorts(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.portsSubscription = this.portService.getPortsAsync().subscribe(ports => {
      // Subscription will be closed when unsubscribed manually.
      if (this.portsSubscription.closed) {
        return;
      }

      event.component.items = this.filterPorts(ports, text);
      event.component.endSearch();
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'grouping-virtual-scroll',
  templateUrl: './grouping-virtual-scroll.page.html',
  styleUrls: ['./grouping-virtual-scroll.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class GroupingVirtualScrollPage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;
  portWithHeaderFn: Port | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  getGroupText(port: Port, portIndex: number, ports: Port[]) {
    if (portIndex === 0 || port?.country?.id !== ports[portIndex - 1]?.country?.id) {
      return port?.country?.name;
    }

    return undefined;
  }
}

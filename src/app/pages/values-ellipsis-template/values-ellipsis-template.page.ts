import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'values-ellipsis-template',
  templateUrl: './values-ellipsis-template.page.html',
  styleUrls: ['./values-ellipsis-template.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class ValuesEllipsisTemplatePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  selectedPorts: Port[] = [];

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

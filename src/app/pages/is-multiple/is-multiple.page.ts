import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'is-multiple',
  templateUrl: './is-multiple.page.html',
  styleUrls: ['./is-multiple.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class IsMultiplePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  selectedPorts: Port[] = [];

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.selectedPorts = [this.ports[1], this.ports[3]];
  }
}

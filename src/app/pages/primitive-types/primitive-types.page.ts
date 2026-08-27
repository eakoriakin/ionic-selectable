import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonItemGroup, IonLabel, IonListHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableComponent, IonicSelectableItemTemplateDirective, IonicSelectableValueTemplateDirective } from '../../components/ionic-selectable';

@Component({
  selector: 'primitive-types',
  templateUrl: './primitive-types.page.html',
  styleUrls: ['./primitive-types.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonItemGroup, IonLabel, IonListHeader, IonTitle, IonToolbar, IonicSelectableComponent, IonicSelectableItemTemplateDirective, IonicSelectableValueTemplateDirective]
})
export class PrimitiveTypesPage implements OnInit {
  private portService = inject(PortService);

  ports: string[] = [];
  terminals: number[] = [];
  port: string | undefined;
  terminal: number | undefined;
  towageRequired: boolean | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts().map(port => port.name);
    this.terminals = [1, 2, 3, 4, 5];
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: string
  }) {
    console.log('port:', event.value);
  }

  terminalChange(event: {
    component: IonicSelectableComponent,
    value: number
  }) {
    console.log('terminal:', event.value);
  }

  towageRequiredChange(event: {
    component: IonicSelectableComponent,
    value: boolean
  }) {
    console.log('towageRequired:', event.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { IonicSelectableValueTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-value-template.directive';
import { IonicSelectableItemTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-item-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'primitive-types',
    templateUrl: './primitive-types.page.html',
    styleUrls: ['./primitive-types.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule, IonicSelectableItemTemplateDirective, IonicSelectableValueTemplateDirective]
})
export class PrimitiveTypesPage implements OnInit {
  ports: string[];
  terminals: number[];
  port: string;
  terminal: number;
  towageRequired: boolean;

  constructor(
    private portService: PortService
  ) { }

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

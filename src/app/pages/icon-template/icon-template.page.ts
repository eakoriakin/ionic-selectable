import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonLabel, IonListHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableComponent, IonicSelectableIconTemplateDirective } from '../../components/ionic-selectable';

@Component({
  selector: 'icon-template',
  templateUrl: './icon-template.page.html',
  styleUrls: ['./icon-template.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonLabel, IonListHeader, IonTitle, IonToolbar, IonicSelectableComponent, IonicSelectableIconTemplateDirective]
})
export class IconTemplatePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;
  portCustom: Port | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
}

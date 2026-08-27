import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableComponent, IonicSelectableItemIconTemplateDirective } from '../../components/ionic-selectable';
import { WikiUrlPipe } from '../../pipes';

@Component({
  selector: 'item-icon-template',
  templateUrl: './item-icon-template.page.html',
  styleUrls: ['./item-icon-template.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableComponent, IonicSelectableItemIconTemplateDirective, WikiUrlPipe]
})
export class ItemIconTemplatePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

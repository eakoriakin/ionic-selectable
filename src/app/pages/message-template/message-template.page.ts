import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableComponent, IonicSelectableMessageTemplateDirective } from '../../components/ionic-selectable';
import { WikiUrlPipe } from '../../pipes';

@Component({
  selector: 'message-template',
  templateUrl: './message-template.page.html',
  styleUrls: ['./message-template.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableComponent, IonicSelectableMessageTemplateDirective, WikiUrlPipe]
})
export class MessageTemplatePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableComponent, IonicSelectableHeaderTemplateDirective } from '../../components/ionic-selectable';
import { WikiUrlPipe } from '../../pipes';

@Component({
  selector: 'header-template',
  templateUrl: './header-template.page.html',
  styleUrls: ['./header-template.page.scss'],
  imports: [FormsModule, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableComponent, IonicSelectableHeaderTemplateDirective, WikiUrlPipe]
})
export class HeaderTemplatePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableComponent, IonicSelectableSearchFailTemplateDirective } from '../../components/ionic-selectable';
import { WikiUrlPipe } from '../../pipes';

@Component({
  selector: 'search-fail-template',
  templateUrl: './search-fail-template.page.html',
  styleUrls: ['./search-fail-template.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableComponent, IonicSelectableSearchFailTemplateDirective, WikiUrlPipe]
})
export class SearchFailTemplatePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

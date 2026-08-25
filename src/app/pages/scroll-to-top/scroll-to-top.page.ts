import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.page.html',
  styleUrls: ['./scroll-to-top.page.scss'],
  imports: [FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class ScrollToTopPage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  port: Port | undefined;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();

    setInterval(() => {
      this.portComponent?.scrollToTop().then(() => {
        console.log('Scroll completed.');
      }).catch(() => { });
    }, 5000);
  }
}

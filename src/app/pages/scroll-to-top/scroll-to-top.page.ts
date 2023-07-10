import { Component, OnInit, ViewChild } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'scroll-to-top',
    templateUrl: './scroll-to-top.page.html',
    styleUrls: ['./scroll-to-top.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule, WikiUrlPipe]
})
export class ScrollToTopPage implements OnInit {
  ports: Port[];
  port: Port;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();

    setInterval(() => {
      this.portComponent.scrollToTop().then(() => {
        console.log('Scroll completed.');
      }).catch(() => { });
    }, 5000);
  }
}

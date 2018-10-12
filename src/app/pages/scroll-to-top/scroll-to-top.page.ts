import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.page.html',
  styleUrls: ['./scroll-to-top.page.scss']
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

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'virtual-scroll',
    templateUrl: './virtual-scroll.page.html',
    styleUrls: ['./virtual-scroll.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule]
})
export class VirtualScrollPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

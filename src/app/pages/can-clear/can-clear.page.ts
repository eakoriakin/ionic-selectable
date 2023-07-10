import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'can-clear',
    templateUrl: './can-clear.page.html',
    styleUrls: ['./can-clear.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule, WikiUrlPipe]
})
export class CanClearPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.port = this.ports[1];
  }
}

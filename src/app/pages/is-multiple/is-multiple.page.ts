import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'is-multiple',
    templateUrl: './is-multiple.page.html',
    styleUrls: ['./is-multiple.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule, WikiUrlPipe]
})
export class IsMultiplePage implements OnInit {
  ports: Port[];
  selectedPorts: Port[];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.selectedPorts = [this.ports[1], this.ports[3]];
  }
}

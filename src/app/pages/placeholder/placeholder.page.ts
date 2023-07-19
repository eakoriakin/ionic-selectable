import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'placeholder',
    templateUrl: './placeholder.page.html',
    styleUrls: ['./placeholder.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule, WikiUrlPipe]
})
export class PlaceholderPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

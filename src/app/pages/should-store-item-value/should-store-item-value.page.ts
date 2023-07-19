import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'should-store-item-value',
    templateUrl: './should-store-item-value.page.html',
    styleUrls: ['./should-store-item-value.page.scss'],
    standalone: true,
    imports: [IonicModule, IonicSelectableComponent, FormsModule, JsonPipe, WikiUrlPipe]
})
export class ShouldStoreItemValuePage implements OnInit {
  ports: Port[];
  portId: number;
  portIds: number[];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
}

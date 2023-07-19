import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { IonicSelectableItemTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-item-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'item-template',
    templateUrl: './item-template.page.html',
    styleUrls: ['./item-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableItemTemplateDirective,
        WikiUrlPipe,
    ],
})
export class ItemTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { IonicSelectableItemEndTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-item-end-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'item-end-template',
    templateUrl: './item-end-template.page.html',
    styleUrls: ['./item-end-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableItemEndTemplateDirective,
        WikiUrlPipe,
    ],
})
export class ItemEndTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

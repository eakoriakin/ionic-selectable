import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { IonicSelectableValueTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-value-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'value-template',
    templateUrl: './value-template.page.html',
    styleUrls: ['./value-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableValueTemplateDirective,
        WikiUrlPipe,
    ],
})
export class ValueTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.port = this.ports[4];
  }
}

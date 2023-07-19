import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { IonicSelectableGroupTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-group-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'group-template',
    templateUrl: './group-template.page.html',
    styleUrls: ['./group-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableGroupTemplateDirective,
        WikiUrlPipe,
    ],
})
export class GroupTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

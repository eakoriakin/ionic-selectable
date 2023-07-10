import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { IonicSelectablePlaceholderTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-placeholder-template.directive';
import { IonicSelectableTitleTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-title-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'placeholder-template',
    templateUrl: './placeholder-template.page.html',
    styleUrls: ['./placeholder-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableTitleTemplateDirective,
        IonicSelectablePlaceholderTemplateDirective,
        WikiUrlPipe,
    ],
})
export class PlaceholderTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { IonicSelectableSearchFailTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-search-fail-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'search-fail-template',
    templateUrl: './search-fail-template.page.html',
    styleUrls: ['./search-fail-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableSearchFailTemplateDirective,
        WikiUrlPipe,
    ],
})
export class SearchFailTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { WikiUrlPipe } from '../../pipes/wiki-url.pipe';
import { NgFor } from '@angular/common';
import { IonicSelectableValueTemplateDirective } from '../../components/ionic-selectable/ionic-selectable-value-template.directive';
import { FormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'multiple-values-template',
    templateUrl: './multiple-values-template.page.html',
    styleUrls: ['./multiple-values-template.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        IonicSelectableComponent,
        FormsModule,
        IonicSelectableValueTemplateDirective,
        NgFor,
        WikiUrlPipe,
    ],
})
export class MultipleValuesTemplatePage implements OnInit {
  ports: Port[];
  selectedPorts: Port[];

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.selectedPorts = [this.ports[5], this.ports[8]];
  }
}

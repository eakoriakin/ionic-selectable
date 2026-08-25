import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'multiple-values-template',
  templateUrl: './multiple-values-template.page.html',
  styleUrls: ['./multiple-values-template.page.scss'],
  imports: [CommonModule, FormsModule, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class MultipleValuesTemplatePage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  selectedPorts: Port[] = [];

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.selectedPorts = [this.ports[5], this.ports[8]];
  }
}

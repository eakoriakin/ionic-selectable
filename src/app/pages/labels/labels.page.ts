import { Component, OnInit, inject } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemGroup, IonLabel, IonListHeader, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';

@Component({
  selector: 'labels',
  templateUrl: './labels.page.html',
  styleUrls: ['./labels.page.scss'],
  imports: [FormsModule, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemGroup, IonLabel, IonListHeader, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonicSelectableModule]
})
export class LabelsPage implements OnInit {
  private portService = inject(PortService);

  ports: Port[] = [];
  portEmpty: Port | undefined;
  portEmptyNative: number | undefined;
  portDefault: Port | undefined;
  portDefaultNative: number | undefined;
  portFixed: Port | undefined;
  portFixedNative: number | undefined;
  portStacked: Port | undefined;
  portStackedNative: number | undefined;
  portFloating: Port | undefined;
  portFloatingNative: number | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }

  clear() {
    this.portEmpty = undefined;
    this.portEmptyNative = undefined;
    this.portDefault = undefined;
    this.portDefaultNative = undefined;
    this.portFixed = undefined;
    this.portFixedNative = undefined;
    this.portStacked = undefined;
    this.portStackedNative = undefined;
    this.portFloating = undefined;
    this.portFloatingNative = undefined;
  }
}

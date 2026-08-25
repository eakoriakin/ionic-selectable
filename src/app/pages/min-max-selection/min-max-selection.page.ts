import { Component, OnInit, inject } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PortService } from '../../services';
import { Port } from '../../types';
import { CommonModule } from '@angular/common';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'min-max-selection',
  templateUrl: './min-max-selection.page.html',
  styleUrls: ['./min-max-selection.page.scss'],
  imports: [ReactiveFormsModule, CommonModule, IonBackButton, IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class MinMaxSelectionPage implements OnInit {
  private portService = inject(PortService);
  private formBuilder = inject(UntypedFormBuilder);

  ports: Port[] = [];
  port: Port | undefined;
  portsControl: UntypedFormControl | undefined;
  form!: UntypedFormGroup;

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.portsControl = this.formBuilder.control([], [
      Validators.required, Validators.minLength(1), Validators.maxLength(3)
    ]);
    this.form = this.formBuilder.group({
      ports: this.portsControl
    });
  }

  clear() {
    this.portsControl?.reset();
  }
}

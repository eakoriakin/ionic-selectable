import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PortService } from '../../services';
import { Port } from '../../types';
import { CommonModule } from '@angular/common';
import { IonBackButton, IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'form-control',
  templateUrl: './form-control.page.html',
  styleUrls: ['./form-control.page.scss'],
  imports: [ReactiveFormsModule, CommonModule, IonBackButton, IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class FormControlPage implements OnInit {
  private portService = inject(PortService);
  private formBuilder = inject(FormBuilder);

  ports: Port[] = [];
  portControl: FormControl | undefined;
  form!: FormGroup;

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.portControl = this.formBuilder.control(this.ports[6],
      Validators.required);
    this.form = this.formBuilder.group({
      port: this.portControl
    });
  }

  reset() {
    this.portControl?.reset();
  }
}

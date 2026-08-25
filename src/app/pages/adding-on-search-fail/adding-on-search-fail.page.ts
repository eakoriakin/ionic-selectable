import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'adding-on-search-fail',
  templateUrl: './adding-on-search-fail.page.html',
  styleUrls: ['./adding-on-search-fail.page.scss'],
  imports: [ReactiveFormsModule, FormsModule, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class AddingOnSearchFailPage implements OnInit {
  private portService = inject(PortService);
  private formBuilder = inject(FormBuilder);

  ports: Port[] = [];
  port: Port | undefined;
  countries: Country[] = [];
  portForm!: FormGroup;
  portNameControl: FormControl | undefined;
  portCountryControl: FormControl | undefined;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent | undefined;

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.countries = this.portService.getCountries();

    // Create port form that will be used to add or save port.
    this.portNameControl = this.formBuilder.control(null, Validators.required);
    this.portCountryControl = this.formBuilder.control(null, Validators.required);
    this.portForm = this.formBuilder.group({
      portName: this.portNameControl,
      portCountry: this.portCountryControl
    });
  }

  onSearchFail(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    // Clean form.
    this.portNameControl?.reset();
    this.portCountryControl?.reset();

    // Copy search text to port name field, so
    // user doesn't have to type again.
    this.portNameControl?.setValue(event.component.searchText);

    // Show form.
    event.component.showAddItemTemplate();
  }

  onSearchSuccess(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    // Hide form.
    event.component.hideAddItemTemplate();
  }

  addPort() {
    // Create port.
    const port = new Port({
      id: this.portService.getNewPortId(),
      name: this.portNameControl?.value,
      country: this.portCountryControl?.value
    });

    // Add port to storage.
    this.portService.addPort(port);

    // Add port to the top of list.
    this.portComponent?.addItem(port).then(() => {
      this.portComponent?.search(port.name);
    });

    // Clean form.
    this.portNameControl?.reset();
    this.portCountryControl?.reset();

    // Show list.
    this.portComponent?.hideAddItemTemplate();
  }
}

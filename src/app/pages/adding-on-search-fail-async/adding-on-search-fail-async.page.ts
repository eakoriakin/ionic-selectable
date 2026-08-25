import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PortService } from '../../services';
import { Country, Port } from '../../types';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';

@Component({
  selector: 'adding-on-search-fail-async',
  templateUrl: './adding-on-search-fail-async.page.html',
  styleUrls: ['./adding-on-search-fail-async.page.scss'],
  imports: [ReactiveFormsModule, FormsModule, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonTitle, IonToolbar, IonicSelectableModule, PipesModule]
})
export class AddingOnSearchFailAsyncPage implements OnInit {
  private portService = inject(PortService);
  private formBuilder = inject(FormBuilder);

  ports: Port[] = [];
  countries: Country[] = [];
  port: Port | undefined;
  portForm!: FormGroup;
  portNameControl: FormControl | undefined;
  portCountryControl: FormControl | undefined;
  portsSubscription: Subscription | undefined;
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

  searchPorts(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.portsSubscription = this.portService.getPortsAsync().subscribe(ports => {
      // Subscription will be closed when unsubscribed manually.
      if (this.portsSubscription?.closed) {
        return;
      }

      event.component.items = this.portService.filterPorts(ports, text);
      event.component.endSearch();
    });
  }

  onSearchFail(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    if (event.component.hasSearchText) {
      // Clean form.
      this.portNameControl?.reset();
      this.portCountryControl?.reset();

      // Copy search text to port name field, so
      // user doesn't have to type again.
      this.portNameControl?.setValue(event.component.searchText);

      // Show form.
      event.component.showAddItemTemplate();
    }
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

    // Show loading while port is being added to storage.
    this.portComponent?.showLoading();

    // Add port to storage.
    this.portService.addPortAsync(port).subscribe(() => {
      // Search for added port.
      this.portComponent?.search(port.name);

      // Wait for search to complete before showing list.
      this.portsSubscription?.add(() => {
        // Show list.
        this.portComponent?.hideAddItemTemplate();

        // Clean form.
        this.portNameControl?.reset();
        this.portCountryControl?.reset();
      });
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';

@Component({
  selector: 'editing-async',
  templateUrl: './editing-async.page.html',
  styleUrls: ['./editing-async.page.scss'],
})
export class EditingAsyncPage implements OnInit {
  ports: Port[];
  countries: Country[];
  port: Port;
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;
  portsSubscription: Subscription;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;

  constructor(
    private portService: PortService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
      if (this.portsSubscription.closed) {
        return;
      }

      event.component.items = this.portService.filterPorts(ports, text);
      event.component.endSearch();
    });
  }

  onAddPort(event: {
    component: IonicSelectableComponent
  }) {
    // Clean form.
    this.portNameControl.reset();
    this.portCountryControl.reset();

    // Copy search text to port name field, so
    // user doesn't have to type again.
    this.portNameControl.setValue(event.component.searchText);

    // Show form.
    event.component.showAddItemTemplate();
  }

  onSavePort(event: {
    component: IonicSelectableComponent,
    item: Port
  }) {
    // Fill form.
    this.portNameControl.setValue(event.item.name);
    this.portCountryControl.setValue(event.item.country);

    // Show form.
    event.component.showAddItemTemplate();
  }

  onDeletePort(event: {
    component: IonicSelectableComponent,
    item: Port
  }) {
    // Show loading while port is being added to storage.
    event.component.showLoading();

    // Delete port from storage.
    this.portService.deletePortAsync(event.item).subscribe(() => {
      // Delete port from list.
      event.component.deleteItem(event.item).then(() => {
        // Hide loading.
        event.component.hideLoading();
      });
    });
  }

  addPort() {
    // Create port.
    const port = new Port({
      id: this.portService.getNewPortId(),
      name: this.portNameControl.value,
      country: this.portCountryControl.value
    });

    // Show loading while port is being added to storage.
    this.portComponent.showLoading();

    // Add port to storage.
    this.portService.addPortAsync(port).subscribe(() => {
      // Search for added port.
      this.portComponent.search(port.name);

      // Wait for search to complete before showing list.
      this.portsSubscription.add(() => {
        // Show list.
        this.portComponent.hideAddItemTemplate();

        // Clean form.
        this.portNameControl.reset();
        this.portCountryControl.reset();
      });
    });
  }

  savePort(port: Port) {
    // Show loading while port is being saved to storage.
    this.portComponent.showLoading();

    // Simulate async request.
    setTimeout(() => {
      // Change port.
      port.name = this.portNameControl.value;
      port.country = this.portCountryControl.value;

      // Show list.
      this.portComponent.hideAddItemTemplate();

      // Hide loading.
      this.portComponent.hideLoading();
    }, 1000);
  }
}

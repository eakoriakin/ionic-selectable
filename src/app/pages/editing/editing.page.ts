import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';

@Component({
  selector: 'editing',
  templateUrl: './editing.page.html',
  styleUrls: ['./editing.page.scss'],
})
export class EditingPage implements OnInit {
  ports: Port[];
  countries: Country[];
  port: Port;
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;

  constructor(
    private portService: PortService,
    private formBuilder: FormBuilder
  ) { }

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
    // Delete port from storage.
    this.portService.deletePort(event.item);

    // Delete port from list.
    event.component.deleteItem(event.item);
  }

  addPort() {
    // Create port.
    const port = new Port({
      id: this.portService.getNewPortId(),
      name: this.portNameControl.value,
      country: this.portCountryControl.value
    });

    // Add port to storage.
    this.portService.addPort(port);

    // Add port to the top of list.
    this.portComponent.addItem(port).then(() => {
      this.portComponent.search(port.name);
    });

    // Clean form.
    this.portNameControl.reset();
    this.portCountryControl.reset();

    // Show list.
    this.portComponent.hideAddItemTemplate();
  }

  savePort(port: Port) {
    // Change port.
    port.name = this.portNameControl.value;
    port.country = this.portCountryControl.value;

    // Show list.
    this.portComponent.hideAddItemTemplate();
  }
}

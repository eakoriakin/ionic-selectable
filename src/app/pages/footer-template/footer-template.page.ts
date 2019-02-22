import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';

@Component({
  selector: 'footer-template',
  templateUrl: './footer-template.page.html',
  styleUrls: ['./footer-template.page.scss'],
})
export class FooterTemplatePage implements OnInit {
  ports: Port[];
  countries: Country[];
  port: Port;
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;

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

  toggleItems() {
    this.portComponent.toggleItems(this.portComponent.itemsToConfirm.length ? false : true);

    // Confirm items and close Modal
    // without having the user to click Confirm button.
    // this.portComponent.confirm();
    // this.portComponent.close();
  }

  clear() {
    this.portComponent.clear();
    this.portComponent.close();
  }

  confirm() {
    this.portComponent.confirm();
    this.portComponent.close();
  }

  onAddPort() {
    // Clean form.
    this.portNameControl.reset();
    this.portCountryControl.reset();

    // Copy search text to port name field, so
    // user doesn't have to type again.
    this.portNameControl.setValue(this.portComponent.searchText);

    // Show form.
    this.portComponent.showAddItemTemplate();
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicSelectableComponent } from '../../components/ionic-selectable/ionic-selectable.module';
import { PortService } from '../../services';
import { Country, Port } from '../../types';

@Component({
  selector: 'adding-on-search-fail',
  templateUrl: './adding-on-search-fail.page.html',
  styleUrls: ['./adding-on-search-fail.page.scss']
})
export class AddingOnSearchFailPage implements OnInit {
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

  onSearchFail(event: {
    component: IonicSelectableComponent,
    text: string
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
}

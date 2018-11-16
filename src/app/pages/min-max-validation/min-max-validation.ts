import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-min-max-validation',
  templateUrl: 'min-max-validation.html'
})
export class MinMaxValidationPage {
  ports: Port[];
  port: Port;
  portsControl: FormControl;
  form: FormGroup;

  constructor(
    private portService: PortService,
    private formBuilder: FormBuilder
  ) {
    this.ports = this.portService.getPorts();
    this.portsControl = this.formBuilder.control([], [
      Validators.required, Validators.minLength(1), Validators.maxLength(3)
    ]);
    this.form = this.formBuilder.group({
      ports: this.portsControl
    });
  }

  reset() {
    this.portsControl.reset();
  }
}

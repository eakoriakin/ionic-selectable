import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'min-max-selection',
  templateUrl: './min-max-selection.page.html',
  styleUrls: ['./min-max-selection.page.scss']
})
export class MinMaxSelectionPage implements OnInit {
  ports: Port[];
  port: Port;
  portsControl: FormControl;
  form: FormGroup;

  constructor(
    private portService: PortService,
    private formBuilder: FormBuilder
  ) { }

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
    this.portsControl.reset();
  }
}

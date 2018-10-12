import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'form-control',
  templateUrl: './form-control.page.html',
  styleUrls: ['./form-control.page.scss']
})
export class FormControlPage implements OnInit {
  ports: Port[];
  portControl: FormControl;
  form: FormGroup;

  constructor(
    private portService: PortService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
    this.portControl = this.formBuilder.control(this.ports[6],
      Validators.required);
    this.form = this.formBuilder.group({
      port: this.portControl
    });
  }

  reset() {
    this.portControl.reset();
  }
}

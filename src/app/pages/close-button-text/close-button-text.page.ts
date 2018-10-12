import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'close-button-text',
  templateUrl: './close-button-text.page.html',
  styleUrls: ['./close-button-text.page.scss']
})
export class CloseButtonTextPage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

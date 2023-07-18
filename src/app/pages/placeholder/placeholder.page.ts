import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'placeholder',
  templateUrl: './placeholder.page.html',
  styleUrls: ['./placeholder.page.scss']
})
export class PlaceholderPage implements OnInit {
  ports: Port[] = [];
  port: Port | undefined;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

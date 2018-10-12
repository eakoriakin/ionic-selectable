import { Component, OnInit } from '@angular/core';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
  selector: 'search-fail-template',
  templateUrl: './search-fail-template.page.html',
  styleUrls: ['./search-fail-template.page.scss'],
})
export class SearchFailTemplatePage implements OnInit {
  ports: Port[];
  port: Port;

  constructor(
    private portService: PortService
  ) { }

  ngOnInit() {
    this.ports = this.portService.getPorts();
  }
}

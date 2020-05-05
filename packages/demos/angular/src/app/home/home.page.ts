import { Component, ViewChild } from '@angular/core';
import { IonicSelectable } from 'test-isa';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('ionicSelectable', { static: false }) ionicSelectable: IonicSelectable;

  items = [];
/*     { id: 1, port: 'Salina Cruz', country: { country: 'Mexico' } },
    { id: 2, port: 'Valencia', country: { country: 'Spain' } },
    { id: 3, port: 'Veracruz', country: { country: 'Mexico' } }
  ]; */

  binding;

  constructor() {
    for (let index = 1; index < 20; index++) {
      this.items.push({ id: index, port: 'Salina Cruz', country: { country: 'Mexico' } });
    }
  }

  onChanged(event: CustomEvent) {
    console.log(event);
  }

  open() {
    this.ionicSelectable.open();
  }

}

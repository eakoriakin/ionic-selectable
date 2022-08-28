import { Component, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from '@ionic-selectable/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('ionicSelectable') ionicSelectable: IonicSelectableComponent;

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

  onChanged(event: any) {
    console.log(event);
  }

  open() {
    this.ionicSelectable.open();
  }

}

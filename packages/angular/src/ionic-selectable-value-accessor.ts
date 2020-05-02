import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'onic-selectable',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IonicSelectableValueAccessor,
      multi: true
    }
  ]
})
export class IonicSelectableValueAccessor extends ValueAccessor {

  constructor(el: ElementRef) {
    super(el);
  }

  @HostListener('changed', ['$event.target'])
  _handleChangeEvent(el: any) {
    this.handleChangeEvent(el, el.value);
  }
}
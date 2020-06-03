import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { TemplateContext } from '../utils/util';

@Directive({
  selector: '[ionicSelectableIconTemplate]',
})
export class IonicSelectableIconTemplateDirective {
  constructor(public templateRef: TemplateRef<TemplateContext>, public viewContainer: ViewContainerRef) {}
}

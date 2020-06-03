import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { TemplateContext } from '../utils/util';

@Directive({
  selector: '[ionicSelectableValueTemplate]',
})
export class IonicSelectableValueTemplateDirective {
  constructor(public templateRef: TemplateRef<TemplateContext>, public viewContainer: ViewContainerRef) {}
}

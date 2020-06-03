import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { TemplateContext } from '../utils/util';

@Directive({
  selector: '[ionicSelectableGroupTemplate]',
})
export class IonicSelectableGroupTemplateDirective {
  constructor(public templateRef: TemplateRef<TemplateContext>, public viewContainer: ViewContainerRef) {}
}

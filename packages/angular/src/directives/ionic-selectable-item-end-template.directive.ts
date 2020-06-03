import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { TemplateContext } from '../utils/util';

@Directive({
  selector: '[ionicSelectableItemEndTemplate]',
})
export class IonicSelectableItemEndTemplateDirective {
  constructor(public templateRef: TemplateRef<TemplateContext>, public viewContainer: ViewContainerRef) {}
}

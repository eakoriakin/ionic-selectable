import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { TemplateContext } from '../utils/util';

@Directive({
  selector: '[ionicSelectablePlaceholderTemplate]',
})
export class IonicSelectablePlaceholderTemplateDirective {
  constructor(public templateRef: TemplateRef<TemplateContext>, public viewContainer: ViewContainerRef) {}
}

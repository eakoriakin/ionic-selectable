import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { TemplateContext } from '../util';

@Directive({
  selector: '[ionicSelectableItemTemplate]'
})
export class IonicSelectableItemTemplateDirective {
  constructor(public templateRef: TemplateRef<TemplateContext>, public viewContainer: ViewContainerRef) {}
 }
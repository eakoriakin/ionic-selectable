import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableAddItemTemplateDirective } from './ionic-selectable-add-item-template.directive';
import { IonicSelectableCloseButtonTemplateDirective } from './ionic-selectable-close-button-template.directive';
import { IonicSelectableFooterTemplateDirective } from './ionic-selectable-footer-template.directive';
import { IonicSelectableGroupRightTemplateDirective } from './ionic-selectable-group-right-template.directive';
import { IonicSelectableGroupTemplateDirective } from './ionic-selectable-group-template.directive';
import { IonicSelectableHeaderTemplateDirective } from './ionic-selectable-header-template.directive';
import { IonicSelectableItemRightTemplateDirective } from './ionic-selectable-item-right-template.directive';
import { IonicSelectableItemTemplateDirective } from './ionic-selectable-item-template.directive';
import { IonicSelectableMessageTemplateDirective } from './ionic-selectable-message-template.directive';
import { IonicSelectablePageComponent } from './ionic-selectable-page.component';
import { IonicSelectablePlaceholderTemplateDirective } from './ionic-selectable-placeholder-template.directive';
import { IonicSelectableSearchFailTemplateDirective } from './ionic-selectable-search-fail-template.directive';
import { IonicSelectableTitleTemplateDirective } from './ionic-selectable-title-template.directive';
import { IonicSelectableValueTemplateDirective } from './ionic-selectable-value-template.directive';
import { IonicSelectableComponent } from './ionic-selectable.component';
export { IonicSelectableAddItemTemplateDirective } from './ionic-selectable-add-item-template.directive';
export { IonicSelectableCloseButtonTemplateDirective } from './ionic-selectable-close-button-template.directive';
export { IonicSelectableFooterTemplateDirective } from './ionic-selectable-footer-template.directive';
export { IonicSelectableGroupRightTemplateDirective } from './ionic-selectable-group-right-template.directive';
export { IonicSelectableGroupTemplateDirective } from './ionic-selectable-group-template.directive';
export { IonicSelectableHeaderTemplateDirective } from './ionic-selectable-header-template.directive';
export { IonicSelectableItemRightTemplateDirective } from './ionic-selectable-item-right-template.directive';
export { IonicSelectableItemTemplateDirective } from './ionic-selectable-item-template.directive';
export { IonicSelectableMessageTemplateDirective } from './ionic-selectable-message-template.directive';
export { IonicSelectablePageComponent } from './ionic-selectable-page.component';
export { IonicSelectablePlaceholderTemplateDirective } from './ionic-selectable-placeholder-template.directive';
export { IonicSelectableSearchFailTemplateDirective } from './ionic-selectable-search-fail-template.directive';
export { IonicSelectableTitleTemplateDirective } from './ionic-selectable-title-template.directive';
export { IonicSelectableValueTemplateDirective } from './ionic-selectable-value-template.directive';
export { IonicSelectableComponent } from './ionic-selectable.component';

const components = [IonicSelectableComponent, IonicSelectablePageComponent],
  directives = [
    IonicSelectableValueTemplateDirective,
    IonicSelectableItemTemplateDirective,
    IonicSelectableItemRightTemplateDirective,
    IonicSelectableTitleTemplateDirective,
    IonicSelectablePlaceholderTemplateDirective,
    IonicSelectableMessageTemplateDirective,
    IonicSelectableGroupTemplateDirective,
    IonicSelectableGroupRightTemplateDirective,
    IonicSelectableCloseButtonTemplateDirective,
    IonicSelectableSearchFailTemplateDirective,
    IonicSelectableAddItemTemplateDirective,
    IonicSelectableFooterTemplateDirective,
    IonicSelectableHeaderTemplateDirective
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    ...components,
    ...directives
  ],
  exports: [
    ...components,
    ...directives
  ],
  entryComponents: components
})
export class IonicSelectableModule { }

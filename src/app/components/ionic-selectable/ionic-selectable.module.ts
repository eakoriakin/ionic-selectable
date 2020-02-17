import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableAddItemTemplateDirective } from './ionic-selectable-add-item-template.directive';
import { IonicSelectableCloseButtonTemplateDirective } from './ionic-selectable-close-button-template.directive';
import { IonicSelectableFooterTemplateDirective } from './ionic-selectable-footer-template.directive';
import { IonicSelectableGroupEndTemplateDirective } from './ionic-selectable-group-end-template.directive';
import { IonicSelectableGroupTemplateDirective } from './ionic-selectable-group-template.directive';
import { IonicSelectableHeaderTemplateDirective } from './ionic-selectable-header-template.directive';
import { IonicSelectableItemEndTemplateDirective } from './ionic-selectable-item-end-template.directive';
import { IonicSelectableItemIconTemplateDirective } from './ionic-selectable-item-icon-template.directive';
import { IonicSelectableItemTemplateDirective } from './ionic-selectable-item-template.directive';
import { IonicSelectableMessageTemplateDirective } from './ionic-selectable-message-template.directive';
import { IonicSelectableModalComponent } from './ionic-selectable-modal.component';
import { IonicSelectablePlaceholderTemplateDirective } from './ionic-selectable-placeholder-template.directive';
import { IonicSelectableSearchFailTemplateDirective } from './ionic-selectable-search-fail-template.directive';
import { IonicSelectableTitleTemplateDirective } from './ionic-selectable-title-template.directive';
import { IonicSelectableValueTemplateDirective } from './ionic-selectable-value-template.directive';
import { IonicSelectableIconTemplateDirective } from './ionic-selectable-icon-template.directive';
import { IonicSelectableComponent } from './ionic-selectable.component';
export { IonicSelectableAddItemTemplateDirective } from './ionic-selectable-add-item-template.directive';
export { IonicSelectableCloseButtonTemplateDirective } from './ionic-selectable-close-button-template.directive';
export { IonicSelectableFooterTemplateDirective } from './ionic-selectable-footer-template.directive';
export { IonicSelectableGroupEndTemplateDirective } from './ionic-selectable-group-end-template.directive';
export { IonicSelectableGroupTemplateDirective } from './ionic-selectable-group-template.directive';
export { IonicSelectableHeaderTemplateDirective } from './ionic-selectable-header-template.directive';
export { IonicSelectableItemEndTemplateDirective } from './ionic-selectable-item-end-template.directive';
export { IonicSelectableItemIconTemplateDirective } from './ionic-selectable-item-icon-template.directive';
export { IonicSelectableItemTemplateDirective } from './ionic-selectable-item-template.directive';
export { IonicSelectableMessageTemplateDirective } from './ionic-selectable-message-template.directive';
export { IonicSelectableModalComponent } from './ionic-selectable-modal.component';
export { IonicSelectablePlaceholderTemplateDirective } from './ionic-selectable-placeholder-template.directive';
export { IonicSelectableSearchFailTemplateDirective } from './ionic-selectable-search-fail-template.directive';
export { IonicSelectableTitleTemplateDirective } from './ionic-selectable-title-template.directive';
export { IonicSelectableValueTemplateDirective } from './ionic-selectable-value-template.directive';
export { IonicSelectableIconTemplateDirective } from './ionic-selectable-icon-template.directive';
export { IonicSelectableComponent } from './ionic-selectable.component';

const components = [IonicSelectableComponent, IonicSelectableModalComponent],
  directives = [
    IonicSelectableValueTemplateDirective,
    IonicSelectableItemTemplateDirective,
    IonicSelectableItemEndTemplateDirective,
    IonicSelectableTitleTemplateDirective,
    IonicSelectablePlaceholderTemplateDirective,
    IonicSelectableMessageTemplateDirective,
    IonicSelectableGroupTemplateDirective,
    IonicSelectableGroupEndTemplateDirective,
    IonicSelectableCloseButtonTemplateDirective,
    IonicSelectableSearchFailTemplateDirective,
    IonicSelectableAddItemTemplateDirective,
    IonicSelectableFooterTemplateDirective,
    IonicSelectableHeaderTemplateDirective,
    IonicSelectableItemIconTemplateDirective,
    IonicSelectableIconTemplateDirective
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

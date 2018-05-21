import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableItemRightTemplateDirective } from './select-searchable-item-right-template.directive';
import { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
import { SelectSearchableLabelTemplateDirective } from './select-searchable-label-template.directive';
import { SelectSearchableMessageTemplateDirective } from './select-searchable-message-template.directive';
import { SelectSearchablePageComponent } from './select-searchable-page.component';
import { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';
import { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';
import { SelectSearchableComponent } from './select-searchable.component';
export { SelectSearchableComponent } from './select-searchable.component';
export { SelectSearchablePageComponent } from './select-searchable-page.component';
export { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';
export { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
export { SelectSearchableItemRightTemplateDirective } from './select-searchable-item-right-template.directive';
export { SelectSearchableLabelTemplateDirective } from './select-searchable-label-template.directive';
export { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';
export { SelectSearchableMessageTemplateDirective } from './select-searchable-message-template.directive';

let components = [SelectSearchableComponent, SelectSearchablePageComponent];

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(SelectSearchableComponent),
        IonicPageModule.forChild(SelectSearchablePageComponent)
    ],
    declarations: [
        ...components,
        SelectSearchableValueTemplateDirective,
        SelectSearchableItemTemplateDirective,
        SelectSearchableItemRightTemplateDirective,
        SelectSearchableLabelTemplateDirective,
        SelectSearchableTitleTemplateDirective,
        SelectSearchableMessageTemplateDirective
    ],
    exports: [
        ...components,
        SelectSearchableValueTemplateDirective,
        SelectSearchableItemTemplateDirective,
        SelectSearchableItemRightTemplateDirective,
        SelectSearchableLabelTemplateDirective,
        SelectSearchableTitleTemplateDirective,
        SelectSearchableMessageTemplateDirective
    ],
    entryComponents: components
})
export class SelectSearchableModule { }

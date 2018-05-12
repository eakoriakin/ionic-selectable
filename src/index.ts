import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchable } from './select-searchable.component';
import { SelectSearchablePage } from './select-searchable-page.component';
import { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';
import { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
import { SelectSearchableLabelTemplateDirective } from './select-searchable-label-template.directive';
import { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';
export { SelectSearchable } from './select-searchable.component';
export { SelectSearchablePage } from './select-searchable-page.component';
export { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';
export { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
export { SelectSearchableLabelTemplateDirective } from './select-searchable-label-template.directive';
export { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';

let components = [SelectSearchable, SelectSearchablePage];

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(SelectSearchable),
        IonicPageModule.forChild(SelectSearchablePage)
    ],
    declarations: [
        ...components,
        SelectSearchableValueTemplateDirective,
        SelectSearchableItemTemplateDirective,
        SelectSearchableLabelTemplateDirective,
        SelectSearchableTitleTemplateDirective
    ],
    exports: [
        ...components,
        SelectSearchableValueTemplateDirective,
        SelectSearchableItemTemplateDirective,
        SelectSearchableLabelTemplateDirective,
        SelectSearchableTitleTemplateDirective
    ],
    entryComponents: components
})
export class SelectSearchableModule { }

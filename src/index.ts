import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableGroupRightTemplateDirective } from './select-searchable-group-right-template.directive';
import { SelectSearchableGroupTemplateDirective } from './select-searchable-group-template.directive';
import { SelectSearchableItemRightTemplateDirective } from './select-searchable-item-right-template.directive';
import { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
import { SelectSearchableMessageTemplateDirective } from './select-searchable-message-template.directive';
import { SelectSearchablePageComponent } from './select-searchable-page.component';
import { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';
import { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';
import { SelectSearchableComponent } from './select-searchable.component';
export { SelectSearchableGroupRightTemplateDirective } from './select-searchable-group-right-template.directive';
export { SelectSearchableGroupTemplateDirective } from './select-searchable-group-template.directive';
export { SelectSearchableItemRightTemplateDirective } from './select-searchable-item-right-template.directive';
export { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
export { SelectSearchableMessageTemplateDirective } from './select-searchable-message-template.directive';
export { SelectSearchablePageComponent } from './select-searchable-page.component';
export { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';
export { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';
export { SelectSearchableComponent } from './select-searchable.component';

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
        SelectSearchableTitleTemplateDirective,
        SelectSearchableMessageTemplateDirective,
        SelectSearchableGroupTemplateDirective,
        SelectSearchableGroupRightTemplateDirective
    ],
    exports: [
        ...components,
        SelectSearchableValueTemplateDirective,
        SelectSearchableItemTemplateDirective,
        SelectSearchableItemRightTemplateDirective,
        SelectSearchableTitleTemplateDirective,
        SelectSearchableMessageTemplateDirective,
        SelectSearchableGroupTemplateDirective,
        SelectSearchableGroupRightTemplateDirective
    ],
    entryComponents: components
})
export class SelectSearchableModule { }

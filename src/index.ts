import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchable } from './select-searchable.component';
import { SelectSearchablePage } from './select-searchable-page.component';
export { SelectSearchable } from './select-searchable.component';
export { SelectSearchablePage } from './select-searchable-page.component';

let components = [SelectSearchable, SelectSearchablePage];

@NgModule({
    imports: [
        CommonModule,
        IonicPageModule.forChild(SelectSearchable),
        IonicPageModule.forChild(SelectSearchablePage)
    ],
    declarations: components,
    exports: components,
    entryComponents: components
})
export class SelectSearchableModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchable } from './select-searchable.component';
import { SelectSearchablePage } from './select-searchable-page.component';

let components = [SelectSearchable, SelectSearchablePage];

@NgModule({
    declarations: components,
    imports: [
        IonicPageModule.forChild(SelectSearchable),
        IonicPageModule.forChild(SelectSearchablePage)
    ],
    exports: components,
    entryComponents: components
})
export class SelectSearchableModule { }

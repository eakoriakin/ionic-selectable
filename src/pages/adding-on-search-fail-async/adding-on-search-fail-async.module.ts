import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { AddingOnSearchFailAsyncPage } from './adding-on-search-fail-async';

@NgModule({
    declarations: [
        AddingOnSearchFailAsyncPage
    ],
    imports: [
        IonicPageModule.forChild(AddingOnSearchFailAsyncPage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class AddingOnSearchFailAsyncPageModule { }

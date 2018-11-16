import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { AddingOnSearchFailPage } from './adding-on-search-fail';

@NgModule({
    declarations: [
        AddingOnSearchFailPage
    ],
    imports: [
        IonicPageModule.forChild(AddingOnSearchFailPage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class AddingOnSearchFailPageModule { }

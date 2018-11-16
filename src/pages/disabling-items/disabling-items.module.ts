import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { DisablingItemsPage } from './disabling-items';

@NgModule({
    declarations: [
        DisablingItemsPage
    ],
    imports: [
        IonicPageModule.forChild(DisablingItemsPage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class DisablingItemsPageModule { }

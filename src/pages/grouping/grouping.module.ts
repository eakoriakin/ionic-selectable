import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { GroupingPage } from './grouping';

@NgModule({
    declarations: [
        GroupingPage
    ],
    imports: [
        IonicPageModule.forChild(GroupingPage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class GroupingPageModule { }

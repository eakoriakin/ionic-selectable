import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { GroupingVirtualScrollPage } from './grouping-virtual-scroll';

@NgModule({
    declarations: [
        GroupingVirtualScrollPage
    ],
    imports: [
        IonicPageModule.forChild(GroupingVirtualScrollPage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class GroupingVirtualScrollPageModule { }

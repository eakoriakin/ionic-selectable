import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { GroupTemplatePage } from './group-template';

@NgModule({
    declarations: [
        GroupTemplatePage
    ],
    imports: [
        IonicPageModule.forChild(GroupTemplatePage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class GroupTemplatePageModule { }

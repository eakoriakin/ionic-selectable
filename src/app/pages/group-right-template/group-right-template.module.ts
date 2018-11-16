import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { GroupRightTemplatePage } from './group-right-template';

@NgModule({
  declarations: [
    GroupRightTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(GroupRightTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class GroupRightTemplatePageModule { }

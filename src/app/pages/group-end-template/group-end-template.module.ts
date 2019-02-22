import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { GroupEndTemplatePage } from './group-end-template';

@NgModule({
  declarations: [
    GroupEndTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(GroupEndTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class GroupEndTemplatePageModule { }

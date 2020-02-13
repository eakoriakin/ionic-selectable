import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { IconTemplatePage } from './icon-template';

@NgModule({
  declarations: [
    IconTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(IconTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class IconTemplatePageModule { }

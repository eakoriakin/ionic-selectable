import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { TitleTemplatePage } from './title-template';

@NgModule({
  declarations: [
    TitleTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(TitleTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class TitleTemplatePageModule { }

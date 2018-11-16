import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { ValuesEllipsisTemplatePage } from './values-ellipsis-template';

@NgModule({
  declarations: [
    ValuesEllipsisTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(ValuesEllipsisTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class ValuesEllipsisTemplatePageModule { }

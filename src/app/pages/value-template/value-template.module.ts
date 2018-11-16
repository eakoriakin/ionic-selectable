import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { ValueTemplatePage } from './value-template';

@NgModule({
  declarations: [
    ValueTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(ValueTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class ValueTemplatePageModule { }

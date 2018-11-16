import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { PlaceholderTemplatePage } from './placeholder-template';

@NgModule({
  declarations: [
    PlaceholderTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(PlaceholderTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class PlaceholderTemplatePageModule { }

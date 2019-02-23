import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { ItemIconTemplatePage } from './item-icon-template';

@NgModule({
  declarations: [
    ItemIconTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(ItemIconTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class ItemIconTemplatePageModule { }

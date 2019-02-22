import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { ItemEndTemplatePage } from './item-end-template';

@NgModule({
  declarations: [
    ItemEndTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(ItemEndTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class ItemEndTemplatePageModule { }

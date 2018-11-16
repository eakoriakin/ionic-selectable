import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { ItemRightTemplatePage } from './item-right-template';

@NgModule({
  declarations: [
    ItemRightTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(ItemRightTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class ItemRightTemplatePageModule { }

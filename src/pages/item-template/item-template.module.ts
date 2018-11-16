import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { ItemTemplatePage } from './item-template';

@NgModule({
    declarations: [
        ItemTemplatePage
    ],
    imports: [
        IonicPageModule.forChild(ItemTemplatePage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class ItemTemplatePageModule { }

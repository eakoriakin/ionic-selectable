import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { MultipleValuesTemplatePage } from './multiple-values-template';

@NgModule({
    declarations: [
        MultipleValuesTemplatePage
    ],
    imports: [
        IonicPageModule.forChild(MultipleValuesTemplatePage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class MultipleValuesTemplatePageModule { }

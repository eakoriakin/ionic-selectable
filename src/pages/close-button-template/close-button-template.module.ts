import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { CloseButtonTemplatePage } from './close-button-template';

@NgModule({
    declarations: [
        CloseButtonTemplatePage
    ],
    imports: [
        IonicPageModule.forChild(CloseButtonTemplatePage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class CloseButtonTemplatePageModule { }

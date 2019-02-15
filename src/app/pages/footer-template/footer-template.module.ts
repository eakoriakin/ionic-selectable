import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { FooterTemplatePage } from './footer-template';

@NgModule({
  declarations: [
    FooterTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(FooterTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class FooterTemplatePageModule { }

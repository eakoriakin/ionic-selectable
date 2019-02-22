import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { HeaderTemplatePage } from './header-template';

@NgModule({
  declarations: [
    HeaderTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(HeaderTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class HeaderTemplatePageModule { }

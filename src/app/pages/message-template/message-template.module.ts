import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { MessageTemplatePage } from './message-template';

@NgModule({
  declarations: [
    MessageTemplatePage
  ],
  imports: [
    IonicPageModule.forChild(MessageTemplatePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class MessageTemplatePageModule { }

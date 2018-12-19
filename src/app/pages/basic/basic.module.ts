import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { BasicPage } from './basic';

@NgModule({
  declarations: [
    BasicPage
  ],
  imports: [
    IonicPageModule.forChild(BasicPage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class BasicPageModule { }

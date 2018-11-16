import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { MinMaxValidationPage } from './min-max-validation';

@NgModule({
  declarations: [
    MinMaxValidationPage
  ],
  imports: [
    IonicPageModule.forChild(MinMaxValidationPage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class MinMaxValidationPageModule { }

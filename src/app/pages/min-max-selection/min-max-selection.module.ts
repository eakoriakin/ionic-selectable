import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { MinMaxSelectionPage } from './min-max-selection';

@NgModule({
  declarations: [
    MinMaxSelectionPage
  ],
  imports: [
    IonicPageModule.forChild(MinMaxSelectionPage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class MinMaxSelectionPageModule { }

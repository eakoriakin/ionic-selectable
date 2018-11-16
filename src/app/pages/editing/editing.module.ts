import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { EditingPage } from './editing';

@NgModule({
  declarations: [
    EditingPage
  ],
  imports: [
    IonicPageModule.forChild(EditingPage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class EditingPageModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { EditingAsyncPage } from './editing-async';

@NgModule({
  declarations: [
    EditingAsyncPage
  ],
  imports: [
    IonicPageModule.forChild(EditingAsyncPage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class EditingAsyncPageModule { }

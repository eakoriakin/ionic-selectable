import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { LabelsPage } from './labels';

@NgModule({
  declarations: [
    LabelsPage
  ],
  imports: [
    IonicPageModule.forChild(LabelsPage),
    IonicSelectableModule
  ],
  entryComponents: [
    LabelsPage
  ]
})
export class LabelsPageModule { }

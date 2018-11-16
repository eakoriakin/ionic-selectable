import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { FindPortsPage } from './find-ports';

@NgModule({
  declarations: [
    FindPortsPage
  ],
  imports: [
    IonicPageModule.forChild(FindPortsPage),
    IonicSelectableModule
  ]
})
export class FindPortsPageModule { }

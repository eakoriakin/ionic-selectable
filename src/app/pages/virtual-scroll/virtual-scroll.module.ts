import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { VirtualScrollPage } from './virtual-scroll';

@NgModule({
  declarations: [
    VirtualScrollPage
  ],
  imports: [
    IonicPageModule.forChild(VirtualScrollPage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class VirtualScrollPageModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { InfiniteScrollPage } from './infinite-scroll';

@NgModule({
  declarations: [
    InfiniteScrollPage
  ],
  imports: [
    IonicPageModule.forChild(InfiniteScrollPage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class InfiniteScrollPageModule { }

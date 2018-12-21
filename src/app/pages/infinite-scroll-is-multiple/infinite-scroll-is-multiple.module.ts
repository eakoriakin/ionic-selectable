import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { InfiniteScrollIsMultiplePage } from './infinite-scroll-is-multiple';

@NgModule({
  declarations: [
    InfiniteScrollIsMultiplePage
  ],
  imports: [
    IonicPageModule.forChild(InfiniteScrollIsMultiplePage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class InfiniteScrollIsMultiplePageModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { OnSearchPage } from './on-search';

@NgModule({
  declarations: [
    OnSearchPage
  ],
  imports: [
    IonicPageModule.forChild(OnSearchPage),
    IonicSelectableModule,
    PipesModule
  ]
})
export class OnSearchPageModule { }

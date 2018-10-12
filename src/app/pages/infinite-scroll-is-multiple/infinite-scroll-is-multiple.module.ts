import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { InfiniteScrollIsMultiplePage } from './infinite-scroll-is-multiple.page';

const routes: Routes = [{
  path: '',
  component: InfiniteScrollIsMultiplePage
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InfiniteScrollIsMultiplePage
  ]
})
export class InfiniteScrollIsMultiplePageModule { }

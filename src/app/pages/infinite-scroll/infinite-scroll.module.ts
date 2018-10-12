import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { InfiniteScrollPage } from './infinite-scroll.page';

const routes: Routes = [{
  path: '',
  component: InfiniteScrollPage
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
    InfiniteScrollPage
  ]
})
export class InfiniteScrollPageModule { }

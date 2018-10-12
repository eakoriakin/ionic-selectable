import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { InsideModalPage } from './inside-modal.page';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [{
  path: '',
  component: InsideModalPage
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
    InsideModalPage,
    ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class InsideModalPageModule { }

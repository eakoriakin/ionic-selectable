import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { ValuesEllipsisTemplatePage } from './values-ellipsis-template.page';

const routes: Routes = [{
  path: '',
  component: ValuesEllipsisTemplatePage
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ValuesEllipsisTemplatePage]
})
export class ValuesEllipsisTemplatePageModule { }

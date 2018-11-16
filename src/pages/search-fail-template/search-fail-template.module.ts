import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from '../../pipes';
import { SearchFailTemplatePage } from './search-fail-template';

@NgModule({
    declarations: [
        SearchFailTemplatePage
    ],
    imports: [
        IonicPageModule.forChild(SearchFailTemplatePage),
        IonicSelectableModule,
        PipesModule
    ]
})
export class SearchFailTemplatePageModule { }

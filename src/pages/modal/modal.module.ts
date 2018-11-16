import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from '../../components/ionic-selectable/ionic-selectable.module';
import { ModalPage } from './modal';

@NgModule({
    declarations: [
        ModalPage
    ],
    imports: [
        IonicPageModule.forChild(ModalPage),
        IonicSelectableModule
    ]
})
export class ModalPageModule { }

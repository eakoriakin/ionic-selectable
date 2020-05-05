
import { CommonModule, DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule, APP_INITIALIZER, NgZone } from '@angular/core';
import { IonicSelectable } from './ionic-selectable.component';
import { appInitialize } from '../utils/app-initialize';
import { IonicSelectableValueAccessor } from '../utils/ionic-selectable-value-accessor';
import { IonicSelectableItemTemplateDirective } from '../directives/ionic-selectable-item-template.directive';
import { IonicSelectableAddItemTemplateDirective } from '../directives/ionic-selectable-add-item-template.directive';

const DECLARATIONS = [
  //Component
  IonicSelectable,
  //Value accesor
  IonicSelectableValueAccessor,
  //Directives,
  IonicSelectableAddItemTemplateDirective,
  IonicSelectableItemTemplateDirective
];
@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
    imports: [CommonModule]
  })
  export class IonicSelectableModule {
    static forRoot(): ModuleWithProviders<IonicSelectableModule> {
      return {
        ngModule: IonicSelectableModule,
        providers: [
          {
            provide: APP_INITIALIZER,
            useFactory: appInitialize,
            multi: true,
            deps: [
              DOCUMENT,
              NgZone
            ]
          }
        ]
      };
    }
  }
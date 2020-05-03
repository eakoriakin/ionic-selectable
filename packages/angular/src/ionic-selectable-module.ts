
import { CommonModule, DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule, APP_INITIALIZER, NgZone } from '@angular/core';
import { IonicSelectable } from './ionic-selectable';
import { appInitialize } from './app-initialize';
import { IonicSelectableValueAccessor } from './ionic-selectable-value-accessor';
import { IonicSelectableItemTemplateDirective } from './directives/ionic-selectable-item-template.directive';

@NgModule({
    declarations: [IonicSelectable, IonicSelectableValueAccessor, IonicSelectableItemTemplateDirective],
    exports: [IonicSelectable, IonicSelectableValueAccessor, IonicSelectableItemTemplateDirective],
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
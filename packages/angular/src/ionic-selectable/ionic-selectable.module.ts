
import { CommonModule, DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule, APP_INITIALIZER, NgZone } from '@angular/core';
import { IonicSelectable } from './ionic-selectable.component';
import { appInitialize } from '../utils/app-initialize';
import { IonicSelectableValueAccessor } from '../utils/ionic-selectable-value-accessor';
import { IonicSelectableItemTemplateDirective } from '../directives/ionic-selectable-item-template.directive';
import { IonicSelectableAddItemTemplateDirective } from '../directives/ionic-selectable-add-item-template.directive';
import { IonicSelectableCloseButtonTemplateDirective } from '../directives/ionic-selectable-close-button-template.directive';
import { IonicSelectableFooterTemplateDirective } from '../directives/ionic-selectable-footer-template.directive';
import { IonicSelectableGroupEndTemplateDirective } from '../directives/ionic-selectable-group-end-template.directive';
import { IonicSelectableGroupTemplateDirective } from '../directives/ionic-selectable-group-template.directive';
import { IonicSelectableHeaderTemplateDirective } from '../directives/ionic-selectable-header-template.directive';
import { IonicSelectableIconTemplateDirective } from '../directives/ionic-selectable-icon-template.directive';
import { IonicSelectableItemEndTemplateDirective } from '../directives/ionic-selectable-item-end-template.directive';
import { IonicSelectableItemIconTemplateDirective } from '../directives/ionic-selectable-item-icon-template.directive';
import { IonicSelectableMessageTemplateDirective } from '../directives/ionic-selectable-message-template.directive';
import { IonicSelectablePlaceholderTemplateDirective } from '../directives/ionic-selectable-placeholder-template.directive';
import { IonicSelectableSearchFailTemplateDirective } from '../directives/ionic-selectable-search-fail-template.directive';
import { IonicSelectableTitleTemplateDirective } from '../directives/ionic-selectable-title-template.directive';
import { IonicSelectableValueTemplateDirective } from '../directives/ionic-selectable-value-template.directive';

const DECLARATIONS = [
  //Component
  IonicSelectable,
  //Value accesor
  IonicSelectableValueAccessor,
  //Directives,
  IonicSelectableAddItemTemplateDirective,
  IonicSelectableCloseButtonTemplateDirective,
  IonicSelectableFooterTemplateDirective,
  IonicSelectableGroupEndTemplateDirective,
  IonicSelectableGroupTemplateDirective,
  IonicSelectableHeaderTemplateDirective,
  IonicSelectableIconTemplateDirective,
  IonicSelectableItemEndTemplateDirective,
  IonicSelectableItemIconTemplateDirective,
  IonicSelectableItemTemplateDirective,
  IonicSelectableMessageTemplateDirective,
  IonicSelectablePlaceholderTemplateDirective,
  IonicSelectableSearchFailTemplateDirective,
  IonicSelectableTitleTemplateDirective,
  IonicSelectableValueTemplateDirective
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
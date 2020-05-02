
import { CommonModule, DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { IonicSelectable } from './ionic-selectable';

@NgModule({
    declarations: [IonicSelectable],
    exports: [IonicSelectable],
    imports: [CommonModule]
  })
  export class IonicSelectableModule {
    static forRoot(): ModuleWithProviders<IonicSelectableModule> {
      return {
        ngModule: IonicSelectableModule,
      };
    }
  }
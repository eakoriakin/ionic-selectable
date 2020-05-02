
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
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
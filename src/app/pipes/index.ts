import { NgModule } from '@angular/core';
import { WikiUrlPipe } from './wiki-url.pipe';

const pipes = [WikiUrlPipe];

@NgModule({
  declarations: [pipes],
  imports: [],
  exports: [pipes]
})
export class PipesModule { }

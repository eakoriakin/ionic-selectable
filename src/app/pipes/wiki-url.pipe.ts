import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wikiUrl'
})
export class WikiUrlPipe implements PipeTransform {
  transform(memberName: string): any {
    return `https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#${memberName}`;
  }
}

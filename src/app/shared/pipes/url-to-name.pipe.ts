import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlToName',
})
export class UrlToNamePipe implements PipeTransform {
  transform(url: string, args?: any): any {
    const arrText = url.split('/');

    const newName =
      arrText[arrText.length - 2] + '/' + arrText[arrText.length - 1];
    return newName;
  }
}

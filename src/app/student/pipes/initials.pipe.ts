import { Pipe, PipeTransform } from '@angular/core';
import { SimpleStudent } from '../types/simple-student-type';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: SimpleStudent, ...args: any[]): string {
    if (args[0].hasOwnProperty('lastNameFirst') && args[0]['lastNameFirst']) {
      return value.lastName.charAt(0) + value.firstName!.charAt(0);
    }
    return value.firstName!.charAt(0) + value.lastName.charAt(0);
  }

}

import { isDate } from 'lodash';

export class DateHelper{
  
  static fromCSharpDate(input?: string|number|Date): Date{
    switch (typeof input) {
      case 'string':
        // /Date(0948120928140.....
        return new Date(Number(input.substr(6,13))); 
      case 'number':
        return new Date(Number(input));
      default:
        return input
    }
  }
}
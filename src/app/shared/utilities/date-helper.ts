import { DatePipe, registerLocaleData } from '@angular/common';
import localeID from '@angular/common/locales/id';

export class DateHelper {
	static singleton = new DateHelper();

	datePipe: DatePipe;

	constructor() {
		registerLocaleData(localeID);
		this.datePipe = new DatePipe('ID');
	}

  /**
   * Transform old Microsoft Date format (/Date(123....)/) to js Date 
   */
	static fromCSharpDate(input?: string | number | Date): Date {
		switch (typeof input) {
			case 'string':
				// /Date(0948120928140.....
				return new Date(parseInt(input.substr(6), 10));
			case 'number':
				return new Date(Number(input));
			default:
				return input;
		}
  }
  
	/**
	 * Transform js Date to old Microsoft Date format (/Date(123....)/)
	 */
	static toCSharpDate(input?: Date): string {
		return `/Date(${input.getTime()})/`;
	}

	/**
	 * Transform input into string with format
	 * @param input Date to transform, can be ISO number
	 * @param format By default uses yyyy-MM-dd
	 */
	static dateToInputFormat(input: Date | number, format?: string) {
		return DateHelper.singleton.datePipe.transform(input, format || 'yyyy-MM-dd');
	}
}

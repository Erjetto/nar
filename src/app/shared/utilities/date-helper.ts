import { DatePipe, registerLocaleData } from '@angular/common';
import localeID from '@angular/common/locales/id';

// Note: format in angular DatePipe
// 'Short'	'M/d/yy, h:mm a'
// 'Medium'	'MMM d, y, h:mm:ss a' 
// 'long'	'MMMM d, y, h:mm:ss a z' 
// 'full'	'EEEE, MMMM d, y, h:mm:ss a zzzz' 
// 'shortDate'	'M/d/yy' 
// 'mediumDate'	'MMM d, y'
// 'longDate'	'MMMM d, y'
// 'fullDate'	'EEEE, MMMM d, y' 
// 'shortTime'	'h:mm a' 
// 'mediumTime'	'h:mm:ss a' 
// 'longTime'	'h:mm:ss a z'
// 'fullTime'	'h:mm:ss a zzzz'

export class DateHelper {
  // 
	public static readonly DATETIME_LOCAL_FORMAT = 'yyyy-MM-ddTHH:mm:ss'
	public static readonly WEEKDAY_DATE_FORMAT = 'EEEE, MMM dd yyyy'
	public static readonly FULL_DATE_FORMAT = 'yyyy-MM-dd'
  public static readonly FULL_TIME_FORMAT = 'HH:mm:ss'
  
	public static readonly DMY_FORMAT = 'dd MMM yyyy'
	public static readonly MDY_FORMAT = 'MMM dd, yyyy'
  public static readonly YMD_FORMAT = 'yyyy MMM dd'
  
  public static readonly NORMAL_TIME_FORMAT = 'HH:mm'
  
  public static readonly TIME_DATE_FORMAT = 'HH:mm, dd MMM yyyy'


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
        // /Date(0948120928140.....)/
        //       ^ get numbers only
				return new Date(parseInt(input.substr(6), 10));
			case 'number':
				return new Date(Number(input));
			default:
				return input;
		}
	}

	/**
	 * Transform js Date to old Microsoft Date format (/Date(123....)/)
	 * @param input Date to transform, can be Date or string (yyyy-MM-dd)
	 */
	static toCSharpDate(input: Date | string): string {
		switch (typeof input) {
			case 'string':
				return `/Date(${new Date(input).getTime()})/`;
			default:
				return `/Date(${input.getTime()})/`;
		}
	}

	/**
	 * Transform input into string with format
	 * @param input Date to transform, can be ISO number
	 * @param format By default uses yyyy-MM-dd
	 */
	static dateToFormat(input: Date | number, format?: string) {
		return DateHelper.singleton.datePipe.transform(input, format || 'yyyy-MM-dd');
	}

	/**
	 * Get date difference in days
	 * `abs(a-b) / (1000*60*60*24)` -> ms to day
	 */
	static dateDiffInDays(a: Date, b: Date){
		return Math.abs(a.getTime() - b.getTime()) / 86400000;
	}
}

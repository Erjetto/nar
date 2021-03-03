import { RoleFlags } from './constants/role.constant';
import { isNumber, map, isEmpty, cloneDeep } from 'lodash';
import { DateHelper } from './utilities/date-helper';
import { environment } from 'src/environments/environment';
import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ClientPhase } from './models';

//#region Common methods or class unrelated to NAR backen
/**
 * Returns true if today (or specified date) is in date range
 * @param curr default is today
 */
export const dateInRange = (start: Date, end: Date, curr: Date = new Date()) => 
  start.getTime() < curr.getTime() && curr.getTime() < end.getTime()

/**
 * Clone a value into array to prevent object reference problem
 * @param value value to duplicate, if function: call it, if object, clone it
 * @param count amount
 */
export const arrayOfValue = (value: any, count: number) => {
	switch (typeof value) {
		case 'function':
			return Array(count)
				.fill(0)
				.map(() => value());
		case 'object':
			return Array(count)
				.fill(0)
				.map(() => cloneDeep(value));
		default:
			return Array(count)
				.fill(0)
				.map(() => value);
	}
};
/**
 * Adjust the controls amount in form array
 * @param arr the FormArray
 * @param count the adjusted number
 * @param formgroupFactory the method that is called to create the form group {value: [''], ...}
 * @param validators validator for the control
 */
export const adjustControlsInFormArray = (
	arr: FormArray,
	count: number,
  formgroupFactory?: () => any,
  validators?: ValidatorFn
) => {
	while (arr.length > count) {
		arr.removeAt(arr.length - 1);
  }
  
	while (arr.length < count) {
		if (formgroupFactory) arr.push(new FormGroup(formgroupFactory(), validators));
		else arr.push(new FormControl(null, validators));
	}
};

export const fileFormFactory = () => ({
  fileName: new FormControl(''),
  fileId: new FormControl(''),
});

/**
 * Template for most of downloadable item in NAR that uses FileId
 */
export const GetDownloadLinkFromFileId = (fileId: string): string =>
  `${environment.apiUrl}File.svc/GetFile/${fileId}`;
  
/**
 * Template for most of downloadable item in NAR
 */
export const GetMemoryFileLinkFromFileKey = (key: string): string =>
	`${environment.apiUrl}File.svc/GetMemoryFile/${key}`;

/**
 * Find Core training phase, if not found then return first phase
 * @param phases phases
 */
export const TryGetCoreTrainingPhase = (phases: ClientPhase[]): ClientPhase =>
phases.find((p) => p.Description.includes('Core')) ?? phases[0];


export const isEmptyGuid = (str: string): boolean => str === '00000000-0000-0000-0000-000000000000'

/**
 * Calculate the difference of two generations 
 * ex: `21-2 with 20-1 => 3 semester`
 * @returns number in semester
 */
export const genDifferenceInSemester = (gen1: string, gen2: string):number => 
	(+gen1.substr(0,2)) * 2 + (+gen1[3]) - ((+gen2.substr(0,2)) * 2 + (+gen2[3]))

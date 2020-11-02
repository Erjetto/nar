import { RoleFlags } from './constants/role.constant';
import { isNumber, map, isEmpty, cloneDeep } from 'lodash';
import { DateHelper } from './utilities/date-helper';
import { environment } from 'src/environments/environment';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ClientPhase } from './models';

//#region Common methods or class unrelated to NAR backen
/**
 * Returns true if today (or specified date) is in date range
 * @param curr default is today
 */
export const dateInRange = (start: Date, end: Date, curr: Date = new Date()) => 
  start.getTime() < curr.getTime() && curr.getTime() < end.getTime()

/**
 * Create array of duplicate value
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
 * @param formgroupFactory the method that is called to create the form group
 */
export const adjustControlsInFormArray = (
	arr: FormArray,
	count: number,
	formgroupFactory?: () => any
) => {
	while (arr.length > count) {
		arr.removeAt(arr.length - 1);
  }
  
	while (arr.length < count) {
		if (formgroupFactory) arr.push(new FormGroup(formgroupFactory()));
		else arr.push(new FormControl());
	}
};

/**
 * Template for most of downloadable item in NAR
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
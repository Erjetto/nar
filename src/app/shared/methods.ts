import { RoleFlags } from './constants/role.constant';
import { isEmpty as _isEmpty, cloneDeep as _cloneDeep, isArray } from 'lodash';
import { DateHelper } from './utilities/date-helper';
import { environment } from 'src/environments/environment';
import {
	AbstractControl,
	FormArray,
	FormControl,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';
import { ClientPhase } from './models';
import { MonoTypeOperatorFunction } from 'rxjs';

//#region Date
/**
 * Returns true if today (or specified date) is in date range
 * @param curr default is today
 */
export const dateInRange = (start: Date, end: Date, curr: Date = new Date()) =>
	start.getTime() < curr.getTime() && curr.getTime() < end.getTime();

//#endregion

//#region Array
/**
 * Clone a value into array to prevent object reference problem
 * @param value value to duplicate, if function: call it, if object, clone it
 * @param count amount
 */
export const arrayOfValue = (value: any | ((idx: number) => any), count: number) => {
	switch (typeof value) {
		case 'function':
			return Array(count)
				.fill(0)
				.map((_, idx) => value(idx));
		case 'object':
			return Array(count)
				.fill(0)
				.map(() => _cloneDeep(value));
		default:
			return Array(count)
				.fill(0)
				.map(() => value);
	}
};

/**
 * Create dict from array
 * @returns Object, ex: `{'T001': {}, 'T002': {}, ...}
 */
export const arrayToObject = (
	values: any[],
	keySelector: (_: any) => string,
	valueSelector: (_: any) => any = (value) => value
) =>
	values.reduce(
		(prev, curr) => ({
			...prev,
			[keySelector(curr)]: valueSelector(curr),
		}),
		{}
	);

/**
 * Create list dict from array
 * @returns Object, ex: `{'T001': [...], 'T002': [...], ...}
 */
export const arrayToListObject = (
	values: any[],
	keySelector: (_: any) => string,
	valueSelector: (_: any) => any = (value) => value
) =>
	values.reduce(
		(prev, curr) => ({
			...prev,
			[keySelector(curr)]: [
				...(prev[keySelector(curr)] !== undefined ? prev[keySelector(curr)] : []),
				valueSelector(curr),
			],
		}),
		{}
	);

//#endregion

//#region Object
/**
 * Enables nested attribute (ex: `{a:{b:{c:{d:10}}}}`) => `'b.c.d' => 10`.
 * @param data row data
 * @param prop ex: `attr.nestedAttr` => `data['attr']['nestedAttr']
 * @returns If `prop` is empty, then return data itself
 */
export const getDataWithProp = (data: any, prop: string) => {
	if (prop.indexOf('.') === -1) return data[prop];
	return prop.split('.').reduce((prev, curr) => (!!prev ? prev[curr] : ''), data) || data;
};
//#endregion

//#region FormControl
/**
 * Adjust the controls amount in form array
 * @param arr the FormArray
 * @param count the adjusted number
 * @param formgroupFactory the method that is called to create the form group {value: [''], ...}
 * @param validator validator for the control
 */
export const adjustControlsInFormArray = (
	arr: FormArray,
	count: number,
	formgroupFactory?: () => any,
	validator?: ValidatorFn
) => {
	while (arr.length > count) {
		arr.removeAt(arr.length - 1);
	}

	while (arr.length < count) {
		if (formgroupFactory) arr.push(new FormGroup(formgroupFactory(), validator));
		else arr.push(new FormControl(null, validator));
	}
};

export const fileFormFactory = (): any => ({
	fileName: new FormControl(''),
	fileId: new FormControl(''),
});

export const singleUploadForm = (requireValidation = false) =>
	new FormGroup(fileFormFactory(), requireValidation ? fileRequired : null);
//#endregion

//#region Download
/**
 * Template for most of downloadable item in NAR that uses FileId
 *
 */
export const GetDownloadLinkFromFileId = (fileId: string): string =>
	`${environment.apiUrl}File.svc/GetFile/${fileId}`;

/**
 * Template for most of downloadable item in NAR
 */
export const GetMemoryFileLinkFromFileKey = (key: string): string =>
	`${environment.apiUrl}File.svc/GetMemoryFile/${key}`;

//#endregion

//#region Calculator
/**
 * Find Core training phase, if not found then return first phase
 * @param phases phases
 */
export const TryGetCoreTrainingPhase = (phases: ClientPhase[]): ClientPhase =>
	phases.find((p) => p.Description.includes('Core')) ?? phases[0];

export const isEmptyGuid = (str: string): boolean => str === '00000000-0000-0000-0000-000000000000';

/**
 * Calculate the difference of two generations
 * ex: `21-2 with 20-1 => 3 semester`
 * @returns number in semester
 */
export const genDifferenceInSemester = (gen1: string, gen2: string): number =>
	+gen1.substr(0, 2) * 2 + +gen1[3] - (+gen2.substr(0, 2) * 2 + +gen2[3]);

export const numberDelimiter = (num: number, delimiter = '.'): string => {
	let str = '';
	while (num / 1000 > 0) {
		str = (num % 1000) + delimiter + str;
		num = Math.floor(num / 1000);
	}
	return str.substr(0, str.length - 1);
};

//#endregion

//#region Validation
/**
 * Use `_isEmpty` into every value in array because `[null,undefined]` is not considered empty.
 * Used in filter pipe
 * ex: `this.observable.pipe(filter(allValuesNotEmpty))`
 */
export const allValuesNotEmpty = (values: any[]): boolean => values.every((v) => !_isEmpty(v));

export const fileRequired = ({ value }: AbstractControl): ValidationErrors =>
	_isEmpty(value.fileId) ? { noFile: true } : null;
//#endregion

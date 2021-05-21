import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { isString as _isString } from 'lodash';
import { getDataWithProp } from '../../methods';

@Component({
	selector: 'rd-toggle-button-group',
	templateUrl: './toggle-button-group.component.html',
	styleUrls: ['./toggle-button-group.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonGroupComponent implements OnInit, OnChanges {
	@Input() items: any[] | any = [];
	@Input() activeEnum: any;

	// enum -> single object ({A=0,B=1,C=2}) => [A,B,C]
	// objects -> array of object
	@Input() itemType: 'strings' | 'enum' | 'objects' = 'strings';

	//#region If items are object
	@Input() enumProp = '';
	@Input() labelProp = '';
	//#endregion

	//#region Multiple toggle
	@Input() multiple = false; // Enables multi select
	@Input() activeEnums: any[];
	//#endregion

	@Output() toggle = new EventEmitter<string>();
	@Output() activeEnumsChange = new EventEmitter<any[]>();

	enums: any[] = []; // Processed items
	labels: string[] = []; // Processed labels

	constructor() {}

	ngOnInit(): void {}

	// If items are object, then get enum by prop
	ngOnChanges(changes: SimpleChanges) {
		const newEnums: any[] = changes['items']?.currentValue;
		if (newEnums) {
			switch (this.itemType) {
				case 'objects':
					this.enums = newEnums.map((e) => getDataWithProp(e, this.enumProp));
					this.labels = newEnums.map((e) => getDataWithProp(e, this.labelProp));
					break;
				case 'enum':
					this.labels = Object.keys(newEnums).filter((s) => isNaN(Number(s)));
					// Enum can be either number or string
					this.enums = this.labels.map(l => newEnums[l]);
					break;
				case 'strings':
					this.enums = this.labels = newEnums as string[];
					break;
			}
		}
	}

	toggleActiveEnum(newEnum) {
		console.log(this.activeEnums, newEnum);
		if (this.multiple) {
			if (this.isActive(newEnum)) 
				this.activeEnums = this.activeEnums.filter((s) => s !== newEnum);
			else 
				this.activeEnums = [...this.activeEnums, newEnum];

			this.toggle.emit(newEnum);
			this.activeEnumsChange.emit(this.activeEnums);

		} else {
			this.activeEnum = newEnum;
			this.toggle.emit(newEnum);
		}
	}

	isActive(toggledEnum) {
		if (this.multiple) return this.activeEnums.includes(toggledEnum);
		else return this.activeEnum === toggledEnum;
	}
}

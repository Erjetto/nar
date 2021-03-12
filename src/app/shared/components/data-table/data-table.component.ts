import { NullTemplateVisitor } from '@angular/compiler';
import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ContentChildren,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	SimpleChange,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { isString as _isString, sortBy as _sortBy } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortDirection } from '../../models';
import { TableColumnComponent } from './table-column.component';
import { TableHeaderComponent } from './table-header.component';

@Component({
	selector: 'rd-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements AfterContentInit, OnDestroy, OnChanges {
	@ContentChild(TableHeaderComponent) header: TableHeaderComponent;
	@ContentChildren(TableColumnComponent) columnList: QueryList<TableColumnComponent>;

	@Input() data: any[] = [];
	@Input() selectedValues: any[] = [];
	@Input() conditionalRowClass: any = {};

	@Input() selectable = false;
	@Input() multipleSelectable = false;
	@Input() sortable = false;

	@Input() fixedHeight = 0;

	@Input() sortColumn: TableColumnComponent = null;

	@Input() tableClass = 'table-sm table-striped table-hover text-center';
	@Input() noDataMessage = 'No data.';

	@Output() clickRow: EventEmitter<any> = new EventEmitter<any>();
	@Output() checkMultipleData: EventEmitter<any[]> = new EventEmitter<any[]>();
	@Output() sort: EventEmitter<TableColumnComponent> = new EventEmitter<TableColumnComponent>();

	doCheckAll: boolean;

	columns: TableColumnComponent[] = [];
	private destroyed$ = new Subject<void>();

	constructor(private changeDetector: ChangeDetectorRef) {}

	// Isi rd-data-table harus dibuat dulu supaya QueryList ngga kosong
	ngAfterContentInit(): void {
		this.columnList.changes.pipe(takeUntil(this.destroyed$)).subscribe((_) => {
			// columnList cannot be ngFor-ed, so move the value to columns
			this.columns = this.columnList.toArray();
			this.changeDetector.markForCheck();
		});

		this.checkMultipleData.pipe(takeUntil(this.destroyed$)).subscribe((_) => {
			this.changeDetector.markForCheck();
		})

		// If sorting is triggered
		this.sort.pipe(takeUntil(this.destroyed$)).subscribe((selectedCol) => {
			// Create arrow in column (asc or desc)
			selectedCol.sortState =
				selectedCol.sortState === '' ? 'ASC' : selectedCol.sortState === 'ASC' ? 'DESC' : 'ASC';

			// Change columns sort state
			this.columns = this.columns.map((col) => {
				col.sortState = col === selectedCol ? col.sortState : '';
				return col;
			});

			// Sort data
			this.data = _sortBy(this.data, selectedCol.prop);
			if (selectedCol.sortState === 'DESC') this.data = [...this.data.reverse()];

			this.sortColumn = selectedCol;

			this.changeDetector.markForCheck();
		});

		this.columns = this.columnList.toArray();

		// Do first sorting if set in component
		const firstSortedColumn = this.columns.find((col) => col.sortState !== '');
		if (!!firstSortedColumn) {
			firstSortedColumn.sortState = firstSortedColumn.sortState === 'ASC' ? 'DESC' : 'ASC';
			this.sortColumn = firstSortedColumn;
			this.sort.emit(firstSortedColumn);
		}
		
	}

	ngOnChanges(changes: SimpleChanges): void {
		const change: SimpleChange = changes['data'];
		if (change && change.currentValue && !!this.sortColumn) {
			this.data = _sortBy(this.data, this.sortColumn.prop);
			if (this.sortColumn.sortState === 'DESC') this.data = [...this.data.reverse()];
			this.changeDetector.markForCheck();
		}
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
	}

	get tableColSpan(): number {
		return this.columns.reduce((a, b) => a + b.colspan, 0) + (this.sortable ? 1 : 0);
	}

	onCheckAllChanged(event) {
		this.doCheckAll = event.target.checked;
		this.selectedValues = this.doCheckAll ? this.data : [];

		this.checkMultipleData.emit([...this.selectedValues]);
	}

	onClickRow(row: any) {
		this.clickRow.emit(row);
	}

	onCheckRow(evt, row){
		const target = this.selectedValues.indexOf(row);
		if(target === -1) this.selectedValues.push(row);
		else this.selectedValues.splice(target, 1);
		
		this.checkMultipleData.emit([...this.selectedValues]);
	}

	isRowSelected(row: any) {
		return this.selectedValues.indexOf(row) !== -1;
	}

	combineClass(one: { [key: string]: boolean }, two: { [key: string]: boolean } | string) {
		if (_isString(two)) return { ...one, [two]: true };
		else return { ...one, ...two };
	}
}
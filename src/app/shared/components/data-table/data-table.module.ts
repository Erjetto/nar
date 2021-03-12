import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { TableColumnComponent } from './table-column.component';
import { TableHeaderComponent } from './table-header.component';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColumnBodyTemplateComponent, ColumnHeaderTemplateComponent } from './table-template';
import { TableTemplateDirective } from './table-template.directive';

@NgModule({
	imports: [CommonModule, FontAwesomeModule],
	exports: [
		DataTableComponent,
		TableColumnComponent,
		TableHeaderComponent,
		ColumnBodyTemplateComponent,
		ColumnHeaderTemplateComponent,
		TableTemplateDirective
	],
	declarations: [
		DataTableComponent,
		TableColumnComponent,
		TableHeaderComponent,
		ColumnBodyTemplateComponent,
		ColumnHeaderTemplateComponent,
		TableTemplateDirective
	],
})
export class DataTableModule {
	constructor(library: FaIconLibrary) {
		library.addIcons(faSortUp, faSortDown, faSort);
	}
}

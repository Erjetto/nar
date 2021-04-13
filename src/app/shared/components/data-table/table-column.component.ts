import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { SortDirection } from '../../models';
import { TableTemplateDirective } from './table-template.directive';

@Component({
	selector: 'rd-table-column',
	template: '',
})
export class TableColumnComponent implements AfterContentInit {

	@Input() prop: string; // Also works for getter
	@Input() sortable = false; // Needs prop in order to be able to sort
	@Input() label = 'No Label';
	@Input() colspan = 1;
	@Input() columnClass: any | string;
	@Input() cellClass: any | string;
	@Input() sortState: SortDirection = '';
	@Input() width = 0;
  @Input() formulaFunction: (_:any) => string; // For custom value
  
  @ContentChildren(TableTemplateDirective) templates: QueryList<TableTemplateDirective>;
  headerTemplate: TemplateRef<any>;
  bodyTemplate: TemplateRef<any>;


	constructor() {}

  ngAfterContentInit(){
    this.templates.forEach(temp => {
      if(temp.name === 'header')
        this.headerTemplate = temp.template;
      else this.bodyTemplate = temp.template;
    })
  }

	get faIconArray() {
		return [
			'fas',
			this.isSortAscending ? 'sort-up' : this.isSortDescending ? 'sort-down' : 'sort',
		];
	}

	get isSortAscending() {
		return this.sortState === 'ASC';
	}

	get isSortDescending() {
		return this.sortState === 'DESC';
	}

	get isNotSorted() {
		return this.sortState === '';
	}
}

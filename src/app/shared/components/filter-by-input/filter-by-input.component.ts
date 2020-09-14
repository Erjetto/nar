import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
	selector: 'rd-filter-by-input',
	templateUrl: './filter-by-input.component.html',
	styleUrls: ['./filter-by-input.component.scss'],
})
export class FilterByInputComponent implements OnInit, OnDestroy {
	@Input() dataToBeFiltered: Observable<any>;
	@Input() filteredData: Subject<any>;
  @Input() filterProperty = '';
  @Input() doDeepFilter = false;
  @Input() doRemoveInDeepFilter = false;

	filterPropertyArr: string[] = [];
	destroyed$ = new Subject<void>();
	searchText$ = new BehaviorSubject<string>('');

	constructor() {}

	ngOnInit(): void {
		this.filterPropertyArr = this.filterProperty.split(',');

		combineLatest([this.searchText$, this.dataToBeFiltered])
			.pipe(takeUntil(this.destroyed$))
			.subscribe(([]) => {
        // PROBLEM: How to filter recursively with following customization:
        // 1. Able to choose certain property to filter
        // 2. Able to choose whether to remove object in array after first level of obj

        // QUESTION: Is this necessary?
        // let filteredData = cloneDeep(data) as any[];

        // filteredData = filteredData.filter(d => {
        //   return this.recursiveFilter(d, search);
        //   if(isObject(d)){
        //     let propName = ''
        //     for(propName in d){
        //       if((d[propName] + '').indexOf(search) !== -1) return true;
        //       if(isObject(d[propName]))
        //     }
        //   }
        // })
				// return this.filteredData.next(data);
			});
  }
  // recursiveFilter(d: any, search): boolean{
  //   if(isObject(d)){
  //     if(this.filterPropertyArr.length === 0){
  //       let propName = ''
  //       for(propName in d){
  //         // if(this.recursiveFilter(d[propName]) === false) ;
  //         if((d[propName] + '').indexOf(search) !== -1) return true;
  //       }
  //     }
  //     else {
  //       return this.filterPropertyArr.some( f => 
  //         (d[f] + '').indexOf(search) !== 1
  //       )

  //     }
  //   }
  //   return false;
  // }

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	onTypeSearch = (textChange$: Observable<string>) =>
		textChange$.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			tap((text) => this.searchText$.next(text))
		);
}

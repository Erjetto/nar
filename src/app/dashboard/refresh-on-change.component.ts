import { Subject } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import * as MainStateAction from '../shared/stores/main/main.action';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy} from '@angular/core';

export class RefreshOnChange implements OnDestroy{

  protected destroyed$: Subject<any> = new Subject();

  constructor(
    protected actionsSubject: ActionsSubject
  ){
		// this.actionsSubject
    // .pipe(
    //   ofType(MainStateAction.ChangeGeneration, MainStateAction.ChangeRole),
    //   takeUntil(this.destroyed$)
    // )
    // .subscribe((o) => this.reloadView(o.payload));
  }

  ngOnDestroy(): void{

  }

  reloadView(input:any){
    // Overrided in derived class

    // console.log('ReloadView from BaseComponent');
  }
}
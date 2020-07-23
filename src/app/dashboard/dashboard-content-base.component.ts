import { Subject } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import * as MainStateAction from '../shared/stores/main/main.action';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy} from '@angular/core';

export class DashboardContentBase implements OnDestroy{

  protected destroyed$: Subject<any> = new Subject();

  constructor(
    protected actionsSubject: ActionsSubject
  ){
		this.actionsSubject
    .pipe(
      ofType(MainStateAction.ChangeGeneration, MainStateAction.ChangeRole),
      takeUntil(this.destroyed$)
    )
    .subscribe((o) => this.reloadView());
  }

  ngOnDestroy(): void{
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  reloadView(){
    // get gen & role in MainState
  }
}
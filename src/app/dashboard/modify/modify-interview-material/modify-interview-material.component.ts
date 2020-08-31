import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
  selector: 'rd-modify-interview-material',
  templateUrl: './modify-interview-material.component.html',
  styleUrls: ['./modify-interview-material.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyInterviewMaterialComponent extends DashboardContentBase
implements OnInit, OnDestroy  {


	constructor(
		protected store: Store<IAppState>,
	) {
		super(store);
	}

  ngOnInit(): void {
  }

}

import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
  selector: 'rd-modify-material',
  templateUrl: './modify-material.component.html',
  styleUrls: ['./modify-material.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyMaterialComponent extends DashboardContentBase
implements OnInit, OnDestroy  {


	constructor(
		protected store: Store<IAppState>,
	) {
		super(store);
	}
  ngOnInit(): void {
  }

}

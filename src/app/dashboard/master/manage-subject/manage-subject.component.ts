import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { clone, max } from 'lodash';
import { Observable } from 'rxjs';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { IAppState } from 'src/app/app.reducer';
import { LeaderService } from 'src/app/shared/services/new/leader.service';
import { GeneralService } from 'src/app/shared/services/new/general.service';
import { ClientSubject, ClientPhase } from 'src/app/shared/models';
import * as fromMasterState from 'src/app/shared/stores/master/master.reducer';
import * as MasterStateAction from 'src/app/shared/stores/master/master.action';
import { filter, takeUntil, map, tap, first } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { NgModel } from '@angular/forms';

@Component({
	selector: 'rd-manage-subject',
	templateUrl: './manage-subject.component.html',
	styleUrls: ['./manage-subject.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSubjectComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public subjectsLoading$: Observable<boolean>;
	public subjects$: Observable<ClientSubject[]>;
	public phases$: Observable<ClientPhase[]>;
	// public phaseTypes$: Observable<any>;

	public subjects: ClientSubject[];

	public size = [
		{ key: 'byte', val: 1 },
		{ key: 'kB', val: 1024 },
		{ key: 'MB', val: 1024 * 1024 },
		{ key: 'GB', val: 1024 * 1024 * 1024 },
	];
	public currentSize = this.size[0];

	public phases: ClientPhase[];

	public currentPhase: ClientPhase;
	public editForm: ClientSubject;

	constructor(
		private leaderService: LeaderService,
		private generalService: GeneralService,
		private store: Store<IAppState>,
		action: ActionsSubject
	) {
		super(action);
	}
	ngOnInit(): void {
		// this.phases = MockData.GetPhasesCurrentGeneration.map(ClientPhase.fromJson);
		// this.subjects = MockData.GetSubjectListByPhase.map(ClientSubject.fromJson);
		// this.phaseTypes$ = this.store.pipe(select(fromMasterState.getPhaseTypes));
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.subjectsLoading$ = this.store.pipe(select(fromMasterState.isSubjectsLoading));

    this.subjects$.pipe(
      
    )
		this.phases$
			.pipe(
				filter((v) => !isEmpty(v)),
				takeUntil(this.destroyed$),
				map((v) =>
					this.store.dispatch(
						MasterStateAction.FetchSubjects({ phaseId: v[0].PhaseId })
					)
				),
				first() // temporary: only auto load in first reload
			)
			.subscribe();
	}

	reloadView() {
		this.store.dispatch(MasterStateAction.FetchPhases());
	}

	// refreshPhases(){
	//   this.generalService.GetPhasesCurrentGeneration().subscribe( res => {
	//     this.phases = res;
	//     this.currentPhase = res[0];
	//     this.refreshSubject();
	//   })
	// }

	// refreshSubject(){
	//   this.generalService.GetSubjects(this.currentPhase.PhaseId).subscribe( res => {

	//   })
	// }

	convertFileSize(size, currentInput: NgModel) {
		// val
		currentInput.control.setValue(
			max([(currentInput.value * this.currentSize.val) / size.val, 1])
		);
		this.currentSize = size;
	}

	onSelectSubject(subject) {
		this.editForm = clone(subject);
		this.currentSize = this.size[0];
	}

	// onChangePhaseType(phaseType) {
	//   // fetch phase
	// }

	onChangePhase(phase: ClientPhase) {
		this.store.dispatch(
			MasterStateAction.FetchSubjects({ phaseId: phase.PhaseId })
		);
	}

	onCancelEdit() {
		this.editForm = null;
	}
}

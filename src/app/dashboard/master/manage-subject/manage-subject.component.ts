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
import { MasterStateAction, fromMasterState } from 'src/app/shared/store-modules';
import { filter, takeUntil, map, tap, first } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { NgModel, NgForm } from '@angular/forms';
import { SymbolConstant } from 'src/app/shared/constants/symbol.constant';

@Component({
	selector: 'rd-manage-subject',
	templateUrl: './manage-subject.component.html',
	styleUrls: ['./manage-subject.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageSubjectComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public subjectListLoading$: Observable<boolean>;
	public subjects$: Observable<ClientSubject[]>;
	public phases$: Observable<ClientPhase[]>;
	// public phaseTypes$: Observable<any>;

	public subjects: ClientSubject[];

	readonly constant = {
		symbol: SymbolConstant,
	};

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
		protected store: Store<IAppState>,
	) {
		super(store);
	}

	ngOnInit(): void {
		this.phases$ = this.store.pipe(select(fromMasterState.getPhases));
		this.subjects$ = this.store.pipe(select(fromMasterState.getSubjects));
		this.subjectListLoading$ = this.store.pipe(
			select(fromMasterState.getMasterState),
			map((v) => v.loadingPhases || v.loadingSubjects)
		);

		// Auto fetch subject when fetched phase
		this.phases$
			.pipe(
				filter((v) => !isEmpty(v)),
				// takeUntil(this.destroyed$),
				map((v) => this.onChangePhase(v[0])),
				first() // Only in first fetch
			)
			.subscribe();
	}

	reloadView() {
		this.store.dispatch(MasterStateAction.FetchPhases());
	}

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

	onChangePhase(phase: ClientPhase) {
		this.store.dispatch(
			MasterStateAction.FetchSubjects({ phaseId: phase.PhaseId })
		);
	}

	onCreateSubject(form: NgForm) {
		const {
			subjectName,
			maxFileSize,
			selectFileSize,
			selectPhase,
			hasPresentation,
    } = form.value;
    
		this.store.dispatch(
			MasterStateAction.CreateSubject({
				name: subjectName,
				phaseId: selectPhase,
				value: hasPresentation,
				maxFileSize: maxFileSize * selectFileSize.val,
			})
		);
	}

	onCancelEdit() {
		this.editForm = null;
	}

	onSaveEdit() {}
}

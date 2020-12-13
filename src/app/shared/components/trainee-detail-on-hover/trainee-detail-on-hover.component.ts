import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	HostBinding,
	ElementRef,
	HostListener,
	ViewChild,
	TemplateRef,
	OnDestroy,
	AfterViewInit,
	ChangeDetectionStrategy,
} from '@angular/core';
import { ColorHelper } from '../../utilities/color-helper';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { isString as _isString } from 'lodash';
import { ClientNote, ClientTrainee, ClientTraineeData } from '../../models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { select, Store } from '@ngrx/store';
import { fromBinusianState, fromNoteState, NoteStateAction } from '../../store-modules';

@Component({
	selector: 'rd-trainee-detail-on-hover',
	templateUrl: './trainee-detail-on-hover.component.html',
	styleUrls: ['./trainee-detail-on-hover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TraineeDetailOnHoverComponent implements OnInit, OnDestroy, AfterViewInit {
	viewDateFormat = 'dd MMM yyyy, HH:mm:ss';

	@ViewChild('pop') popOver: NgbPopover;
	@Input() autoClose: boolean | string = 'outside';
	@Input() traineeId = '725bea16-ad0e-eb11-abcb-d8d385fcda38';
	@Input() numberOfComments = 7; // Jumlah comment yg dimunculkan

	destroyed$: Subject<void> = new Subject<void>();
	traineeDetail$: Observable<ClientTraineeData>;
	last5Notes$: Observable<ClientNote[]>;
	loadingViewTrainee$ = new BehaviorSubject<boolean>(false);

	constructor(private store: Store<IAppState>) {}

	ngOnInit() {}

	ngAfterViewInit(): void {
		this.traineeDetail$ = this.store.pipe(select(fromNoteState.getCurrentTraineeDetail));
		this.last5Notes$ = this.traineeDetail$.pipe(
			map((detail: ClientTraineeData) =>
        detail.Notes.length <= 5 
        ? detail.Notes 
        : [...detail.Notes].splice(detail.Notes.length - 5, 5)
			)
		);
		this.store
			.pipe(select(fromNoteState.isLoadingCurrentTraineeDetail))
			.pipe(takeUntil(this.destroyed$))
			.subscribe(this.loadingViewTrainee$);

		this.popOver.shown.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.store.dispatch(
				NoteStateAction.FetchTraineeDataForTrainer({ traineeId: this.traineeId })
			);
		});
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { MainStateEffects, VoteStateEffects, fromMasterState, BinusianStateAction, fromBinusianState } from 'src/app/shared/store-modules';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TopBottomVoteSchedule, ClientTrainee, ClientPhase } from 'src/app/shared/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'rd-top-bottom-vote',
  templateUrl: './top-bottom-vote.component.html',
  styleUrls: ['./top-bottom-vote.component.scss']
})
export class TopBottomVoteComponent
  extends DashboardContentBase
  implements OnInit, OnDestroy {
  
  phases$: Observable<ClientPhase>;

  voteSchedules$: Observable<TopBottomVoteSchedule>;
  trainees$: Observable<ClientTrainee>;

  voteForm = this.fb.group({
    voteScheduleId: [''],
    top: this.fb.array([]),
    bottom: this.fb.array([]),
  })

	constructor(
		protected store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private voteEffects: VoteStateEffects,
		private fb: FormBuilder
	) {
		super(store);
	}
  ngOnInit(): void {
    this.phases$ = this.store.pipe(fromMasterState.getPhases);
    this.trainees$ = this.store.pipe(fromBinusianState.getTrainees);

    this.phases$.pipe(takeUntil(this.destroyed$)).subscribe(phases => {
      this.store.dispatch(BinusianStateAction.FetchTraineesBy({
        phaseId: phases[0].PhaseId
      }))
    })
  }

}

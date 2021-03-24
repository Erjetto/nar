import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CoreTrainingPresentationQuestion, CoreTrainingPresentation } from '../../models';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';
import { fromMainState } from '../../store-modules';
import { first } from 'rxjs/operators';

@Component({
  selector: 'rd-presentation-question',
  templateUrl: './presentation-question.component.html',
  styleUrls: ['./presentation-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationQuestionComponent implements OnInit {
  @HostBinding('class') hostClass;

  @Input() presentation: CoreTrainingPresentation;
  @Input() question: CoreTrainingPresentationQuestion;
  // QUESTION: Will this be performance heavy? 
  // Should this be passed by parent? Too dependent?
  currentGenId$: Observable<string>;
  
  constructor(private store: Store<IAppState>){}

  ngOnInit(): void {
    this.currentGenId$ = this.store.pipe(select(fromMainState.getCurrentGenerationId), first());
    this.hostClass = 'row question-item question-' + this.question.Status;
  }

}

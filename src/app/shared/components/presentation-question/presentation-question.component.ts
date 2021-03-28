import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CoreTrainingPresentationQuestion, CoreTrainingPresentation } from '../../models';
import { Observable } from 'rxjs';
import { DateHelper } from '../../utilities/date-helper';

@Component({
	selector: 'rd-presentation-question',
	templateUrl: './presentation-question.component.html',
	styleUrls: ['./presentation-question.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationQuestionComponent implements OnInit {
	@HostBinding('class') hostClass;

	dateFormat = DateHelper.DMY_FORMAT + ' ' + DateHelper.NORMAL_TIME_FORMAT;

	@Input() presentation: CoreTrainingPresentation;
	@Input() question: CoreTrainingPresentationQuestion;

	questionLink$: Observable<string>;

	constructor() {}

	ngOnInit(): void {
    this.hostClass = 'row question-item question-' + this.question.Status;
	}

	get questionLink() {
		return [
			'/presentation',
			'question',
			this.presentation.GenerationId,
			this.presentation.TraineeId,
			this.question.Question.Id,
		];
	}
}

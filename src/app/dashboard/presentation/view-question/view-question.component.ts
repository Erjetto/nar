import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoreTrainingPresentation } from 'src/app/shared/models';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

@Component({
	selector: 'rd-view-question',
	templateUrl: './view-question.component.html',
	styleUrls: ['./view-question.component.scss'],
})
export class ViewQuestionComponent extends DashboardContentBase implements OnInit, OnDestroy {
	presentation: CoreTrainingPresentation;
	questionId: string;

	// NOTE: View Question Page can try get viewed question by:
	//     - passing data to component (find out how)
	//     - url param

	constructor(protected store: Store<IAppState>, private routeSnapshot: ActivatedRouteSnapshot) {
		super(store);
	}

	ngOnInit(): void {
		// tslint:disable-next-line: no-string-literal
		this.questionId = this.routeSnapshot.queryParams['QuestionId'];
	}
}

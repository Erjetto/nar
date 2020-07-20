import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SubcoCandidateQuestionModel, SubcoCandidateAnswerModel } from '../models';
import { of, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SubcoCandidateService {
	private baseUrl = environment.apiUrl + 'SubcoCandidate.svc/';

	private questionMockData = {
		GenerationId: '',
		Id: '',
    Questions: ['What is your name?', 'How are you?', 'asdf', 'asdf', 'asdf'],
  };
  // tslint:disable-next-line: max-line-length
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis tempora pariatur nam officia error aut nisi impedit expedita alias, maiores mollitia temporibus voluptatibus quae cum sapiente tenetur hic facilis necessitatibus.'
  private answersMockData = [
    new SubcoCandidateAnswerModel('1', '00000','RZ18-1', [this.lorem,this.lorem, this.lorem, this.lorem], new Date(), new Date()),
    new SubcoCandidateAnswerModel('1', '00000','ZR18-1', ['fdsa','fdsa'], new Date(), new Date()),
  ]

	constructor(protected httpClient: HttpClient) {}

	public getQuestionForCurrentGen(): Observable<any> {
		return of(this.questionMockData);
	}

	public getAnswersForCurrentGen(): Observable<any> {
		return of(this.answersMockData);
	}
}

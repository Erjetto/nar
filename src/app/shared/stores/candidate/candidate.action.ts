import { createAction, props } from '@ngrx/store';
import {
	SubcoCandidateQuestionModel,
	SubcoCandidateAnswerModel,
} from '../../models';

export const FetchQuestions = createAction('[CandidateState] FetchQuestions');
export const FetchAnswers = createAction('[CandidateState] FetchAnswers');

export const FetchQuestionsSuccess = createAction(
	'[CandidateState] FetchQuestionsSuccess',
	props<{ payload: SubcoCandidateQuestionModel }>()
);
export const FetchAnswersSuccess = createAction(
	'[CandidateState] FetchAnswersSuccess',
	props<{ payload: SubcoCandidateAnswerModel[] }>()
);

export const SaveQuestions = createAction(
	'[CandidateState] SaveQuestions',
	props<{ payload: string[] }>()
);

export const CreateSchedule = createAction(
	'[CandidateState] CreateSchedule',
	props<{ payload: string[] }>()
);
export const ViewSchedule = createAction(
	'[CandidateState] ViewSchedule',
	props<{ payload: SubcoCandidateAnswerModel }>()
);
export const UpdateSchedule = createAction(
	'[CandidateState] UpdateSchedule',
	props<{ payload: SubcoCandidateAnswerModel }>()
);

export const SaveQuestionSuccess = createAction(
	'[CandidateState] SaveQuestionSuccess'
);
export const UpdateScheduleSuccess = createAction(
	'[CandidateState] UpdateScheduleSuccess'
);

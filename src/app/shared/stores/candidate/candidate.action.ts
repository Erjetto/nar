import { createAction, props } from '@ngrx/store';
import {
	SubcoCandidateQuestionModel,
	SubcoCandidateAnswerModel,
} from '../../models';

export const FetchQuestions = createAction('[CandidateState] FETCH_QUESTIONS');
export const FetchAnswers = createAction('[CandidateState] FETCH_ANSWERS');

export const FetchQuestionsSuccess = createAction(
	'[CandidateState] FETCH_QUESTIONS_SUCCESS',
	props<{ payload: SubcoCandidateQuestionModel }>()
);
export const FetchAnswersSuccess = createAction(
	'[CandidateState] FETCH_ANSWERS_SUCCESS',
	props<{ payload: SubcoCandidateAnswerModel[] }>()
);

export const SaveQuestions = createAction(
	'[CandidateState] SAVE_QUESTIONS',
	props<{ payload: string[] }>()
);

export const CreateSchedule = createAction(
	'[CandidateState] CREATE_SCHEDULE',
	props<{ payload: string[] }>()
);
export const ViewSchedule = createAction(
	'[CandidateState] VIEW_SCHEDULE',
	props<{ payload: SubcoCandidateAnswerModel }>()
);
export const UpdateSchedule = createAction(
	'[CandidateState] UPDATE_SCHEDULE',
	props<{ payload: SubcoCandidateAnswerModel }>()
);

export const SaveQuestionSuccess = createAction(
	'[CandidateState] SAVE_QUESTIONS_SUCCESS'
);
export const UpdateScheduleSuccess = createAction(
	'[CandidateState] UPDATE_SCHEDULE_SUCCESS'
);

import { createAction, props } from '@ngrx/store';
import { SubcoCandidateQuestionModel, SubcoCandidateAnswerModel } from '../../models';

export const FetchQuestionsForCurrentGen = createAction(
	'[CandidateState] FetchQuestionsFetchQuestionsForCurrentGen'
);
export const FetchQuestionsById = createAction(
	'[CandidateState] FetchQuestionsById',
	props<{ questionId: string }>()
);
export const FetchAnswers = createAction('[CandidateState] FetchAnswers');
export const FetchCurrentUserAnswer = createAction('[CandidateState] FetchCurrentUserAnswer');

export const FetchQuestionsSuccess = createAction(
	'[CandidateState] FetchQuestionsSuccess',
	props<{ payload: SubcoCandidateQuestionModel }>()
);
export const FetchAnswersSuccess = createAction(
	'[CandidateState] FetchAnswersSuccess',
	props<{ payload: SubcoCandidateAnswerModel[] }>()
);
export const FetchTrainerAnswerSuccess = createAction(
	'[CandidateState] FetchTrainerAnswerSuccess',
	props<{ payload: SubcoCandidateAnswerModel[] }>()
);

export const SaveAnswers = createAction(
	'[CandidateState] SaveAnswers',
	props<{ answerId: string; answers: string[] }>()
);
export const SaveQuestions = createAction(
	'[CandidateState] SaveQuestions',
	props<{ questions: string[] }>()
);

export const CreateSchedule = createAction(
	'[CandidateState] CreateSchedule',
	props<{ schedules: SubcoCandidateAnswerModel[] }>()
);
export const ViewSchedule = createAction(
	'[CandidateState] ViewSchedule',
	props<{ payload: SubcoCandidateAnswerModel }>()
);
export const UpdateSchedule = createAction(
	'[CandidateState] UpdateSchedule',
	props<{
		answerId: string;
		startDate: Date;
		endDate: Date;
	}>()
);
export const DeleteSchedule = createAction(
	'[CandidateState] DeleteSchedule',
	props<{ answerId: string }>()
);

export const ExportAnswersToExcel = createAction('[CandidateState] ExportAnswersToExcel');

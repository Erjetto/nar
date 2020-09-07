import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, tap, mapTo } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import {
	ClientTrainee,
	ClientGeneration,
	TopBottomVoteSchedule,
	ClientSchedule,
	ClientSubject,
	ClientPhase,
	Role,
	ClientUserInRoles,
	ClientCaseTrainer,
	ClientUploadAnswer,
  SchedulePerWeek,
  Case,
} from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LeaderService {
	private baseUrl = environment.apiUrl + 'Leader.svc/';
	constructor(protected httpClient: HttpClient) {}

	public UpdateTraineeActive(data: {
		traineeId: string;
		isActive: boolean;
		reason: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public UpdateTraineeScore(data: {
		phaseId: string;
		traineeId: string;
		caseId: string;
		newScore: number;
		reason: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	// ClientTraineeBeeAttendanceOverall
	public GetOverall(data: {
		startDate: string;
		endDate: string;
	}): Observable<any> {
		return throwError('Not implemented yet');
	}

	public GetAllCaseBySubject(data: {
		subjectId: string;
	}): Observable<ClientCaseTrainer[]> {
		return throwError('Not implemented yet');
	}

	// RegisteredSchedule[]
	public GetRegisteredSchedule(data: { subjectId: string }): Observable<any[]> {
		return throwError('Not implemented yet');
	}

	public GetAllTraineeAnswer(data: {
		caseId: string;
	}): Observable<ClientUploadAnswer> {
		return throwError('Not implemented yet');
	}

	public CheckCurrentTrainee(data: {
		traineeList: string[];
	}): Observable<string[]> {
		return throwError('Not implemented yet');
	}

	public SaveSchedule(data: {
		subjectId: string;
		scheduleName: string;
		scheduleDates: string[];
		specificSchedule: string[];
		meetPerWeek: number;
		Variation: string;
	}): Observable<ClientSchedule[]> {
		return throwError('Not implemented yet');
	}

	public ChangeSelfRegisterOfSpecificSchedule(data: {
		scheduleId: string;
		flag: boolean;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
	}

	public GetDatesInSchedules(data: { scheduleId: string }): Observable<Date[]> {
		return throwError('Not implemented yet');
	}

	public GetSpecificScheduleRegistration(data: {
		scheduleId: string;
	}): Observable<SchedulePerWeek> {
		return throwError('Not implemented yet');
	}

	public UpdateCaseIncludingFile(data: {
		caseId: string;
		caseName: string;
		correctorNames: string[];
		traineeDays: string;
		trainerDays: string;
		fileId: string;
		scheduleDate: string;
	}): Observable<string[]> {
		return throwError('Not implemented yet');
	}

	public UpdateCase(data: {
		caseId: string;
		caseName: string;
		correctorNames: string[];
		traineeDays: string;
		trainerDays: string;
		scheduleDate: string;
	}): Observable<string[]> {
		return throwError('Not implemented yet');
  }

	public SaveCase(data: {
		fileId: string;
		subjectId: string;
		scheduleId: string;
		caseName: string;
		correctorNames: string[];
		traineeDays: string;
		trainerDays: string;
		scheduleDate: string;
	}): Observable<string[]> {
		return throwError('Not implemented yet');
  }

	public SaveMaterial(data: {
		fileId: string;
		subjectId: string;
		materialName: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public SaveHasPresentation(data: {
    subjectId: string;
    presentation: boolean;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public SaveFinalScore(data: {
    phaseId: string;
    subjectId: string;
    data: string[];
	}): Observable<string[]> {
		return throwError('Not implemented yet');
  }

	public GetFinalScore(data: {
    phaseId: string;
    subjectId: string;
	}): Observable<string[]> {
		return throwError('Not implemented yet');
  }

  // ClientTraineeInScheduleSpecific
	public GetTraineeScheduleSpecific(data: {
    phase: string;
    subject: string;
	}): Observable<any> {
		return throwError('Not implemented yet');
  }

	public UpdateMaterialWithFile(data: {
    subjectId: string;
    materialId: string;
    fileId: string;
    material: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public UpdateMaterialWithNoFile(data: {
    subjectId: string;
    materialId: string;
    material: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public UpdateMaterial(data: {
    subjectId: string;
    materialId: string;
    materialName: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public SaveGeneralAssistantRole(data: {
    value: string;
	}): Observable<string> {
		return throwError('Not implemented yet');
  }

	public DeleteSchedule(data: {
    scheduleId: string;
    reason: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public DeletePhase(data: {
    PhaseId: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public DeleteMaterial(data: {
    subjectId: string;
    materialId: string;
    reason: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public DeleteTraineeInSchedule(data: {
    ScheduleId: string;
    TraineeId: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

	public DeleteCase(data: {
    scheduleId: string;
    caseId: string;
    reason: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

  // QUESTION: Will passing Date work?
	public SaveTopBottomVoteSchedule(data: {
    scheduleName: string;
    startDate: Date;
    endDate: Date;
    voteCount: number;
    isForTrainer: boolean;
	}): Observable<TopBottomVoteSchedule> {
		return throwError('Not implemented yet');
  }

	public UpdateTopBottomVoteSchedule(data: {
    scheduleId: string;
    scheduleName: string;
    startDate: Date;
    endDate: Date;
    voteCount: number;
    isForTrainer: boolean;
	}): Observable<TopBottomVoteSchedule> {
		return throwError('Not implemented yet');
  }

	public DeleteTopBottomVoteSchedule(data: {
    scheduleId: string;
	}): Observable<boolean> {
		return throwError('Not implemented yet');
  }

  // ZipModel
	public GetAllTraineeAnswerByZip(data: {
    caseId: string;
    correctorId?: string;
	}): Observable<any> {
		return throwError('Not implemented yet');
  }


  //#region Get Data
  // SimpleTraineeData[]
	public GetTraineesSimpleData(): Observable<ClientTrainee[]> {
		return of(MockData.GetTraineesByPhase).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}
	public GetTraineesByPhase(data: {phaseId: string}): Observable<ClientTrainee[]> {
		return of(MockData.GetTraineesByPhase).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}

	public GetTraineesBySchedule(data: {scheduleId: string}): Observable<ClientTrainee[]> {
		return of(MockData.GetTraineesBySchedule).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}

	public GetGenerations(): Observable<ClientGeneration[]> {
		return of(MockData.GetGenerations).pipe(
			delay(500),
			map((r) => r.map(ClientGeneration.fromJson))
		);
	}

	public GetPhases(data: {generationId: string}): Observable<ClientGeneration[]> {
		return of(MockData.GetPhasesCurrentGeneration).pipe(
			delay(500),
			map((r) => r.map(ClientGeneration.fromJson))
		);
	}

	public GetTopBottomVoteSchedules(): Observable<TopBottomVoteSchedule[]> {
		return of(MockData.GetTopBottomVoteSchedules).pipe(
			delay(500),
			map((r) => r.map(TopBottomVoteSchedule.fromJson))
		);
	}

	public GetSchedules(data: {subjectId: string}): Observable<ClientSchedule[]> {
		return of(MockData.GetSchedules).pipe(
			delay(500),
			map((r) => r.map(ClientSchedule.fromJson))
		);
	}

	public GetCurrentSubject(data: {phaseId: string}): Observable<ClientSubject> {
		return of(MockData.GetCurrentSubject).pipe(
			delay(500),
			map((r) => ClientSubject.fromJson(r))
		);
	}

	public GetCase(data: {scheduleId: string}): Observable<Case[]> {
		return of(MockData.GetCase).pipe(
			delay(500),
			map((r) => r.map(Case.fromJson))
		);
	}

	public GetRoles(): Observable<Role[]> {
		return of(MockData.GetRoles).pipe(
			delay(500),
			map((r) => r.map(Role.fromJson))
		);
	}

	public GetUserInRoles(): Observable<ClientUserInRoles[]> {
		return of(MockData.GetUserInRoles).pipe(
			delay(500),
			map((r) => r.map(ClientUserInRoles.fromJson))
		);
	}

	public GetMaximumFileSize(): Observable<number> {
		return of(MockData.GetMaximumFileSize).pipe(delay(500));
	}

	public GetGeneralAssistantRole(): Observable<boolean> {
		return of(MockData.GetGeneralAssistantRole).pipe(delay(500));
	}
	//#endregion

	//#region Save
	public SaveGeneration(data: {
		generationName: string;
		semester: string;
		year: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'SaveGeneration', data)
		return of(true).pipe(delay(500));
	}

	// datas: ['CompSci, Assistant, 3, 150025626,...', ...]
	public SaveTraineesInGeneration(data: { datas: string[] }) {
		// return this.httpClient.post(this.baseUrl + 'SaveTraineesInGeneration', data)
		return of(true).pipe(delay(500));
	}

	// datas: ['1503251513, ar, T001', ...]
	public SaveChangeMemberType(data: { datas: string[] }) {
		// return this.httpClient.post(this.baseUrl + 'SaveChangeMemberType', data)
		return of(true).pipe(delay(500));
	}

	public SavePhase(data: {
		name: string;
		beginDate: string;
		endDate: string;
		type: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'SavePhase', data)
		return of(true).pipe(delay(500));
	}

	public SaveTraineesToPhase(data: {
		binusianNumbers: string[];
		phaseId: string;
		isAddToSchedule: boolean;
	}) {
		// Possible result -> array of existing error
		// return this.httpClient.post(this.baseUrl + 'SaveTraineesToPhase', data)
		return of(true).pipe(delay(500));
	}

	public SaveSubject(data: { name: string; phaseId: string; value: boolean }) {
		// return this.httpClient.post(this.baseUrl + 'SaveSubject', data)
		return of(true).pipe(delay(500));
	}

	public SaveMaximumFileSize(data: { fileSize: string; subjectId: string }) {
		// return this.httpClient.post(this.baseUrl + 'SaveMaximumFileSize', data)
		return of(true).pipe(delay(500));
	}

	public SaveSubjectDetail(data: { subjectId: string; value: boolean }) {
		// return this.httpClient.post(this.baseUrl + 'SaveSubjectDetail', data)
		return of(true).pipe(delay(500));
	}

	public SaveSpecificSchedule(data: {
		subjectId: string;
		scheduleType: string;
		scheduleCount: number;
		scheduleName: string;
		dataSchedule: any;
		start: string;
		end: string;
		excTrainee: string[];
	}) {
		// return this.httpClient.post(this.baseUrl + 'SaveSpecificSchedule', data) // checked
		return of(true).pipe(delay(500));
	}

	public SaveTraineesToSchedule(data: {
		binusianNumbers: string[]; // yyyy-mm-dd
		phaseId: string;
		subjectId: string;
		scheduleId: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'SaveTraineesToSchedule', data)
		return of(true).pipe(delay(500));
	}

	public SaveInterviewQuestions(data: {
		questionName: string;
		questions: string[];
	}) {
		// return this.httpClient.post(this.baseUrl + 'SaveInterviewQuestions', data)
		return of(true).pipe(delay(500));
	}

	public SaveUserInRoles(data: { userRoleId: string; userRoles: string[] }) {
		// return this.httpClient.post(this.baseUrl + 'SaveInterviewQuestions', data)
		return of(true).pipe(delay(500));
	}

	//#endregion

	//#region Update/Save Data

	public UpdateGeneration(data: {
		GenerationId: string;
		Description: string;
		Semester: string;
		Year: string;
	}): Observable<boolean> {
    // return throwError('Not implemented yet');
		return this.httpClient.post(this.baseUrl + 'UpdateGeneration', data).pipe(mapTo(true));
		return of(true).pipe(delay(500));
	}

	public UpdatePhase(data: {
		Description: string;
		EndDate: string;
		PhaseId: string;
		StartDate: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'UpdatePhase', data)
		return of(true).pipe(delay(500));
	}
	//#endregion

	//#region Delete

	public DeleteTraineeInPhase(data: { PhaseId: string; TraineeId: string }) {
		// return this.httpClient.post(this.baseUrl + 'DeleteTraineeInPhase', data)
		return of(true).pipe(delay(500));
	}

	public DeleteSubject(data: { subjectId: string }) {
		// return this.httpClient.post(this.baseUrl + 'DeleteSubject', data)
		return of(true).pipe(delay(500));
	}

	public DeleteAllSubjects() {
		// return this.httpClient.post(this.baseUrl + 'DeleteSubject', data)
		return of(true).pipe(delay(500));
	}

	public DeleteUserInRoles(data: { userInRoleId: string }) {
		// return this.httpClient.post(this.baseUrl + 'DeleteUserInRoles', data)
		return of(true).pipe(delay(500));
	}
	//#endregion
}

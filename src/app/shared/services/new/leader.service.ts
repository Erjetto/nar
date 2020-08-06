import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
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
} from '../../models';

@Injectable({
	providedIn: 'root',
})
export class LeaderService {
	private baseUrl = 'Leader.svc/';
	constructor(protected httpClient: HttpClient) {}

	//#region Get Data
	public GetTraineesByPhase(phaseId): Observable<ClientTrainee[]> {
		return of(MockData.GetTraineesByPhase).pipe(
			delay(500),
			map((r) => r.map(ClientTrainee.fromJson))
		);
	}

	public GetTraineesBySchedule(scheduleId): Observable<ClientTrainee[]> {
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

	public GetTopBottomVoteSchedules(): Observable<TopBottomVoteSchedule[]> {
		return of(MockData.GetTopBottomVoteSchedules).pipe(
			delay(500),
			map((r) => r.map(TopBottomVoteSchedule.fromJson))
		);
	}

	public GetSchedules(subjectId): Observable<ClientSchedule[]> {
		return of(MockData.GetSchedules).pipe(
			delay(500),
			map((r) => r.map(ClientSchedule.fromJson))
		);
	}

	public GetCurrentSubject(phaseId): Observable<ClientSubject> {
		return of(MockData.GetCurrentSubject).pipe(
			delay(500),
			map((r) => ClientSubject.fromJson(r))
		);
	}

	public GetCase(scheduleId): Observable<ClientPhase[]> {
		return of(MockData.GetCase).pipe(
			delay(500),
			map((r) => r.map(ClientPhase.fromJson))
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

	//#region Update/Save Data
	// function Gen_EditGen(id, genid) {
	//   var GenId = genid;
	//   var Description = $('#Gen_Edit_TxtName_' + id).val().trim();
	//   var Semester = $('#Gen_Edit_TxtSemester_' + id).val().trim();
	//   var Year = $('#Gen_Edit_TxtYear_' + id).val().trim();
	//   if (Description == '' || Semester == '' || Year == '') {
	//       message('#Gen_EditMessage', 'fail', 'All fields must be filled');
	//   }
	//   else {
	//       var method = 'UpdateGeneration';
	//       var param = { GenerationId: GenId, Description: Description, Semester: Semester, Year: Year };
	//       invoke('Leader', method, param, '#Gen_EditMessage', 'Updating generation...', function (result) {
	//           if (result) {
	//               message('#Gen_EditMessage', 'success', 'Updating generation successfully');
	//               getGenerations();
	//           } else {
	//               message('#Gen_EditMessage', 'fail', 'Updating generation failed');
	//           }
	//       }, function (res) {
	//           message('#Gen_EditMessage', 'fail', 'Updating generation failed. Error: <br/>' + JSON.stringify(res));
	//       });
	//   }
	// }
	public UpdateGeneration(data: {
		GenerationId: string;
		Description: string;
		Semester: string;
		Year: string;
	}): Observable<boolean> {
		// return this.httpClient.post(this.baseUrl + 'UpdateGeneration', data)
		return of(true).pipe(delay(500));
	}
	// function setGeneration() {
	// 	var txtadd = $('#AstSpv_Generation_TxtAdd').val();
	// 	var smt = $('input:radio[name=AstSpv_Generation_semester]:checked').val();
	// 	var yr = $("#AstSpv_Generation_year").val();

	// 	if (txtadd == '') message('#AstSpv_Generation_MsgAdd', 'fail', 'Generation name must be filled.');
	// 	else if (yr == '') message('#AstSpv_Generation_MsgAdd', 'fail', 'Year must be filled.');
	// 	else if (isNaN(yr)) message('#AstSpv_Generation_MsgAdd', 'fail', 'Year must be numeric.');
	// 	else {
	// 		invoke('Leader', 'SaveGeneration', { generationName: txtadd, semester: smt, year: yr },
	// '#AstSpv_Generation_MsgAdd', 'Adding new generation to server...', function (result) {
	// 			getGenerations();
	// 			$("#AstSpv_Generation_TxtAdd").val("");
	// 		}, function (res) {
	// 			message('#AstSpv_Generation_MsgAdd', 'fail', 'Adding new generation failed.' + res);
	// 		});
	// 	}
	// }
	public SaveGeneration(data: {
		generationName: string;
		semester: string;
		year: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'SaveGeneration', data)
		return of(true).pipe(delay(500));
	}

	// function Phase_savePhase() {
	// 	var desc = $('#AS_Phase_desc').val().trim(),
	// 		begin = $('#AS_Phase_beginDate').val().trim(),
	// 		end = $('#AS_Phase_endDate').val().trim(),
	// 		phaseType = $('#AS_Phase_type').val();
	// 	if (desc == '' || begin == '' || end == '') {
	// 		message('#AS_Phase_insertMessage', 'fail', 'All fields must be filled');
	// 	}
	// 	else {
	// 	    invoke('Leader', 'SavePhase', { name: desc, beginDate: begin, endDate: end, type: phaseType },
	// '#AS_Phase_insertMessage', 'Saving Phase data to server', function (result) {
	// 			if (result) {
	// 				message('#AS_Phase_insertMessage', 'success', 'Phase data has been saved');
	// 				$('#AS_Phase_desc').val('');
	// 				$('#AS_Phase_beginDate').val('');
	// 				$('#AS_Phase_endDate').val('');
	// 				Phase_getPhaseList();
	// 			}
	// 			else {
	// 				message('#AS_Phase_insertMessage', 'fail', 'Saving Phase data failed');
	// 			}
	// 		}, function (res) {
	// 			message('#AS_Phase_insertMessage', 'fail', 'Saving Phase data failed. <b>Error: </b><br />' + JSON.stringify(res));
	// 		}, ['#AS_Phase_btnInsert', '#AS_Phase_desc', '#AS_Phase_beginDate', '#AS_Phase_endDate']);
	// 	}
	// }
	public SavePhase(data: {
		name: string;
		beginDate: string;
		endDate: string;
		type: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'SavePhase', data)
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

	// function Phase_saveTraineeToPhase() {
	// 	var phase = $('#AS_Phase_phase').val(),
	// 		trns = $('#AS_Phase_trainees').val(),
	// 	    isAddToSchedule = $('#AS_Phase_addTraineeToSchedule').attr('checked') == "checked";

	// 	message('#AS_Phase_getPhaseSelMessage', '', '');
	// 	message('#AS_Phase_mapMessage', '', '');
	// 	var err = 0;
	// 	if (phase == null) {
	// 	    message('#AS_Phase_getPhaseSelMessage', '', '');
	// 	    err = 1;
	// 	}
	// 	if (trns == '') {
	// 	    message('#AS_Phase_mapMessage', 'fail', 'Trainee field must be filled');
	// 	    err = 1;
	// 	}
	// 	if(err == 0) {
	// 		trns = trns.replace(/\r\n/g, '\n').split('\n');
	// 		invoke('Leader', 'SaveTraineesToPhase', { binusianNumbers: trns, phaseId: phase, isAddToSchedule: isAddToSchedule },
	// '#AS_Phase_mapMessage', 'Saving Trainees in Phase to server', function (result) {
	// 			if (result != null && result.length == 0) {
	// 				$('#AS_Phase_trainees').val('');
	// 				message('#AS_Phase_mapMessage', 'success', 'Trainees have been saved in this Phase with no error');
	// 			}
	// 			else if (result == null) {
	// 				message('#AS_Phase_mapMessage', 'fail', 'Saving Trainees in Phase failed');
	// 			}
	// 			else if (result.length > 0 && result.length < trns.length) {
	// 				$('#AS_Phase_trainees').val('');
	// 				var err = result.toString().replace(/,/g, '<br />');
	// 				message('#AS_Phase_mapMessage', 'fail', 'Trainees have been saved with error: <br />' + err);
	// 			}
	// 			else if (result.length > 0 && result.length == trns.length) {
	// 				var err = result.toString().replace(/,/g, '<br />');
	// 				message('#AS_Phase_mapMessage', 'fail', 'There is no trainee saved, error: <br />' + err);
	// 			}
	// 		}, function (res) {
	// 			message('#AS_Phase_mapMessage', 'fail', 'Saving Trainees in Phase failed. <b>Error: </b><br />' + JSON.stringify(res));
	// 		}, [ '#AS_Phase_btnMap', '#AS_Phase_phase', '#AS_Phase_trainees' ]);
	// 	}
	// }
	public SaveTraineesToPhase(data: {
		binusianNumbers: string;
		phaseId: string;
		isAddToSchedule: boolean;
	}) {
		// return this.httpClient.post(this.baseUrl + 'SaveTraineesToPhase', data)
		return of(true).pipe(delay(500));
  }
//   function Phtrn_delete(trnId) {
//     var method = 'DeleteTraineeInPhase';
//     var param = { PhaseId: $('#AS_Phase_phase1').val(), TraineeId: trnId };
//     invoke('Leader', method, param, '#Phtrn_editMessage', 'Delete Trainee in Phase...', function (result) {
//         if (result) {
//             message('#Phtrn_editMessage', 'success', 'Deleting Trainee in Phase succeeded');
//             Phtrn_showconf(trnId, false);
//             Phase_getTraineesList();
//         }
//         else {
//             message('#Phtrn_editMessage', 'fail', 'Deleting Trainee in Phase failed');
//         }
//     }, function (res) {
//         message('#Phtrn_editMessage', 'fail', 'Deleting Trainee in Phase failed. Error: <br/>' + JSON.stringify(res));
//     });
// }
	public DeleteTraineeInPhase(data: {
		PhaseId: string;
		TraineeId: string;
	}) {
		// return this.httpClient.post(this.baseUrl + 'DeleteTraineeInPhase', data)
		return of(true).pipe(delay(500));
	}
	//#endregion
}

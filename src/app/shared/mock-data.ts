
export const MockData = {
	//#region General.svc
	GetPhasesCurrentGeneration: [
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1594573200000+0700)/',
			Description: 'Core Training',
			EndDate: '/Date(1597251600000+0700)/',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1591549200000+0700)/',
			Description: 'Interview',
			EndDate: '/Date(1592586000000+0700)/',
			PhaseId: 'dd64f206-c4a0-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1589216400000+0700)/',
			Description: 'Presentation',
			EndDate: '/Date(1589734800000+0700)/',
			PhaseId: 'a2196d78-f294-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1584896400000+0700)/',
			Description: 'Pre-Training',
			EndDate: '/Date(1589216400000+0700)/',
			PhaseId: '89c39d0a-2568-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
	],

	// type: "ar"
	GetPhasesCurrentGenerationWithType: [
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1594573200000+0700)/',
			Description: 'Core Training',
			EndDate: '/Date(1597251600000+0700)/',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1591549200000+0700)/',
			Description: 'Interview',
			EndDate: '/Date(1592586000000+0700)/',
			PhaseId: 'dd64f206-c4a0-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1589216400000+0700)/',
			Description: 'Presentation',
			EndDate: '/Date(1589734800000+0700)/',
			PhaseId: 'a2196d78-f294-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1584896400000+0700)/',
			Description: 'Pre-Training',
			EndDate: '/Date(1589216400000+0700)/',
			PhaseId: '89c39d0a-2568-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
	],

	GetMessageCurrentGeneration: [
		{
			__type: 'Message:#BPlusTraining.Logic',
			FileId: '00000000-0000-0000-0000-000000000000',
			FileName: '',
			Generation: '20-2',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			HasFile: false,
			InsertBy: {
				__type: 'Binusian:#BPlusTraining.Logic',
				Name: 'NS17-1',
				UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
			},
			InsertOn: '/Date(1594697184702+0700)/',
			MemberType: 'ar',
			MessageId: '11845d60-1c60-4578-ae9c-7ff4b99eb60e',
			Note:
				'Trainee Book & Acquaintance Form\nhttp://tiny.cc/list-link-nar20-2\n<br><br>\nTraining Room\nhttps://binus.zoom.us/j/98468227452?pwd=Z2FiRTJ6MkNzUVFpNVRWUkZoSXM0Zz09',
			Title: 'List Link',
		},
	],

	// phaseId: "40cb12af-3db5-ea11-abcb-d8d385fcda38"
	GetStatisticTrainee: [
		{
			__type: 'ClientStatistic:#BPlusTraining.Logic',
			Detail: [
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 7,
					Description: 'Female',
				},
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 21,
					Description: 'Male',
				},
			],
			Total: 28,
			Type: 'Gender',
		},
		{
			__type: 'ClientStatistic:#BPlusTraining.Logic',
			Detail: [
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 20,
					Description: '0',
				},
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 8,
					Description: '2',
				},
			],
			Total: 28,
			Type: 'Semester',
		},
		{
			__type: 'ClientStatistic:#BPlusTraining.Logic',
			Detail: [
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 28,
					Description: '',
				},
			],
			Total: 28,
			Type: 'Information Source',
		},
		{
			__type: 'ClientStatistic:#BPlusTraining.Logic',
			Detail: [
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 8,
					Description: 'Business Information Technology',
				},
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 18,
					Description: 'Computer Science',
				},
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 1,
					Description: 'Cyber Security',
				},
				{
					__type: 'ClientStatisticDetail:#BPlusTraining.Logic',
					Count: 1,
					Description: 'Information Systems',
				},
			],
			Total: 28,
			Type: 'Major',
		},
	],
  
  GetSubjects: [
    {
      "__type": "ClientSubject:#BPlusTraining.Logic",
      "HasPresentation": true,
      "Name": "Web Design",
      "Phase": null,
      "SubjectId": "5678790f-3eb5-ea11-abcb-d8d385fcda38"
    },
    {
      "__type": "ClientSubject:#BPlusTraining.Logic",
      "HasPresentation": true,
      "Name": "Java",
      "Phase": null,
      "SubjectId": "aa349105-3eb5-ea11-abcb-d8d385fcda38"
    },
    {
      "__type": "ClientSubject:#BPlusTraining.Logic",
      "HasPresentation": true,
      "Name": "PHP",
      "Phase": null,
      "SubjectId": "5878790f-3eb5-ea11-abcb-d8d385fcda38"
    },
    {
      "__type": "ClientSubject:#BPlusTraining.Logic",
      "HasPresentation": true,
      "Name": "Laravel",
      "Phase": null,
      "SubjectId": "5a78790f-3eb5-ea11-abcb-d8d385fcda38"
    },
    {
      "__type": "ClientSubject:#BPlusTraining.Logic",
      "HasPresentation": true,
      "Name": "C",
      "Phase": null,
      "SubjectId": "4ed03bfd-3db5-ea11-abcb-d8d385fcda38"
    },
    {
      "__type": "ClientSubject:#BPlusTraining.Logic",
      "HasPresentation": true,
      "Name": "Database",
      "Phase": null,
      "SubjectId": "50d03bfd-3db5-ea11-abcb-d8d385fcda38"
    },
    {
      "__type": "ClientSubject:#BPlusTraining.Logic",
      "HasPresentation": true,
      "Name": "OS",
      "Phase": null,
      "SubjectId": "ac349105-3eb5-ea11-abcb-d8d385fcda38"
    }
  ],
	//#endregion

	//#region TraineeAttendance.svc

	// date: "2020-07-29"
	GetTraineeAttendances: {
		__type: 'ClientTraineeAttendanceReport:#BPlusTraining.Logic',
		AttendanceSummary: {
			__type: 'ClientTraineeAttendanceSummary:#BPlusTraining.Logic',
			AbsentCount: 3,
			AbsentQuitCount: 0,
			AttendCount: 11,
			PermissionCount: 0,
		},
		Attendances: [
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '7de1e83a-6ae5-44f6-a6f9-c7fd74bf6014',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980433114+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T031',
				TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Lionel Ritchie',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '5caeacd5-645c-4ad0-8c9f-3301a78cb7ff',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980751747+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T035',
				TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Jonathan Ronald Honggo',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: 'b562a205-7706-4432-adf6-7c822e968ad0',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980611449+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T040',
				TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Vincent Benedict',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: 'da9b3712-bf84-4f9d-94a4-f21f5e0b99ed',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Late',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980827232+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T044',
				TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Erwin',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '38b1d58f-a967-4527-9b11-331f1deda3bd',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980601889+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T048',
				TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Felix Novando',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: 'da5286a9-392c-41c3-89ee-0022656e13da',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980587004+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T057',
				TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Johanes Peter Vincentius',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '18d05f7c-1ecc-4c14-895d-173646fba9b5',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980590404+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T059',
				TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'David',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '916dff3e-2bd4-475e-af77-8d286c725f7b',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980406935+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T080',
				TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Bryan Takari',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: [
					{
						__type: 'ClientTraineeAttendanceDetail:#BPlusTraining.Logic',
						AttendanceDate: '/Date(1595980941229+0700)/',
						Reason: 'Masalah dengan ortu',
					},
				],
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '2ccdcfd0-7304-4eb6-b9dd-3f0a2eab1de5',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: 'Ijin ada masalah dengan ortu',
					NoteOut: null,
					StatusAbsentIn: 'Permission',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595982010819+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T082',
				TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Stanley Dave Teherag',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: 'c049c427-4f50-4585-9aa1-80c5a1d4bcc9',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980158105+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T084',
				TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Thaddeus Cleo',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: 'e84c6f5b-3b54-455f-9515-05f32fc1f7c6',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980258331+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T088',
				TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Brandon Julio Thenaro',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: 'bfccaf92-d51b-4129-a4af-0bf12ea5d842',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980557691+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T089',
				TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Skolastika Gabriella Theresandia Prasetyo',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: null,
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: 'ba507347-932d-4d72-9665-f64b73c93c6d',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Present',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595980123080+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T116',
				TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Clarissa Chuardi',
			},
			{
				__type: 'ClientTraineeAttendance:#BPlusTraining.Logic',
				AttendanceTimePermission: [
					{
						__type: 'ClientTraineeAttendanceDetail:#BPlusTraining.Logic',
						AttendanceDate: '/Date(1595982724387+0700)/',
						Reason: 'mati lampu',
					},
				],
				FulldayPermission: false,
				IsActive: true,
				LecturerSchedule: null,
				Rest: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: 'Absent',
					StatusAbsentOut: 'Absent',
					TimeIn: '13:00',
					TimeOut: '12:00',
					TraineeIn: null,
					TraineeOut: null,
				},
				Room: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '759cc024-aee1-4eb9-8918-e8c00d24a916',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: 'Ijin karena mati lampu',
					NoteOut: null,
					StatusAbsentIn: 'Permission',
					StatusAbsentOut: 'Absent',
					TimeIn: '7:00',
					TimeOut: '18:00',
					TraineeIn: '/Date(1595982712000+0700)/',
					TraineeOut: null,
				},
				Secretariat: {
					__type: 'ClientTraineeAttendanceTimeDetail:#BPlusTraining.Logic',
					AttendanceIdIn: '00000000-0000-0000-0000-000000000000',
					AttendanceIdOut: '00000000-0000-0000-0000-000000000000',
					NoteIn: null,
					NoteOut: null,
					StatusAbsentIn: null,
					StatusAbsentOut: null,
					TimeIn: null,
					TimeOut: null,
					TraineeIn: null,
					TraineeOut: null,
				},
				TraineeCode: 'T117',
				TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Veronica',
			},
		],
		FinalizedBy: null,
		FinalizedDate: null,
		IsAlreadyFinalize: false,
		TransactionDate: '/Date(1595955600000+0700)/',
	},

	// sdate: "2020-07-29"
	GetEvaluation: {
		__type: 'ClientEvaluation:#BPlusTraining.Logic',
		AbsentNote: [
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T059',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'David',
					TraineeNumber: '2301868491',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T057',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Johanes Peter Vincentius',
					TraineeNumber: '2301864461',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T031',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Lionel Ritchie',
					TraineeNumber: '2301846212',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T088',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Brandon Julio Thenaro',
					TraineeNumber: '2301885466',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T089',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Skolastika Gabriella Theresandia Prasetyo',
					TraineeNumber: '2301886323',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T084',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Thaddeus Cleo',
					TraineeNumber: '2301878403',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T080',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Bryan Takari',
					TraineeNumber: '2301877880',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'Permission|07:20:10|In',
				RoomNote: 'Ijin ada masalah dengan ortu',
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T082',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Stanley Dave Teherag',
					TraineeNumber: '2301878012',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T048',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Felix Novando',
					TraineeNumber: '2301859543',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'Permission|07:31:52|In',
				RoomNote: 'Ijin karena mati lampu',
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T117',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Veronica',
					TraineeNumber: '2301941611',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T116',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Clarissa Chuardi',
					TraineeNumber: '2301941366',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T035',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Jonathan Ronald Honggo',
					TraineeNumber: '2301848956',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'Late|07:00:27|In',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T044',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Erwin',
					TraineeNumber: '2301856592',
				},
			},
			{
				__type: 'AbsentNote:#BPlusTraining.Logic',
				FulldayPermission: false,
				Rest: 'notDone|notDone',
				RestNote: null,
				Room: 'done|notDone',
				RoomNote: null,
				Secretariat: 'notDone|notDone',
				SecretariatNote: null,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: true,
					TraineeCode: 'T040',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Vincent Benedict',
					TraineeNumber: '2301855822',
				},
			},
		],
		EvaluationNote: [
			{
				__type: 'ClientEvaluationNote:#BPlusTraining.Logic',
				EvaluationDate: '/Date(1595980851000+0700)/',
				IsDeleteAble: true,
				NoteId: '2b953f00-c5e0-4243-9ff8-9ed9f5f0f8c6',
				Notes:
					'[Others] - @T059 tidur pas sesi materi (sudah dibangunin tidak kebangun) -> sesi materi shift 1 <br>\n@T044 , @T057 , @T080 , @T084 , @T088 , @T116 tidur pas sesi materi  shift 1',
				SavedAt: '/Date(1595990277786+0700)/',
				SavedBy: 'NS17-1',
			},
			{
				__type: 'ClientEvaluationNote:#BPlusTraining.Logic',
				EvaluationDate: '/Date(1595980851000+0700)/',
				IsDeleteAble: true,
				NoteId: '2b953f00-c5e0-4243-9ff8-9ed9f5f0f8c6',
				Notes:
					'[Others] - @T059 tidur pas sesi materi (sudah dibangunin tidak kebangun) -> sesi materi shift 1 <br>\n@T044 , @T057 , @T080 , @T084 , @T088 , @T116 tidur pas sesi materi  shift 1',
				SavedAt: '/Date(1595990277786+0700)/',
				SavedBy: 'NS17-1',
			},
			{
				__type: 'ClientEvaluationNote:#BPlusTraining.Logic',
				EvaluationDate: '/Date(1595980851000+0700)/',
				IsDeleteAble: true,
				NoteId: '2b953f00-c5e0-4243-9ff8-9ed9f5f0f8c6',
				Notes:
					'[Others] - @T059 tidur pas sesi materi (sudah dibangunin tidak kebangun) -> sesi materi shift 1 <br>\n@T044 , @T057 , @T080 , @T084 , @T088 , @T116 tidur pas sesi materi  shift 1',
				SavedAt: '/Date(1595990277786+0700)/',
				SavedBy: 'NS17-1',
			},
			{
				__type: 'ClientEvaluationNote:#BPlusTraining.Logic',
				EvaluationDate: '/Date(1595997531000+0700)/',
				IsDeleteAble: false,
				NoteId: '020868b7-91bb-4a0e-a243-958b1c8b33ec',
				Notes:
					'[Others] - @T117 menyarankan angkatan untuk tidur, dan (sedikit) korbankan BP, biar ga ngantuk pas sesinya. Soalnya beliau semalam kan mati lampu, ga bisa ngapa-ngapain, terus dia ga kerja BP sama sekali, dan tidur sehat. Dia bilang gara2 itu hari ini dia ga ngantuk ga kayak kemarin2.',
				SavedAt: '/Date(1595998608388+0700)/',
				SavedBy: 'EI19-2',
			},
		],
		TraineeComment: [
			{
				__type: 'TraineeComment:#BPlusTraining.Logic',
				NoteNegative: [],
				NoteNeutral: [],
				NotePositive: [
					{
						__type: 'ClientNoteDetail:#BPlusTraining.Logic',
						Note:
							'Sejauh ini saya sering lihat beliau inisiatif menanyakan progress dan membantu angkatan',
						SavedAt: '/Date(1595997222828+0700)/',
						SavedBy: 'EI19-2',
					},
				],
				RowSpan: 1,
				Trainee: {
					__type: 'ClientTrainee:#BPlusTraining.Logic',
					IsActive: false,
					TraineeCode: 'T089      ',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
					TraineeName: 'Skolastika Gabriella Theresandia Prasetyo',
					TraineeNumber: '2301886323',
				},
			},
		],
	},

	// time: "2020-07-29"
	GetPresentationReportDetailByDate: [
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 2,
			comment:
				'<p>1. Materi yang saya bawakan masih lecet</p><p>2. Walau sudah dipancing saya tidak dapat menyelesaikan code KThread saya</p><p>3. Saya lupa materi yang dibawakan oleh pengajar</p><p><br></p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Schedulers',
			notes:
				'Materi yang dibawakan tidak dpat tersampaikan dengan baik. Dia tidak menjelaskan scheduler secara lengkap dan perlu dipancing untuk menyebutkannya. Dan untuk KThread banyak salah code (tidak selesai codenya).',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '918862b2-3dfb-4530-91b5-3f5c0a5c8df0',
			presentationNo: 3,
			savedAt: '/Date(1595995130608+0700)/',
			savedBy: 'RX19-2',
			score: 2.3,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T035      ',
			traineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Jonathan Ronald Honggo',
			understanding: 2,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Penjelasan cukup</p><p>2. Materi kurang</p><p>3. penamaan class tidak sesuai kegunaan</p><p>4. Saya mencoba menghafal</p><p>5. Saya buat schedulers tapi tidak sempat saya pakai&nbsp;</p><p>6. sudah subject OS OOP saya lecet</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Schedulers',
			notes: 'materinya kacau dan seperti ngapal.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '2f57b07a-51f8-445c-9884-dea1bb26f636',
			presentationNo: 3,
			savedAt: '/Date(1595992294927+0700)/',
			savedBy: 'MV19-2',
			score: 1.7,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T044      ',
			traineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Erwin',
			understanding: 1,
			voice: 2,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<h1>1. Materi saya hampir null.</h1><h1>2. Saya mengaku skip-skip pada saat sesi pengajaran.</h1><h1>3. Saya sudah dipancing maksimal tapi masih tidak bisa.</h1>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Scheduler',
			notes:
				'Materi hampir null dan dia bilang belum pernah nyobain scheduler karena skip skip pas training',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'c695af31-8830-4c85-bfcf-62872dd74f86',
			presentationNo: 3,
			savedAt: '/Date(1595996282096+0700)/',
			savedBy: 'OS19-2',
			score: 1.4,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T057      ',
			traineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Johanes Peter Vincentius',
			understanding: 1,
			voice: 1,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. saya peduli dengan mahasiswa</p><p>2. penjelasan oke</p><p>3. materi oke</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Scheduler',
			notes:
				'materiny oke, sedikit tersendat di akhir tapi salahnya minor dan sudah di benarkan.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'b9934fca-4139-46bc-84ad-74bc93c5495e',
			presentationNo: 2,
			savedAt: '/Date(1595995136146+0700)/',
			savedBy: 'MV19-2',
			score: 3.5,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T059      ',
			traineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'David',
			understanding: 4,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Materi Saya Mantap</p><p>2. Saya ingat membesarkan font dan mengganti theme</p><p>3. Saya bisa pertanyaan Subco</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Schedule',
			notes:
				'Dapat menjalaskan materi secara lengkap walaupun perlu dipancing dikit untuk new KThread() dan configure scheduler di nachos.conf.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'b7c9a2fe-f6ad-4a50-aae9-c3af2d96981c',
			presentationNo: 2,
			savedAt: '/Date(1595998557302+0700)/',
			savedBy: 'RX19-2',
			score: 3.8,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T084      ',
			traineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Thaddeus Cleo',
			understanding: 4,
			voice: 4,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<h1>1. Saya berhasil menepati janji lulus pada hari ini</h1><p>2. Materi saya mantap</p><p>3. Saya ingat untuk membesarkan font</p><p>4. Sebisanya kalo ketemu error di debug dulu sampai selesai</p><p>5. Biasakan untuk menjelaskan error setelah di debug</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Scheduler',
			notes:
				'lulus karena kodingan dia bisa debug sendiri. Terus nggak macet macet amet. Ditanyain tentang kodingannya juga dominan dia bisa jelasin dengan baik',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'ba51140e-7566-43f4-b24d-26ab4b9025ef',
			presentationNo: 3,
			savedAt: '/Date(1595994315653+0700)/',
			savedBy: 'OS19-2',
			score: 3,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T117      ',
			traineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Veronica',
			understanding: 3,
			voice: 3,
		},
  ],
  
  getIPWhiteList: ["10.22.66.231","10.22.66.232","10.22.224.101","10.22.65.8"],

	//#endregion

	//#region Trainee.svc
	GetTrainees: [
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(970506000000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '6cb3315c-dca3-e811-9421-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T026',
			TraineeId: '8f0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Eric Pangiawan',
			TraineeNumber: '2201768273',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(983034000000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: 'c7120bb8-14ae-e811-9421-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T031',
			TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Lionel Ritchie',
			TraineeNumber: '2301846212',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(978800400000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: 'e49bb975-4098-e911-8a7c-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T034',
			TraineeId: '970c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Ricky Imanuel',
			TraineeNumber: '2301848243',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(999277200000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '99998a0b-2c23-e911-8e6f-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T035',
			TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Jonathan Ronald Honggo',
			TraineeNumber: '2301848956',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: {
				__type: 'AdditionalTraineeData:#BPlusTraining.Logic',
				BankAccount: '5271698675',
				BankBranch: 'BCA',
				CurrentAddress:
					'Jl. D No 5A RT.010/RW 006 Kelurahan Pejagalan Kecamatan Penjaringan Kota DKI Jakarta',
				CurrentAddressType: 'My permanent address',
				GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
				KPTOrPassport: '3172011211000002',
				KPTOrPassportDescrption: 'I fill it with my Identity Card number',
				NPWP: null,
				NameBasedOnIDCard: 'Kelvin',
				PemanentAddress:
					'Jl. D No 5A RT.010/RW 006 Kelurahan Pejagalan Kecamatan Penjaringan Kota DKI Jakarta',
				PhoneNumberList: ['089677353879'],
				TraineeId: '990c2345-e868-ea11-abcb-d8d385fcda38',
			},
			Attendances: null,
			BirthDate: '/Date(973962000000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: 'c78ca1e0-02bd-e811-8260-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T036',
			TraineeId: '990c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Kelvin',
			TraineeNumber: '2301850696',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(974739600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '9534f63e-95be-e811-8260-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T040',
			TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Vincent Benedict',
			TraineeNumber: '2301855822',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(998758800000+0700)/',
			DeactivateReasons: null,
			Gender: 'Female',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: 'dcf2551f-55b5-e911-b1af-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T116',
			TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Clarissa Chuardi',
			TraineeNumber: '2301941366',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: {
				__type: 'AdditionalTraineeData:#BPlusTraining.Logic',
				BankAccount: '0',
				BankBranch: 'Tanjungpinang',
				CurrentAddress: 'Jl. U No17D',
				CurrentAddressType: 'Boarding house(kos)',
				GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
				KPTOrPassport: '2172016807010002',
				KPTOrPassportDescrption: 'I fill it with my Identity Card number',
				NPWP: '0',
				NameBasedOnIDCard: 'Veronica',
				PemanentAddress:
					'Jl. Dr. Sutomo No.18 RT007/RW005\nKelurahan Bukit Cermin Kecamatan Kota Tanjungpinang Barat\nKota Tanjungpinang Kepulauan Riau',
				PhoneNumberList: ['082283783876', '0'],
				TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			},
			Attendances: null,
			BirthDate: '/Date(996253200000+0700)/',
			DeactivateReasons: null,
			Gender: 'Female',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '9594732c-8cca-e911-a4b9-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T117',
			TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Veronica',
			TraineeNumber: '2301941611',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(792694800000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Business Information Technology',
			Notes: null,
			PictureId: '731025e2-0baf-e911-8672-d8d385fce79e',
			Scores: null,
			Semester: 2,
			TraineeCode: 'T123',
			TraineeId: 'af0d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Raka Nurul Fikri',
			TraineeNumber: '2301938195',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: {
				__type: 'AdditionalTraineeData:#BPlusTraining.Logic',
				BankAccount: '0661306709',
				BankBranch: 'BCA - BINUS - Bekasi',
				CurrentAddress:
					'Jl. Merpati B8 No. 1 Villa Jatirasa RT. 004/RW. 011\nKelurahan Jatirasa Kecamatan Jatiasih\nKota Bekasi Jawa Barat',
				CurrentAddressType: 'My permanent address',
				GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
				KPTOrPassport: '6171021607950002',
				KPTOrPassportDescrption: 'I fill it with my Identity Card number',
				NPWP: null,
				NameBasedOnIDCard: 'Yoshua Aron Nainggolan',
				PemanentAddress:
					'Jl. Merpati B8 No. 1 Villa Jatirasa RT. 004/RW. 011\nKelurahan Jatirasa Kecamatan Jatiasih\nKota Bekasi Jawa Barat',
				PhoneNumberList: ['082261132615', '085156234556'],
				TraineeId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
			},
			Attendances: null,
			BirthDate: '/Date(805827600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Business Information Technology',
			Notes: null,
			PictureId: '96e18bba-c09d-e911-8a7c-d8d385fce79e',
			Scores: null,
			Semester: 2,
			TraineeCode: 'T124',
			TraineeId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Yoshua Aron Nainggolan',
			TraineeNumber: '2301914730',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(984416400000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Business Information Technology',
			Notes: null,
			PictureId: '3e1025e2-0baf-e911-8672-d8d385fce79e',
			Scores: null,
			Semester: 2,
			TraineeCode: 'T125',
			TraineeId: 'b10d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Rhenald Saputra',
			TraineeNumber: '2301936883',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(979923600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Business Information Technology',
			Notes: null,
			PictureId: 'c1b8b06b-c09d-e911-8a7c-d8d385fce79e',
			Scores: null,
			Semester: 2,
			TraineeCode: 'T126',
			TraineeId: 'b20d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Denies',
			TraineeNumber: '2301873314',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(996339600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Female',
			IsActive: false,
			IsVeteran: false,
			Major: 'Business Information Technology',
			Notes: null,
			PictureId: '4410957f-0baf-e911-8672-d8d385fce79e',
			Scores: null,
			Semester: 2,
			TraineeCode: 'T127',
			TraineeId: 'b30d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Levina Niolana',
			TraineeNumber: '2301858515',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(1003165200000+0700)/',
			DeactivateReasons: null,
			Gender: 'Female',
			IsActive: false,
			IsVeteran: false,
			Major: 'Business Information Technology',
			Notes: null,
			PictureId: '77da25ba-539f-e911-8a7c-d8d385fce79e',
			Scores: null,
			Semester: 2,
			TraineeCode: 'T129',
			TraineeId: 'b50d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Gianni Fiesta Dewi',
			TraineeNumber: '2301929272',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(1008867600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Business Information Technology',
			Notes: null,
			PictureId: '521f92f0-9eb0-e911-b1af-d8d385fce79e',
			Scores: null,
			Semester: 2,
			TraineeCode: 'T130',
			TraineeId: 'b60d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Andi Suryo Laksono',
			TraineeNumber: '2301940792',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(819478800000+0700)/',
			DeactivateReasons: null,
			Gender: 'Female',
			IsActive: false,
			IsVeteran: false,
			Major: 'Business Information Technology',
			Notes: null,
			PictureId: '76da25ba-539f-e911-8a7c-d8d385fce79e',
			Scores: null,
			Semester: 2,
			TraineeCode: 'T131',
			TraineeId: 'b70d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Stefany Chrisdayanty',
			TraineeNumber: '2301929266',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(989427600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '86776605-78ad-e911-8a7c-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T080',
			TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Bryan Takari',
			TraineeNumber: '2301877880',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: {
				__type: 'AdditionalTraineeData:#BPlusTraining.Logic',
				BankAccount: '5271772824',
				BankBranch: 'KCP BINA NUSANTARA',
				CurrentAddress: 'Jalan budi raya no 21',
				CurrentAddressType: 'Boarding house(kos)',
				GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
				KPTOrPassport: '3578121209010001',
				KPTOrPassportDescrption: 'I fill it with my Identity Card number',
				NPWP: null,
				NameBasedOnIDCard: 'Stanley Dave Teherag',
				PemanentAddress:
					'Gili 3 no 3 Kelurahan Nyamplungan,\nKecamatan Pabean Cantian ,Kota Surabaya, Jawa Timur',
				PhoneNumberList: ['081362371372', ''],
				TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
			},
			Attendances: null,
			BirthDate: '/Date(1000227600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: 'd9250699-b0c2-e911-81c2-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T082',
			TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Stanley Dave Teherag',
			TraineeNumber: '2301878012',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(977418000000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '81c577f9-f7b2-e911-b1af-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T084',
			TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Thaddeus Cleo',
			TraineeNumber: '2301878403',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(994438800000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Information Systems',
			Notes: null,
			PictureId: '5d7699fc-8993-e911-8a7c-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T088',
			TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Brandon Julio Thenaro',
			TraineeNumber: '2301885466',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(980528400000+0700)/',
			DeactivateReasons: null,
			Gender: 'Female',
			IsActive: true,
			IsVeteran: false,
			Major: 'Cyber Security',
			Notes: null,
			PictureId: '503135a7-b0c2-e911-81c2-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T089',
			TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Skolastika Gabriella Theresandia Prasetyo',
			TraineeNumber: '2301886323',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: {
				__type: 'AdditionalTraineeData:#BPlusTraining.Logic',
				BankAccount: '8825057109',
				BankBranch: 'muladi muhamad',
				CurrentAddress: 'jalan u27b',
				CurrentAddressType: 'My permanent address',
				GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
				KPTOrPassport: '1905032605020002',
				KPTOrPassportDescrption: 'I fill it with my Identity Card number',
				NPWP: null,
				NameBasedOnIDCard: 'Muladi muhamad',
				PemanentAddress: 'jalan  u  kos u27b',
				PhoneNumberList: ['081271470240'],
				TraineeId: 'd60c2345-e868-ea11-abcb-d8d385fcda38',
			},
			Attendances: null,
			BirthDate: '/Date(1022346000000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: 'c66bc656-afb7-e911-835c-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T097',
			TraineeId: 'd60c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Muladi Muhamad',
			TraineeNumber: '2301903084',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(961520400000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: false,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '0b63aa55-dca3-e811-9421-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T024',
			TraineeId: '8d0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Vincent',
			TraineeNumber: '2201762780',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(979059600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: 'ea77266b-d3a4-e911-8a7c-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T044',
			TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Erwin',
			TraineeNumber: '2301856592',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(1001869200000+0700)/',
			DeactivateReasons: null,
			Gender: 'Female',
			IsActive: false,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '9df34246-5010-e911-8e6f-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T046',
			TraineeId: 'a30c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Vlarancia',
			TraineeNumber: '2301857443',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(1006534800000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: 'bc1fda7c-b0c2-e911-81c2-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T048',
			TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Felix Novando',
			TraineeNumber: '2301859543',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: {
				__type: 'AdditionalTraineeData:#BPlusTraining.Logic',
				BankAccount: '4410077677',
				BankBranch: 'BCA',
				CurrentAddress: 'Dr. Makaliwe III gg.5 no.198',
				CurrentAddressType: 'My permanent address',
				GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
				KPTOrPassport: '3173060304011001',
				KPTOrPassportDescrption: 'I fill it with my Identity Card number',
				NPWP: '',
				NameBasedOnIDCard: 'Johanes Peter Vincentius',
				PemanentAddress: 'Dr. Makaliwe III gg.5 no.198',
				PhoneNumberList: ['08118503508'],
				TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			},
			Attendances: null,
			BirthDate: '/Date(986230800000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '46ae1d73-9c4d-e911-b1d7-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T057',
			TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Johanes Peter Vincentius',
			TraineeNumber: '2301864461',
		},
		{
			__type: 'ClientTraineeData:#BPlusTraining.Logic',
			AdditionalTraineeData: null,
			Attendances: null,
			BirthDate: '/Date(1001955600000+0700)/',
			DeactivateReasons: null,
			Gender: 'Male',
			IsActive: true,
			IsVeteran: false,
			Major: 'Computer Science',
			Notes: null,
			PictureId: '92d50e8a-b0c2-e911-81c2-d8d385fce79e',
			Scores: null,
			Semester: 0,
			TraineeCode: 'T059',
			TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'David',
			TraineeNumber: '2301868491',
		},
	],

	// binusianNumber: "2301846212,2301848956,2301855822,2301856592,2301859543,2301864461,2301868491,2301877880,2301878012,2301878403,2301885466,2301886323,2301941366,2301941611"
	// endDate: "2020-7-29"
	// period: "2010"
	// startDate: "2020-7-29"
	GetTraineeSchedule:
		'[{"college":[["NIM","Name","CourseCode","CourseName","Class","StartDate","EndDate","Shift","Room","DeliveryMode","Session","Week"]],"exam":[["StudentId","Name","ExamType","Description","CourseCode","CourseName","Class","ExamDate","StartTime","EndTime","Room","Seat"]]},{"college":[],"exam":[]}]',

	//#endregion

	//#region Note.svc

	// index: 1
	// phaseId: "40cb12af-3db5-ea11-abcb-d8d385fcda38"
	// search: ""
	GetTraineesReputationByPhase: {
		__type: 'ClientTraineeReputationPaging:#BPlusTraining.Logic',
		CurrentPage: 1,
		TotalActive: 14,
		TotalInActive: 14,
		TraineeCount: 28,
		TraineeReputation: [
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1594974122787+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T024): Tidak kuat mental, dorongan orangtua untuk quit (17/07/2020)',
					TraineeId: '8d0c2345-e868-ea11-abcb-d8d385fcda38',
					UserName: 'CY19-1',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 0,
				PictureId: '0b63aa55-dca3-e811-9421-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T024      ',
				TraineeId: '8d0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Vincent',
				TraineeNumber: '2201762780',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1594979496298+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason: 'Quit(T026): Tidak kuat mental (17/07/2020)',
					TraineeId: '8f0c2345-e868-ea11-abcb-d8d385fcda38',
					UserName: 'NS17-1',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: true,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 0,
				PictureId: '6cb3315c-dca3-e811-9421-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T026      ',
				TraineeId: '8f0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Eric Pangiawan',
				TraineeNumber: '2201768273',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: true,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 1,
				PictureId: 'c7120bb8-14ae-e811-9421-d8d385fce79e',
				Plus: 1,
				TraineeCode: 'T031      ',
				TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Lionel Ritchie',
				TraineeNumber: '2301846212',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1595317098363+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T034): Tidak kuat mental, sudah kehilangan motivasi dan orang tuanya khawatir (21/07/2020)',
					TraineeId: '970c2345-e868-ea11-abcb-d8d385fcda38',
					UserName: 'HY18-2',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 0,
				PictureId: 'e49bb975-4098-e911-8a7c-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T034      ',
				TraineeId: '970c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Ricky Imanuel',
				TraineeNumber: '2301848243',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 1,
				Neutral: 0,
				PictureId: '99998a0b-2c23-e911-8e6f-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T035      ',
				TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Jonathan Ronald Honggo',
				TraineeNumber: '2301848956',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1595574118804+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason: 'Quit(T036): Sudah kehilangan motivasi (24/07/2020)',
					TraineeId: '990c2345-e868-ea11-abcb-d8d385fcda38',
					UserName: 'HY18-2',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 1,
				PictureId: 'c78ca1e0-02bd-e811-8260-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T036      ',
				TraineeId: '990c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Kelvin',
				TraineeNumber: '2301850696',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 1,
				PictureId: '9534f63e-95be-e811-8260-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T040      ',
				TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Vincent Benedict',
				TraineeNumber: '2301855822',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 1,
				Neutral: 0,
				PictureId: 'ea77266b-d3a4-e911-8a7c-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T044      ',
				TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Erwin',
				TraineeNumber: '2301856592',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1594867510783+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T046): Kondisi kesehatan sangat tidak kuat terutama jika hanya tidur sebentar (16/07/2020)',
					TraineeId: 'a30c2345-e868-ea11-abcb-d8d385fcda38',
					UserName: 'CY19-1',
				},
				Gender: 'Female',
				IsActive: false,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 5,
				PictureId: '9df34246-5010-e911-8e6f-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T046      ',
				TraineeId: 'a30c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Vlarancia',
				TraineeNumber: '2301857443',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 2,
				PictureId: 'bc1fda7c-b0c2-e911-81c2-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T048      ',
				TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Felix Novando',
				TraineeNumber: '2301859543',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 2,
				Neutral: 0,
				PictureId: '46ae1d73-9c4d-e911-b1d7-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T057      ',
				TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Johanes Peter Vincentius',
				TraineeNumber: '2301864461',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 1,
				PictureId: '92d50e8a-b0c2-e911-81c2-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T059      ',
				TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'David',
				TraineeNumber: '2301868491',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 2,
				Neutral: 2,
				PictureId: '86776605-78ad-e911-8a7c-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T080      ',
				TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Bryan Takari',
				TraineeNumber: '2301877880',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 2,
				PictureId: 'd9250699-b0c2-e911-81c2-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T082      ',
				TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Stanley Dave Teherag',
				TraineeNumber: '2301878012',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 0,
				Neutral: 2,
				PictureId: '81c577f9-f7b2-e911-b1af-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T084      ',
				TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Thaddeus Cleo',
				TraineeNumber: '2301878403',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Male',
				IsActive: true,
				IsVeteran: false,
				Major: 'Information Systems',
				Minus: 1,
				Neutral: 2,
				PictureId: '5d7699fc-8993-e911-8a7c-d8d385fce79e',
				Plus: 2,
				TraineeCode: 'T088      ',
				TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Brandon Julio Thenaro',
				TraineeNumber: '2301885466',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Female',
				IsActive: true,
				IsVeteran: true,
				Major: 'Cyber Security',
				Minus: 0,
				Neutral: 3,
				PictureId: '503135a7-b0c2-e911-81c2-d8d385fce79e',
				Plus: 1,
				TraineeCode: 'T089      ',
				TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Skolastika Gabriella Theresandia Prasetyo',
				TraineeNumber: '2301886323',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1595317114972+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T097): Orang tuanya tidak menyetujui dan memintanya keluar (21/07/2020)',
					TraineeId: 'd60c2345-e868-ea11-abcb-d8d385fcda38',
					UserName: 'HY18-2',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 2,
				Neutral: 0,
				PictureId: 'c66bc656-afb7-e911-835c-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T097      ',
				TraineeId: 'd60c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Muladi Muhamad',
				TraineeNumber: '2301903084',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Female',
				IsActive: true,
				IsVeteran: true,
				Major: 'Computer Science',
				Minus: 1,
				Neutral: 2,
				PictureId: 'dcf2551f-55b5-e911-b1af-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T116      ',
				TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Clarissa Chuardi',
				TraineeNumber: '2301941366',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: null,
				Gender: 'Female',
				IsActive: true,
				IsVeteran: false,
				Major: 'Computer Science',
				Minus: 1,
				Neutral: 1,
				PictureId: '9594732c-8cca-e911-a4b9-d8d385fce79e',
				Plus: 1,
				TraineeCode: 'T117      ',
				TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				TraineeName: 'Veronica',
				TraineeNumber: '2301941611',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1593566403414+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T123): Tidak mau lanjut dengan alasan masalah kesehatan mental (01/07/2020)',
					TraineeId: 'af0d28a9-686a-ea11-abcb-d8d385fcda38',
					UserName: 'NS17-1',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Business Information Technology',
				Minus: 1,
				Neutral: 0,
				PictureId: '731025e2-0baf-e911-8672-d8d385fce79e',
				Plus: 1,
				TraineeCode: 'T123      ',
				TraineeId: 'af0d28a9-686a-ea11-abcb-d8d385fcda38',
				TraineeName: 'Raka Nurul Fikri',
				TraineeNumber: '2301938195',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1595494028807+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason: 'Quit(T124): Masalah keluarga (23/07/2020)',
					TraineeId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
					UserName: 'NS17-1',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Business Information Technology',
				Minus: 2,
				Neutral: 1,
				PictureId: '96e18bba-c09d-e911-8a7c-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T124      ',
				TraineeId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
				TraineeName: 'Yoshua Aron Nainggolan',
				TraineeNumber: '2301914730',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1593566395100+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T125): Tidak mau lanjut dengan alasan masalah kesehatan mental (01/07/2020)',
					TraineeId: 'b10d28a9-686a-ea11-abcb-d8d385fcda38',
					UserName: 'NS17-1',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Business Information Technology',
				Minus: 2,
				Neutral: 0,
				PictureId: '3e1025e2-0baf-e911-8672-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T125      ',
				TraineeId: 'b10d28a9-686a-ea11-abcb-d8d385fcda38',
				TraineeName: 'Rhenald Saputra',
				TraineeNumber: '2301936883',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1595494035977+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Cut(T126): Cabut beberapa kali dan tidak ada motivasi lagi untuk menjadi ast (23/07/2020)',
					TraineeId: 'b20d28a9-686a-ea11-abcb-d8d385fcda38',
					UserName: 'NS17-1',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Business Information Technology',
				Minus: 2,
				Neutral: 0,
				PictureId: 'c1b8b06b-c09d-e911-8a7c-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T126      ',
				TraineeId: 'b20d28a9-686a-ea11-abcb-d8d385fcda38',
				TraineeName: 'Denies',
				TraineeNumber: '2301873314',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1594882868814+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T127): Tidak mau lanjut karena masalah kesehatan (maag, kurang tidur), materi dan orang tua menyuruh quit (16/07/2020)',
					TraineeId: 'b30d28a9-686a-ea11-abcb-d8d385fcda38',
					UserName: 'NS17-1',
				},
				Gender: 'Female',
				IsActive: false,
				IsVeteran: false,
				Major: 'Business Information Technology',
				Minus: 0,
				Neutral: 0,
				PictureId: '4410957f-0baf-e911-8672-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T127      ',
				TraineeId: 'b30d28a9-686a-ea11-abcb-d8d385fcda38',
				TraineeName: 'Levina Niolana',
				TraineeNumber: '2301858515',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1594796196400+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quir(T129): Memiliki penyakit asma + maag yang cukup parah dan kambuh karena kecapekan dan banyak pikiran (15/07/2020)',
					TraineeId: 'b50d28a9-686a-ea11-abcb-d8d385fcda38',
					UserName: 'HY18-2',
				},
				Gender: 'Female',
				IsActive: false,
				IsVeteran: false,
				Major: 'Business Information Technology',
				Minus: 0,
				Neutral: 0,
				PictureId: '77da25ba-539f-e911-8a7c-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T129      ',
				TraineeId: 'b50d28a9-686a-ea11-abcb-d8d385fcda38',
				TraineeName: 'Gianni Fiesta Dewi',
				TraineeNumber: '2301929272',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1595214348065+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T130): Tidak kuat mental dan sudah kehilangan motivasi (20/07/2020)',
					TraineeId: 'b60d28a9-686a-ea11-abcb-d8d385fcda38',
					UserName: 'NS17-1',
				},
				Gender: 'Male',
				IsActive: false,
				IsVeteran: false,
				Major: 'Business Information Technology',
				Minus: 2,
				Neutral: 0,
				PictureId: '521f92f0-9eb0-e911-b1af-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T130      ',
				TraineeId: 'b60d28a9-686a-ea11-abcb-d8d385fcda38',
				TraineeName: 'Andi Suryo Laksono',
				TraineeNumber: '2301940792',
			},
			{
				__type: 'ClientTraineeReputation:#BPlusTraining.Logic',
				DeactivateReason: {
					__type: 'TraineeDeactivateReason:#BPlusTraining.Logic',
					Date: '/Date(1595568125015+0700)/',
					GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
					Reason:
						'Quit(T131): Motivasi sudah tidak ada dan sudah tidak kuat (24/07/2020)',
					TraineeId: 'b70d28a9-686a-ea11-abcb-d8d385fcda38',
					UserName: 'NS17-1',
				},
				Gender: 'Female',
				IsActive: false,
				IsVeteran: false,
				Major: 'Business Information Technology',
				Minus: 3,
				Neutral: 1,
				PictureId: '76da25ba-539f-e911-8a7c-d8d385fce79e',
				Plus: 0,
				TraineeCode: 'T131      ',
				TraineeId: 'b70d28a9-686a-ea11-abcb-d8d385fcda38',
				TraineeName: 'Stefany Chrisdayanty',
				TraineeNumber: '2301929266',
			},
		],
	},

	// traineeId: "940c2345-e868-ea11-abcb-d8d385fcda38"
	GetTraineeDataForTrainer: {
		__type: 'ClientTraineeData:#BPlusTraining.Logic',
		AdditionalTraineeData: null,
		Attendances: null,
		BirthDate: '/Date(983034000000+0700)/',
		DeactivateReasons: [
			{
				__type: 'ClientTraineeDeactivateReason:#BPlusTraining.Logic',
				Date: '/Date(1579015310605+0700)/',
				GenerationId: '110b6fb2-48d4-e911-964e-d8d385fcda38',
				GenerationName: '20-1',
				Reason:
					'Quit(T085): Desakan dari ortu dan motivasi dari dalam diri sudah tidak ada (14/01/2020)',
				TraineeId: 'e9ca8ac4-42ef-e911-8f44-d8d385fcda38',
				UserName: 'VD17-1',
			},
		],
		Gender: 'Male',
		IsActive: true,
		IsVeteran: true,
		Major: 'Computer Science',
		Notes: [
			{
				__type: 'ClientNote:#BPlusTraining.Logic',
				Description: 'Prof. Dr. T031 bidang teori',
				IsDeleteAble: false,
				NoteId: 'b53527b4-c544-4e55-872d-5db91ca14608',
				Reputation: 0,
				SavedAt: '/Date(1594984196755+0700)/',
				SavedBy: 'AA19-1',
			},
			{
				__type: 'ClientNote:#BPlusTraining.Logic',
				Description: 'Aktif dieval, carry angkatan',
				IsDeleteAble: true,
				NoteId: '4c231d57-9eb7-4b7b-9898-1df3bdff9e4d',
				Reputation: 1,
				SavedAt: '/Date(1594985057751+0700)/',
				SavedBy: 'NS17-1',
			},
		],
		PictureId: 'c7120bb8-14ae-e811-9421-d8d385fce79e',
		Scores: null,
		Semester: 0,
		TraineeCode: 'T031',
		TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
		TraineeName: 'Lionel Ritchie',
		TraineeNumber: '2301846212',
	},
	//#endregion

	//#region Presentation.svc
	GetCurrentPhaseWithPresentation: {
		__type: 'ClientPhase:#BPlusTraining.Logic',
		BeginDate: '/Date(1594573200000+0700)/',
		Description: 'Core Training',
		EndDate: '/Date(1597251600000+0700)/',
		PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
		PhaseType: 'ar',
	},

	// classControl: 4
	// material: ""
	// notes: ""
	// phaseId: "40cb12af-3db5-ea11-abcb-d8d385fcda38"
	// presentationNo: "Please select Trainee first"
	// status: ""
	// subjectId: ""
	// traineeId: ""
	// understanding: 4
	// voice: 4
	GetSubjectListByPhase: [
		{
			__type: 'ClientSubject:#BPlusTraining.Logic',
			HasPresentation: true,
			Name: 'Web Design',
			Phase: null,
			SubjectId: '5678790f-3eb5-ea11-abcb-d8d385fcda38',
		},
		{
			__type: 'ClientSubject:#BPlusTraining.Logic',
			HasPresentation: true,
			Name: 'Database',
			Phase: null,
			SubjectId: '50d03bfd-3db5-ea11-abcb-d8d385fcda38',
		},
		{
			__type: 'ClientSubject:#BPlusTraining.Logic',
			HasPresentation: true,
			Name: 'C',
			Phase: null,
			SubjectId: '4ed03bfd-3db5-ea11-abcb-d8d385fcda38',
		},
		{
			__type: 'ClientSubject:#BPlusTraining.Logic',
			HasPresentation: true,
			Name: 'PHP',
			Phase: null,
			SubjectId: '5878790f-3eb5-ea11-abcb-d8d385fcda38',
		},
		{
			__type: 'ClientSubject:#BPlusTraining.Logic',
			HasPresentation: true,
			Name: 'Laravel',
			Phase: null,
			SubjectId: '5a78790f-3eb5-ea11-abcb-d8d385fcda38',
		},
		{
			__type: 'ClientSubject:#BPlusTraining.Logic',
			HasPresentation: true,
			Name: 'OS',
			Phase: null,
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
		},
		{
			__type: 'ClientSubject:#BPlusTraining.Logic',
			HasPresentation: true,
			Name: 'Java',
			Phase: null,
			SubjectId: 'aa349105-3eb5-ea11-abcb-d8d385fcda38',
		},
	],

	// classControl: 4
	// material: ""
	// notes: ""
	// phaseId: "40cb12af-3db5-ea11-abcb-d8d385fcda38"
	// presentationNo: "Please select Trainee first"
	// status: ""
	// subjectId: ""
	// traineeId: ""
	// understanding: 4
	// voice: 4
	GetPresentationTrainee: [
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T031      ',
			TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Lionel Ritchie',
			TraineeNumber: '2301846212',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T035      ',
			TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Jonathan Ronald Honggo',
			TraineeNumber: '2301848956',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T040      ',
			TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Vincent Benedict',
			TraineeNumber: '2301855822',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T044      ',
			TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Erwin',
			TraineeNumber: '2301856592',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T048      ',
			TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Felix Novando',
			TraineeNumber: '2301859543',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T057      ',
			TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Johanes Peter Vincentius',
			TraineeNumber: '2301864461',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T059      ',
			TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'David',
			TraineeNumber: '2301868491',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T080      ',
			TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Bryan Takari',
			TraineeNumber: '2301877880',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T082      ',
			TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Stanley Dave Teherag',
			TraineeNumber: '2301878012',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T084      ',
			TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Thaddeus Cleo',
			TraineeNumber: '2301878403',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T088      ',
			TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Brandon Julio Thenaro',
			TraineeNumber: '2301885466',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T089      ',
			TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Skolastika Gabriella Theresandia Prasetyo',
			TraineeNumber: '2301886323',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T116      ',
			TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Clarissa Chuardi',
			TraineeNumber: '2301941366',
		},
		{
			__type: 'ClientTrainee:#BPlusTraining.Logic',
			IsActive: false,
			TraineeCode: 'T117      ',
			TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Veronica',
			TraineeNumber: '2301941611',
		},
	],

	// classControl: 4
	// material: ""
	// notes: ""
	// phaseId: "40cb12af-3db5-ea11-abcb-d8d385fcda38"
	// presentationNo: "Please select Trainee first"
	// status: ""
	// subjectId: "ac349105-3eb5-ea11-abcb-d8d385fcda38"
	// traineeId: "940c2345-e868-ea11-abcb-d8d385fcda38"
	// understanding: 4
	// voice: 4
	GetTraineePresentationNo: 2,

	GetPhaseWithPresentation: [
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1594573200000+0700)/',
			Description: 'Core Training',
			EndDate: '/Date(1597251600000+0700)/',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1589216400000+0700)/',
			Description: 'Presentation',
			EndDate: '/Date(1589734800000+0700)/',
			PhaseId: 'a2196d78-f294-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
	],

	// generationId: "51fb670e-2468-ea11-abcb-d8d385fcda38"
	FindCoreTrainingPresentationByGeneration: [
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1596103200000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Schedulers',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Materi yang saya bawakan masih lecet</p><p>2. Walau sudah dipancing saya tidak dapat menyelesaikan code KThread saya</p><p>3. Saya lupa materi yang dibawakan oleh pengajar</p><p><br></p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595994891448+0700)/',
						Text:
							'<p>1. Materi yang saya bawakan masih lecet</p><p>2. Walau sudah dipancing saya tidak dapat menyelesaikan code KThread saya</p><p>3. Saya lupa materi yang dibawakan oleh pengajar</p><p><br></p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
					},
				],
				Id: 'e68f16d3-7a43-4073-a1da-75ff4acf5498',
				UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
				UserName: 'Jonathan Ronald Honggo',
			},
			PresentationDate: '/Date(1595994891282+0700)/',
			PresentationNo: 3,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595994891447+0700)/',
								Text:
									'<p>Di algoritma shortest job first memprioritaskan bedasarkan apa ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '11d10777-89dc-41e1-a95d-19579a487ce2',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>Di algoritma shortest job first memprioritaskan bedasarkan apa ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595994891447+0700)/',
								Text: '<p>Bagaimana cara kerja Round Robin Scheduler ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: 'c006a8c6-e3ef-42ad-b68e-c900d82852b3',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text: '<p>Bagaimana cara kerja Round Robin Scheduler ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595994891447+0700)/',
								Text:
									'<p>Di operating system linux menggunakan scheduler dengan algoritma seperti apa ? jelaskan bagaimana cara kerjanya !</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '8fb50062-3b7f-48b3-bde2-5722f718b44f',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>Di operating system linux menggunakan scheduler dengan algoritma seperti apa ? jelaskan bagaimana cara kerjanya !</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'fork merupakan sebuah method',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1596001299604+0700)/',
											Text: 'fork merupakan sebuah method',
											UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
										},
									],
									Id: '1892d48c-038e-49bf-91fa-bfee7c03601d',
									UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
									UserName: 'Skolastika Gabriella Theresandia Prasetyo',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1596001276370+0700)/',
									Text:
										'<p>fork pada thread digunakan untuk memasukkan thread kedalam queue atau bisa disebut juga ke dalam method waitforaccess yang nantinya akan diprosess di dalam method nextThread</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '0385b7fd-8d66-4826-ae05-fb67b1b257e7',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>fork pada thread digunakan untuk memasukkan thread kedalam queue atau bisa disebut juga ke dalam method waitforaccess yang nantinya akan diprosess di dalam method nextThread</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595994891447+0700)/',
								Text: '<p>Apa itu fork pada thread ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '75a82f4a-ad67-474e-a8b4-711e473051da',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text: '<p>Apa itu fork pada thread ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T035      ',
			TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Jonathan Ronald Honggo',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1595930400000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Shell Script  + Basic Command Line',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Materi saya mantap</p><p>2. Control kelas bisa lebih baik</p><p>3. Saya lupa zoom diawal</p><p>4. Saya menjelaskan shortcut dengan baik</p><p>5. Argument &amp; Help telah saya jelaskan dengan baik</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595844580525+0700)/',
						Text:
							'<p>1. Materi saya mantap</p><p>2. Control kelas bisa lebih baik</p><p>3. Saya lupa zoom diawal</p><p>4. Saya menjelaskan shortcut dengan baik</p><p>5. Argument &amp; Help telah saya jelaskan dengan baik</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
					},
				],
				Id: '13d17098-2990-4811-9713-f8e2ba7621f7',
				UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
				UserName: 'Skolastika Gabriella Theresandia Prasetyo',
			},
			PresentationDate: '/Date(1595844580361+0700)/',
			PresentationNo: 1,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595865104614+0700)/',
									Text:
										'<p>Jenis cryptography yang digunakan linux untuk menyimpan password adalah algoritma hashing SHA-512</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd76842f3-cc4f-4583-8fda-a873ec3cf492',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: 'wrong',
							StatusBy: 'MZ19-1',
							Text:
								'<p>Jenis cryptography yang digunakan linux untuk menyimpan password adalah algoritma hashing SHA-512</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'tempat disimpanya salah',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595991958822+0700)/',
											Text: 'tempat disimpanya salah',
											UserId: '667551f0-e525-e911-8e6f-d8d385fce79e',
										},
									],
									Id: 'f46eb217-9401-40bb-a18f-d4f0eba00a4a',
									UserId: '667551f0-e525-e911-8e6f-d8d385fce79e',
									UserName: 'Muhamad Zaenul Hasan Basri',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595980865761+0700)/',
									Text:
										'<p>Jenis chryptography yang digunakan untuk menyimpan password pada linux adalah one way encryption algorithm yang disebut dengan DES (Data Encryption Standard) dimana hasil dari enkripsi tersebut disimpan ke dalam /etc/passwd</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '2d1f2455-9484-474c-b7be-c527d90a2fe0',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: 'wrong',
							StatusBy: 'MZ19-1',
							Text:
								'<p>Jenis chryptography yang digunakan untuk menyimpan password pada linux adalah one way encryption algorithm yang disebut dengan DES (Data Encryption Standard) dimana hasil dari enkripsi tersebut disimpan ke dalam /etc/passwd</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1596000917202+0700)/',
									Text:
										'<p>Jenis chryptography yang digunakan untuk menyimpan password pada linux adalah one way encryption algorithm yang disebut dengan DES(Data Encryption Standard) dimana hasil dari enkripsi tersebut disimpan pada /etc/shadow</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'b7b2f260-ca4a-4d77-9aed-0994049c71e1',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Jenis chryptography yang digunakan untuk menyimpan password pada linux adalah one way encryption algorithm yang disebut dengan DES(Data Encryption Standard) dimana hasil dari enkripsi tersebut disimpan pada /etc/shadow</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>1. Jenis cryptograhy apa yang digunakan untuk menyimpan password pada linux?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: '6b2cfd71-7688-4dba-b88a-bd829dbd08bf',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>1. Jenis cryptograhy apa yang digunakan untuk menyimpan password pada linux?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: 'unchecked',
					StatusBy: 'MZ19-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment:
										'sudo su nya untuk apa ya ? dijelaskan juga dong kalau memang penting',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595940780900+0700)/',
											Text:
												'sudo su nya untuk apa ya ? dijelaskan juga dong kalau memang penting',
											UserId: '957eab9c-250a-e811-9d86-d8d385fce79e',
										},
									],
									Id: '0b01b3ee-0a49-4cce-9f3b-bd19244b4ce0',
									UserId: '957eab9c-250a-e811-9d86-d8d385fce79e',
									UserName: 'Christopher Limawan',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595869288594+0700)/',
									Text:
										'<p>Dengan melakukan sudo so dan memanggil scritp.sh dengan command sh script.sh.</p>',
									UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '9b570c05-39bb-4494-b9ed-4d59fe0f31fc',
							Lovers: [],
							RespondenUserName: 'Johanes Peter Vincentius',
							Status: 'wrong',
							StatusBy: 'CP18-1',
							Text:
								'<p>Dengan melakukan sudo so dan memanggil scritp.sh dengan command sh script.sh.</p>',
							UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Johanes Peter Vincentius',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595951003366+0700)/',
									Text:
										'<p>dengan menggunakan command :<br/><br/>nama_shell nama_scriptnya<br/><br/></p><p>misalnya :<br/>bash path/ke/script.sh</p>',
									UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'c1136735-c938-4c2e-9cb5-04846d26b82a',
							Lovers: [],
							RespondenUserName: 'Lionel Ritchie',
							Status: null,
							StatusBy: null,
							Text:
								'<p>dengan menggunakan command :<br/><br/>nama_shell nama_scriptnya<br/><br/></p><p>misalnya :<br/>bash path/ke/script.sh</p>',
							UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Lionel Ritchie',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>2. Bagaimana cara execute script.sh tanpa menggunakan ./ dan chmod?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: '69eee156-14e3-4880-a581-070843e84bf7',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>2. Bagaimana cara execute script.sh tanpa menggunakan ./ dan chmod?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: 'wrong',
					StatusBy: 'CP18-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>3. user[spasi]:/path$</p><p>Bagaimana mengubah format dari terminal menjadi format diatas?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: '05178184-14e0-4d51-9ac1-1f625bf19d46',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>3. user[spasi]:/path$</p><p>Bagaimana mengubah format dari terminal menjadi format diatas?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595868644274+0700)/',
									Text:
										'<p>c pada ls -l /dev | grep &#34;tty&#34; menandakan bahwa file tersebut bertipe character special file diamana data akan dituliskan per character atau setara dengan 8 bits atau setara juga dengan satu byte dalam satu waktu</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '6cc63d77-9be7-47c9-837d-9f581badab47',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>c pada ls -l /dev | grep &#34;tty&#34; menandakan bahwa file tersebut bertipe character special file diamana data akan dituliskan per character atau setara dengan 8 bits atau setara juga dengan satu byte dalam satu waktu</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>4. Saat saya menjalankan ls -l /dev | grep "tty" ada file yang tipenya C apa arti dari C tersebut?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: 'aaaa10c9-bfba-4368-ad1d-2962cb919584',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>4. Saat saya menjalankan ls -l /dev | grep "tty" ada file yang tipenya C apa arti dari C tersebut?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595867677857+0700)/',
									Text:
										'<p>&#34;[ ]&#34; -&gt; single bracket adalah sebuah command yang memiliki fungisonalitas yang sama dengan test command dimana argument terakhir harus diakhiri dengan closing square bracket dan akan error apabila salah satu argument null. Sementara &#34;[[ ]]&#34; adalah sebuah bagian dari syntax yang lebih memiliki toleransi terhadapa variable yang null. Pda double bracket juga dapat melakukan perbandingan menggunakan * dan ? dimana * dan ? adalah wildcard.</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'ba0903d4-f87e-49b1-98ca-705122e94454',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>&#34;[ ]&#34; -&gt; single bracket adalah sebuah command yang memiliki fungisonalitas yang sama dengan test command dimana argument terakhir harus diakhiri dengan closing square bracket dan akan error apabila salah satu argument null. Sementara &#34;[[ ]]&#34; adalah sebuah bagian dari syntax yang lebih memiliki toleransi terhadapa variable yang null. Pda double bracket juga dapat melakukan perbandingan menggunakan * dan ? dimana * dan ? adalah wildcard.</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>5. Apa perbedaan kurung siku "[ ]" dengan "[[ ]]" pada conditional statement di bash?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: '7e89281a-e9b4-4ce7-b1c0-0343b2fb6c47',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>5. Apa perbedaan kurung siku "[ ]" dengan "[[ ]]" pada conditional statement di bash?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595864742914+0700)/',
									Text:
										'<p>IFS atau Internal Field Separator adalah sebuah variable yang digunakan sebagai pembatas untuk memotong suatu string. Default dari IFS adalah memisahkan string berdasarkan string, tab dan newline. Apabila IFS di set empty string maka tidak ada yang terpotong pada string</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd66695a2-696d-4933-9244-536da50a7080',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: 'correct',
							StatusBy: 'CP18-1',
							Text:
								'<p>IFS atau Internal Field Separator adalah sebuah variable yang digunakan sebagai pembatas untuk memotong suatu string. Default dari IFS adalah memisahkan string berdasarkan string, tab dan newline. Apabila IFS di set empty string maka tidak ada yang terpotong pada string</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text: '<p>6. Apa itu IFS (Internal Field Separator)?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: '45236d72-01b2-4618-85bd-e8c0d318feab',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text: '<p>6. Apa itu IFS (Internal Field Separator)?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: 'correct',
					StatusBy: 'CP18-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595869511129+0700)/',
									Text:
										'<pre class="lang-sh prettyprint prettyprinted" style="color: rgb(36, 39, 41);text-align: left;"><code style="background-color: transparent;"><span class="pln">string</span><span class="pun">=</span><span class="str">\'tes tes tes\'</span><span class="pln">&#10;</span><span class="kwd">if</span><span class="pln"> </span><span class="pun">[[</span><span class="pln"> $string </span><span class="pun">==</span><span class="pln"> </span><span class="pun">*</span><span class="str">&#34;tes tes&#34;</span><span class="pun">*</span><span class="pln"> </span><span class="pun">]];</span><span class="pln"> </span><span class="kwd">then</span><span class="pln">&#10;  echo </span><span class="str">&#34;string mengandung tes tes!&#34;</span><span class="pln">&#10;</span><span class="kwd">fi</span></code></pre>',
									UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '5d85337b-2a88-486d-b734-9fa55496156f',
							Lovers: [],
							RespondenUserName: 'Johanes Peter Vincentius',
							Status: 'correct',
							StatusBy: 'CP18-1',
							Text:
								'<pre class="lang-sh prettyprint prettyprinted" style="color: rgb(36, 39, 41);text-align: left;"><code style="background-color: transparent;"><span class="pln">string</span><span class="pun">=</span><span class="str">\'tes tes tes\'</span><span class="pln">&#10;</span><span class="kwd">if</span><span class="pln"> </span><span class="pun">[[</span><span class="pln"> $string </span><span class="pun">==</span><span class="pln"> </span><span class="pun">*</span><span class="str">&#34;tes tes&#34;</span><span class="pun">*</span><span class="pln"> </span><span class="pun">]];</span><span class="pln"> </span><span class="kwd">then</span><span class="pln">&#10;  echo </span><span class="str">&#34;string mengandung tes tes!&#34;</span><span class="pln">&#10;</span><span class="kwd">fi</span></code></pre>',
							UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Johanes Peter Vincentius',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>7. Cari tau bagaimana cara menggunakan string contains dalam bash</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: 'c5f3607d-91ba-4e17-916c-391bf97ee90d',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>7. Cari tau bagaimana cara menggunakan string contains dalam bash</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: 'correct',
					StatusBy: 'CP18-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595951207769+0700)/',
									Text:
										'<p>Sebuah shell yang berisi library2 command untuk menjalankan dan mengexecute program yang berjalan di operating System contohnya Bash , sh<br/></p>',
									UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'f17a1d2c-ef81-4c95-99b3-264a211cfb83',
							Lovers: [],
							RespondenUserName: 'Stanley Dave Teherag',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Sebuah shell yang berisi library2 command untuk menjalankan dan mengexecute program yang berjalan di operating System contohnya Bash , sh<br/></p>',
							UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Stanley Dave Teherag',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595977535101+0700)/',
									Text:
										'<p>interpreter adalah sebuah bagian dari computer operating system yang mengexecute command yang dimasukkan oleh user</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'c4741e4d-66a3-45fe-b2f1-62ec750c830e',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>interpreter adalah sebuah bagian dari computer operating system yang mengexecute command yang dimasukkan oleh user</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>8. Cari tau tentang interpreter yang ada di dalam linux</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: 'bd66586a-08c4-470d-b234-4995f6fc86f9',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>8. Cari tau tentang interpreter yang ada di dalam linux</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595866362371+0700)/',
									Text:
										'<p>dev/sda adalah nama dari hard disk pertama yang terdetect pada device dan setiap partition pada hardisk tersebut di append dengan decimal number sesuai denga jumlah partitionnya. Contohnya ada 2 partition dalam hardisk pertama, sehingga namnya menjadi /dev/sda1 dan /dev/sda2</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'ec6112cf-5d61-4fc2-9f70-301522f6e39d',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: 'correct',
							StatusBy: 'CP18-1',
							Text:
								'<p>dev/sda adalah nama dari hard disk pertama yang terdetect pada device dan setiap partition pada hardisk tersebut di append dengan decimal number sesuai denga jumlah partitionnya. Contohnya ada 2 partition dalam hardisk pertama, sehingga namnya menjadi /dev/sda1 dan /dev/sda2</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>9. Pas saya df, muncul text "/dev/sda1", apa arti dari text tersebut?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: 'e1846add-0baf-441b-ba73-085f33ae8ae4',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>9. Pas saya df, muncul text "/dev/sda1", apa arti dari text tersebut?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: 'correct',
					StatusBy: 'CP18-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595864715381+0700)/',
									Text:
										'<p>Menggunakan command less.</p><p>Sebagai contoh, less filename.</p>',
									UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '72e712e7-3a5c-4c7a-ae32-2af9d125a017',
							Lovers: [],
							RespondenUserName: 'Johanes Peter Vincentius',
							Status: 'correct',
							StatusBy: 'MZ19-1',
							Text:
								'<p>Menggunakan command less.</p><p>Sebagai contoh, less filename.</p>',
							UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Johanes Peter Vincentius',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>10. Bagaimana cara print content dari sebuah file tanpa menggunakan command cat?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: '3a71620a-d462-4bda-8f01-cb686ec99916',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>10. Bagaimana cara print content dari sebuah file tanpa menggunakan command cat?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: 'correct',
					StatusBy: 'MZ19-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595944924294+0700)/',
									Text:
										'<p>2 byte pertama dalam bash script disebut sebagai shebang. Shebang diletakkan pada 2 byte pertama untuk memberi tahu executable yang akan digunakan untuk meng-interpret bash script</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '836f6601-804f-412c-b7cb-13f405c3b160',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: null,
							StatusBy: null,
							Text:
								'<p>2 byte pertama dalam bash script disebut sebagai shebang. Shebang diletakkan pada 2 byte pertama untuk memberi tahu executable yang akan digunakan untuk meng-interpret bash script</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1596000338345+0700)/',
									Text:
										'<p>!# pada sebuah bash script dinamakan shebang. Shebang diletakkan pada 2 byte pertama karena shebang digunakan untuk memberitau operating system interpreter mana yang harus digunakan untuk mengexecute isi dari file tersebut</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '516359d8-14cb-4869-af40-a7bd5e478a15',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>!# pada sebuah bash script dinamakan shebang. Shebang diletakkan pada 2 byte pertama karena shebang digunakan untuk memberitau operating system interpreter mana yang harus digunakan untuk mengexecute isi dari file tersebut</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595844580524+0700)/',
								Text:
									'<p>11. Apa sebutan untuk 2 byte pertama dalam bash script, kenapa harus diletakkan pada 2 byte pertama?</p>',
								UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
							},
						],
						Id: 'ad136f84-8014-4841-ab82-9c17f260d4e0',
						Lovers: [],
						RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>11. Apa sebutan untuk 2 byte pertama dalam bash script, kenapa harus diletakkan pada 2 byte pertama?</p>',
						UserId: '608daf27-a5f1-e811-8e6f-d8d385fce79e',
						UserName: 'Skolastika Gabriella Theresandia Prasetyo',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T089      ',
			TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Skolastika Gabriella Theresandia Prasetyo',
		},

		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1596016800000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Network Link',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Saya kurang teliti dalam mengisi buku</p><p>2. Saya lupa cara config NachOS</p><p>3. Materi saya perlu dipancing</p><p>4. Materi basic NachOS saya masih minim</p><p>5. Saya kurang menguasai materi Network Link</p><p>6. Saya ingat membesarkan font</p><p>7. Kontrol kelas oke</p><p>8. Interaksi dengan mahasiswa oke</p><p>9. Pastikan NachOS dapat berjalan terlebih dahulu baru coding</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595930872270+0700)/',
						Text:
							'<p>1. Saya kurang teliti dalam mengisi buku</p><p>2. Saya lupa cara config NachOS</p><p>3. Materi saya perlu dipancing</p><p>4. Materi basic NachOS saya masih minim</p><p>5. Saya kurang menguasai materi Network Link</p><p>6. Saya ingat membesarkan font</p><p>7. Kontrol kelas oke</p><p>8. Interaksi dengan mahasiswa oke</p><p>9. Pastikan NachOS dapat berjalan terlebih dahulu baru coding</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
					},
				],
				Id: '1e088773-152a-4ad0-a724-f185c3701949',
				UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
				UserName: 'Jonathan Ronald Honggo',
			},
			PresentationDate: '/Date(1595930872108+0700)/',
			PresentationNo: 2,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595981961738+0700)/',
									Text:
										'<p>Membuat networkLink untuk saling menghubungkan console dengan link address satu dengan console link address lainnya, Menginput destinasi atau tujuan, membungkus barang yang akan dikirim dengan packet, mengirim packet yang sudah dibungkus, menerima packet yang sudah dikirim.</p>',
									UserId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '11e8ab61-aba9-4b79-831e-a6763ef1b681',
							Lovers: [],
							RespondenUserName: 'Vincent Benedict',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Membuat networkLink untuk saling menghubungkan console dengan link address satu dengan console link address lainnya, Menginput destinasi atau tujuan, membungkus barang yang akan dikirim dengan packet, mengirim packet yang sudah dibungkus, menerima packet yang sudah dikirim.</p>',
							UserId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Vincent Benedict',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930872270+0700)/',
								Text:
									'<p>1. Jelaskan alur network link dari awal sampai akhir&nbsp;</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '5d0b13e0-badb-4670-b641-3e0a7d55d8b3',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>1. Jelaskan alur network link dari awal sampai akhir&nbsp;</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595950254972+0700)/',
									Text:
										'<p>Thread kernel yang berfungsi untuk memberikan akses kepada thread thread yang sedang berjalan untuk menyeimbangkan mesin stabil dengan menggunakan kernel yang mejadi pusat dari OS<br/></p>',
									UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '0d84dd18-45e5-4f45-b268-7a3cbd1d83b9',
							Lovers: [],
							RespondenUserName: 'Stanley Dave Teherag',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Thread kernel yang berfungsi untuk memberikan akses kepada thread thread yang sedang berjalan untuk menyeimbangkan mesin stabil dengan menggunakan kernel yang mejadi pusat dari OS<br/></p>',
							UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Stanley Dave Teherag',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930872270+0700)/',
								Text: '<p>2. ThreadKernel itu berfungsi sebagai apa ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '9419d2a4-5622-4226-b794-79259aec51d1',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text: '<p>2. ThreadKernel itu berfungsi sebagai apa ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595948474337+0700)/',
									Text:
										'<p>Semaphore dimulai dari 0. ketika bertemu??<span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">semaphore.P(), angka??<span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">semaphore akan dikurangi 1 dan ketika ketemu??<span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">semaphore.V(), angkanya akan ditambahkan. ketika angka tersebut dibawah 0 maka threadnya akan sleep hingga angkanya diatas sama dengan 0</span></span></span></p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'b7e2c86f-5afd-4520-b1c6-f6fde1ce4cad',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Semaphore dimulai dari 0. ketika bertemu??<span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">semaphore.P(), angka??<span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">semaphore akan dikurangi 1 dan ketika ketemu??<span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">semaphore.V(), angkanya akan ditambahkan. ketika angka tersebut dibawah 0 maka threadnya akan sleep hingga angkanya diatas sama dengan 0</span></span></span></p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595951168984+0700)/',
									Text:
										'<p>semaphore.V adalah method semaphore yang digunakan untuk mengready thread yang ingin saya gunakan , semaphore.P (cek nilai sempahore ==0) kalau ==0 maka dia akan thread.sleep thread yang sedang kita laksanakan. jadi semaphore.P digunakan untuk thread.sleep dan semaphore.V untuk thread.ready</p>',
									UserId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'b9627425-5cd3-401c-96f5-d681c14bdf52',
							Lovers: [],
							RespondenUserName: 'Erwin',
							Status: null,
							StatusBy: null,
							Text:
								'<p>semaphore.V adalah method semaphore yang digunakan untuk mengready thread yang ingin saya gunakan , semaphore.P (cek nilai sempahore ==0) kalau ==0 maka dia akan thread.sleep thread yang sedang kita laksanakan. jadi semaphore.P digunakan untuk thread.sleep dan semaphore.V untuk thread.ready</p>',
							UserId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Erwin',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930872270+0700)/',
								Text: '<p>3. Jelaskan semaphore.V() dan semaphore.P()</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '2b6f0d4c-0247-4baa-9ef5-f5943209aaa4',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text: '<p>3. Jelaskan semaphore.V() dan semaphore.P()</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595945267840+0700)/',
									Text:
										'<p>NetworkLink.reliability = 1 berarti koneksi internet bagus dan tidak ada paket loss selama transfer data</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'b4e68818-2864-4778-83c7-68762dac22fd',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: null,
							StatusBy: null,
							Text:
								'<p>NetworkLink.reliability = 1 berarti koneksi internet bagus dan tidak ada paket loss selama transfer data</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930872270+0700)/',
								Text:
									'<p>4. apa itu&nbsp;</p><pre>NetworkLink.reliability = 1</pre>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '3f82052c-6429-4b2f-a48b-ab7783685ff3',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>4. apa itu&nbsp;</p><pre>NetworkLink.reliability = 1</pre>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595948956279+0700)/',
									Text:
										'<p>new String adalah syntax yang akan digunakan saat ingin membuat objek string, Sedangkan toString adalah syntax yang digunakan untuk memconvert objek / value menjadi sebuah String<br/></p>',
									UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '08ad8953-3eed-4a2a-b70d-bbe687999048',
							Lovers: [],
							RespondenUserName: 'Stanley Dave Teherag',
							Status: 'correct',
							StatusBy: 'NS17-1',
							Text:
								'<p>new String adalah syntax yang akan digunakan saat ingin membuat objek string, Sedangkan toString adalah syntax yang digunakan untuk memconvert objek / value menjadi sebuah String<br/></p>',
							UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Stanley Dave Teherag',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930872270+0700)/',
								Text: '<p>5. Bedanya new String dan ToString</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: 'e8367afa-f901-497e-a28d-cfecd2ce53c7',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text: '<p>5. Bedanya new String dan ToString</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: 'correct',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595948064917+0700)/',
									Text:
										'<p>untuk mengimplementasikan design pattern singleton, dengan memeriksa apakah sebuah instance sudah dibuat atau belum, jika sudah maka tidak akan dibuat instance yang baru, jika belum maka instance tersebut akan dibuat.</p>',
									UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'bbcfd142-b935-4351-bca2-0e58a83ed61b',
							Lovers: [],
							RespondenUserName: 'David',
							Status: null,
							StatusBy: null,
							Text:
								'<p>untuk mengimplementasikan design pattern singleton, dengan memeriksa apakah sebuah instance sudah dibuat atau belum, jika sudah maka tidak akan dibuat instance yang baru, jika belum maka instance tersebut akan dibuat.</p>',
							UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'David',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595948119379+0700)/',
									Text:
										'<p>untuk mendapatkan instance dari suatu class yang ingin kita gunakan. getinstance digunakan sebagai salah satu syarat pada design pattern singleton agar objek yang dihasilkan hanya satu saja.</p>',
									UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'fbd96687-5b57-4bde-adcc-2bc10e82dfd4',
							Lovers: [],
							RespondenUserName: 'Lionel Ritchie',
							Status: null,
							StatusBy: null,
							Text:
								'<p>untuk mendapatkan instance dari suatu class yang ingin kita gunakan. getinstance digunakan sebagai salah satu syarat pada design pattern singleton agar objek yang dihasilkan hanya satu saja.</p>',
							UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Lionel Ritchie',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930872270+0700)/',
								Text: '<p>6. GetInstance pada template console untuk apa ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: 'c8b0c1ec-4f81-4064-8aad-d29b0210e931',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text: '<p>6. GetInstance pada template console untuk apa ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T035      ',
			TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Jonathan Ronald Honggo',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1596103200000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Scheduler',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<h1>1. Materi saya hampir null.</h1><h1>2. Saya mengaku skip-skip pada saat sesi pengajaran.</h1><h1>3. Saya sudah dipancing maksimal tapi masih tidak bisa.</h1>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595996077884+0700)/',
						Text:
							'<h1>1. Materi saya hampir null.</h1><h1>2. Saya mengaku skip-skip pada saat sesi pengajaran.</h1><h1>3. Saya sudah dipancing maksimal tapi masih tidak bisa.</h1>',
						UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
					},
				],
				Id: 'c8f11bf6-44b7-41c9-af98-f1d4e53f216f',
				UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
				UserName: 'Johanes Peter Vincentius',
			},
			PresentationDate: '/Date(1595996077674+0700)/',
			PresentationNo: 3,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595996077884+0700)/',
								Text: '<p>1. Jelaskan macam-macam algoritma scheduler.</p>',
								UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
							},
						],
						Id: 'e5e336a0-017e-4eab-ac03-5c44894ebe07',
						Lovers: [],
						RespondenUserName: 'Johanes Peter Vincentius',
						Status: null,
						StatusBy: null,
						Text: '<p>1. Jelaskan macam-macam algoritma scheduler.</p>',
						UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
						UserName: 'Johanes Peter Vincentius',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595996077884+0700)/',
								Text:
									'<p>2. Jelaskan fungsi dari setiap method yang diimplementasi pada saat meng-extends class ThreadQueue</p>',
								UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
							},
						],
						Id: '63f45a97-05e7-40cf-96fc-31e98302a1f8',
						Lovers: [],
						RespondenUserName: 'Johanes Peter Vincentius',
						Status: null,
						StatusBy: null,
						Text:
							'<p>2. Jelaskan fungsi dari setiap method yang diimplementasi pada saat meng-extends class ThreadQueue</p>',
						UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
						UserName: 'Johanes Peter Vincentius',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595996077884+0700)/',
								Text: '<p>3. Perbedaan KThread dan Thread</p>',
								UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
							},
						],
						Id: '73d0e716-01dd-49ea-ba12-be1d56533c21',
						Lovers: [],
						RespondenUserName: 'Johanes Peter Vincentius',
						Status: null,
						StatusBy: null,
						Text: '<p>3. Perbedaan KThread dan Thread</p>',
						UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
						UserName: 'Johanes Peter Vincentius',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595996077884+0700)/',
								Text:
									'<p>4.&nbsp; Bagaimana&nbsp; cara mengimplementasi scheduler untuk menjalankan thread sesuai dengan algoritma schedulernya?</p>',
								UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
							},
						],
						Id: '57bae13e-2916-4cd7-a442-eb2a9ac6fffc',
						Lovers: [],
						RespondenUserName: 'Johanes Peter Vincentius',
						Status: null,
						StatusBy: null,
						Text:
							'<p>4.&nbsp; Bagaimana&nbsp; cara mengimplementasi scheduler untuk menjalankan thread sesuai dengan algoritma schedulernya?</p>',
						UserId: '7ede1530-36c7-e811-8260-d8d385fce79e',
						UserName: 'Johanes Peter Vincentius',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T057      ',
			TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Johanes Peter Vincentius',
		},

		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1596016800000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'File System',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Materi Berantakan</p><p>2. Pembawaan Berantakan</p><p>3. Kurang Interaksi dengan mahasiswa</p><p>4. Rapiin kodingan (campur bahasa, upper lower case, enter kebanyakan)</p><p>5. Kurang penjelasan teori</p><p>6. Control kelas kurang</p><p>7. Saya belum bisa pertanyaan subco</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595930279456+0700)/',
						Text:
							'<p>1. Materi Berantakan</p><p>2. Pembawaan Berantakan</p><p>3. Kurang Interaksi dengan mahasiswa</p><p>4. Rapiin kodingan (campur bahasa, upper lower case, enter kebanyakan)</p><p>5. Kurang penjelasan teori</p><p>6. Control kelas kurang</p><p>7. Saya belum bisa pertanyaan subco</p>',
						UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
					},
				],
				Id: '726ab582-e0ae-4f10-97ca-bf4e0716298f',
				UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
				UserName: 'Felix Novando',
			},
			PresentationDate: '/Date(1595930279298+0700)/',
			PresentationNo: 1,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930279456+0700)/',
								Text:
									'<pre>&nbsp;</pre><pre>\tpublic void readFIle(String nama) {\n\t\tOpenFile file = fileSystem.open(nama, false);\n\t\tif(file==null) {\n\t\t\tconsole.println("tidak ada data");\n\t\t}\n\t\telse {\n\t\t\tbyte[] dataByte = new byte[1000];\n\t\t\t\n\t\t\tfile.read(dataByte, 0, dataByte.length);\n\t\t\tString output = new String(dataByte);\n\t\t\tconsole.print(output+" kak Ziggy ganteng");\n\t\t}\n\t}</pre><p>kenapa "kak Ziggy ganteng" nya gak muncul ?</p>',
								UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
							},
						],
						Id: 'cd1348d2-7885-4d22-bc94-267197651220',
						Lovers: [],
						RespondenUserName: 'Felix Novando',
						Status: null,
						StatusBy: null,
						Text:
							'<pre>&nbsp;</pre><pre>\tpublic void readFIle(String nama) {\n\t\tOpenFile file = fileSystem.open(nama, false);\n\t\tif(file==null) {\n\t\t\tconsole.println("tidak ada data");\n\t\t}\n\t\telse {\n\t\t\tbyte[] dataByte = new byte[1000];\n\t\t\t\n\t\t\tfile.read(dataByte, 0, dataByte.length);\n\t\t\tString output = new String(dataByte);\n\t\t\tconsole.print(output+" kak Ziggy ganteng");\n\t\t}\n\t}</pre><p>kenapa "kak Ziggy ganteng" nya gak muncul ?</p>',
						UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
						UserName: 'Felix Novando',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595946881853+0700)/',
									Text:
										'<p>Dengan melakukan read file terlebih dahulu, ditampung di suatu buffer, ditambahkan dengan nilai baru, lalu di write kembali</p><p></p><p>private void appendFile(String fileName, String fileContent) {</p><p>?? ?? ?? ?? ?? ?? ??//melakukan open file</p><p>?? ?? ?? ?? ??OpenFile file = filesystem.open(fileName, false);</p><p>?? ?? ?? ?? if(file==null) {</p><p>?? ?? ?? ?? ?? ?? ?? ??console.println(&#34;File not found&#34;);</p><p>?? ?? ?? ?? ??}</p><p>?? ?? ?? ??else {</p><p>?? ?? ?? ?? ?? ?? ?? // siapkan buffer</p><p>?? ?? ?? ?? ?? ?? ?? byte[] fileContentByte = new byte[9999];</p><p>?? ?? ?? ?? ?? ?? ?? ??// read lalu masukan ke buffer</p><p>?? ?? ?? ?? ?? ?? file.read(fileContentByte,0, fileContentByte.length);</p><p>?? ?? ?? ?? ?? ?? ?? // lakukan append di buffer</p><p>?? ?? ?? ?? ?? ?? fileContentByte = fileContent.getBytes();</p><p>?? ?? ?? ?? ?? ?? ?? //di write kembali</p><p>?? ?? ?? ?? ?? ?? file.write(fileContentByte, 0, fileContentByte.length);</p><p>?? ?? ?? ?? }</p><p>}<br/></p>',
									UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd9404880-8f69-46b2-a890-eba60fe0ff25',
							Lovers: [],
							RespondenUserName: 'Felix Novando',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Dengan melakukan read file terlebih dahulu, ditampung di suatu buffer, ditambahkan dengan nilai baru, lalu di write kembali</p><p></p><p>private void appendFile(String fileName, String fileContent) {</p><p>?? ?? ?? ?? ?? ?? ??//melakukan open file</p><p>?? ?? ?? ?? ??OpenFile file = filesystem.open(fileName, false);</p><p>?? ?? ?? ?? if(file==null) {</p><p>?? ?? ?? ?? ?? ?? ?? ??console.println(&#34;File not found&#34;);</p><p>?? ?? ?? ?? ??}</p><p>?? ?? ?? ??else {</p><p>?? ?? ?? ?? ?? ?? ?? // siapkan buffer</p><p>?? ?? ?? ?? ?? ?? ?? byte[] fileContentByte = new byte[9999];</p><p>?? ?? ?? ?? ?? ?? ?? ??// read lalu masukan ke buffer</p><p>?? ?? ?? ?? ?? ?? file.read(fileContentByte,0, fileContentByte.length);</p><p>?? ?? ?? ?? ?? ?? ?? // lakukan append di buffer</p><p>?? ?? ?? ?? ?? ?? fileContentByte = fileContent.getBytes();</p><p>?? ?? ?? ?? ?? ?? ?? //di write kembali</p><p>?? ?? ?? ?? ?? ?? file.write(fileContentByte, 0, fileContentByte.length);</p><p>?? ?? ?? ?? }</p><p>}<br/></p>',
							UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Felix Novando',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930279456+0700)/',
								Text: '<p>&nbsp;Bagaimana cara append di File System</p>',
								UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
							},
						],
						Id: 'c7e2ac6a-7e92-4aaa-80e7-48025d664216',
						Lovers: [],
						RespondenUserName: 'Felix Novando',
						Status: null,
						StatusBy: null,
						Text: '<p>&nbsp;Bagaimana cara append di File System</p>',
						UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
						UserName: 'Felix Novando',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930279456+0700)/',
								Text:
									'<p>Bagaimana cara menambahkan symbol dalam penamaan di file system (example : !danny_ganteng.txt )</p>',
								UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
							},
						],
						Id: '8343751d-64e8-4779-b0f0-263954b91d81',
						Lovers: [],
						RespondenUserName: 'Felix Novando',
						Status: null,
						StatusBy: null,
						Text:
							'<p>Bagaimana cara menambahkan symbol dalam penamaan di file system (example : !danny_ganteng.txt )</p>',
						UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
						UserName: 'Felix Novando',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595980384310+0700)/',
									Text:
										'<p>Dengan menambahkan opsi &#34;FileSystem.testDirectory = .&#34; pada file nachos.conf<br/></p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd66e1e24-c7c7-43df-b8cd-76bdc37fa7b8',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Dengan menambahkan opsi &#34;FileSystem.testDirectory = .&#34; pada file nachos.conf<br/></p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930279456+0700)/',
								Text:
									'<p>Bagaimana cara membuat file diluar environment Nachos (diluar nachos.test)</p>',
								UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
							},
						],
						Id: '2d288543-b33e-4c7e-8845-8af00477ca8f',
						Lovers: [],
						RespondenUserName: 'Felix Novando',
						Status: null,
						StatusBy: null,
						Text:
							'<p>Bagaimana cara membuat file diluar environment Nachos (diluar nachos.test)</p>',
						UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
						UserName: 'Felix Novando',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930279456+0700)/',
								Text:
									'<pre>\tpublic void writeFIle(String nama, String isi) {\n\t\t\n\t\tOpenFile file = fileSystem.open(nama,true);\n\t\t//byte\n\t\t\n\t\tbyte[] isiByte = isi.getBytes();\n\t\t\n\t\tfile.write(isiByte,0,isiByte.length);\n\t\t\n\t}</pre><p>&nbsp;Kenapa saya menggunakan isiByte.length bukan isi.length ?. jika saya salah mohon dibenarkan !</p>',
								UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
							},
						],
						Id: '7c1ddf7d-b19b-41c6-b70f-f6c0ec08baae',
						Lovers: [],
						RespondenUserName: 'Felix Novando',
						Status: null,
						StatusBy: null,
						Text:
							'<pre>\tpublic void writeFIle(String nama, String isi) {\n\t\t\n\t\tOpenFile file = fileSystem.open(nama,true);\n\t\t//byte\n\t\t\n\t\tbyte[] isiByte = isi.getBytes();\n\t\t\n\t\tfile.write(isiByte,0,isiByte.length);\n\t\t\n\t}</pre><p>&nbsp;Kenapa saya menggunakan isiByte.length bukan isi.length ?. jika saya salah mohon dibenarkan !</p>',
						UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
						UserName: 'Felix Novando',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595949484594+0700)/',
									Text:
										'<p>java.lang.ExceptionInInitializerError??</p><p>config interrupt timer console user-check grader<br/></p><p>karena nachos memiliki interrupt yang akan di trigger saat user memberikan inputan, Scanner juga begitu, sehingga menyebabkan kedua interupt saling berlawanan</p>',
									UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '47437b76-551c-4d4c-8cbd-3a089782566c',
							Lovers: [],
							RespondenUserName: 'Felix Novando',
							Status: null,
							StatusBy: null,
							Text:
								'<p>java.lang.ExceptionInInitializerError??</p><p>config interrupt timer console user-check grader<br/></p><p>karena nachos memiliki interrupt yang akan di trigger saat user memberikan inputan, Scanner juga begitu, sehingga menyebabkan kedua interupt saling berlawanan</p>',
							UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Felix Novando',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595930279456+0700)/',
								Text:
									'<p>&nbsp;kenapa kalau nachos dikasih Scanner error , tetapi vector tidak&nbsp; ?</p>',
								UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
							},
						],
						Id: '44da4f24-251e-4359-86c8-6c1e649a72d2',
						Lovers: [],
						RespondenUserName: 'Felix Novando',
						Status: null,
						StatusBy: null,
						Text:
							'<p>&nbsp;kenapa kalau nachos dikasih Scanner error , tetapi vector tidak&nbsp; ?</p>',
						UserId: '05786a0a-b6c1-e811-8260-d8d385fce79e',
						UserName: 'Felix Novando',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T048      ',
			TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Felix Novando',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1596016800000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'File System',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Saya tidak bisa menyelesaikan tantangan sederhana dari pic</p><p>2. Materi saya lumayan baik</p><p>3. Font saya lupa diperbesar</p><p>4. Suara sudah lumayan keras</p><p>5. Rangkai kata-kata dengan baik sebelum menjelaskan</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595928659832+0700)/',
						Text:
							'<p>1. Saya tidak bisa menyelesaikan tantangan sederhana dari pic</p><p>2. Materi saya lumayan baik</p><p>3. Font saya lupa diperbesar</p><p>4. Suara sudah lumayan keras</p><p>5. Rangkai kata-kata dengan baik sebelum menjelaskan</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
					},
				],
				Id: '06f95dc6-8c9e-49a4-8b2d-a21382712311',
				UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
				UserName: 'Clarissa Chuardi',
			},
			PresentationDate: '/Date(1595928659672+0700)/',
			PresentationNo: 2,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595980343875+0700)/',
									Text:
										'<pre>bytebyte[] filebyte = message.getBytes();&#10;file.write(filebyte, 0, filecontent.price);<br/></pre><p>dengan menggunakan kodingan ini, kita dapat memprint data yang telah diupdate ditambah didengan yang sebelumnya</p>',
									UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '4a9f479a-5683-48fe-8212-945d386c91a3',
							Lovers: [],
							RespondenUserName: 'Clarissa Chuardi',
							Status: null,
							StatusBy: null,
							Text:
								'<pre>bytebyte[] filebyte = message.getBytes();&#10;file.write(filebyte, 0, filecontent.price);<br/></pre><p>dengan menggunakan kodingan ini, kita dapat memprint data yang telah diupdate ditambah didengan yang sebelumnya</p>',
							UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Clarissa Chuardi',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595928659831+0700)/',
								Text:
									'<pre>byte[] filebyte = new byte[999];\n\t\t\t\n\t\t\tfile.read(filebyte, 0, filebyte.length);\n\t\t\tfile.write(filebyte, 0, filebyte.length);\n\t\t\tfilebyte=message.getBytes();\n\t\t\t\n\t\t\tSystem.out.println(new String(filebyte));</pre><p>Bagaimana cara untuk memprint data yang sebelumnya ada di txt lalu diappend dengan data yang baru?</p>',
								UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
							},
						],
						Id: '85914dd5-dfc4-4135-8dc5-5f5a7b55452e',
						Lovers: [],
						RespondenUserName: 'Clarissa Chuardi',
						Status: null,
						StatusBy: null,
						Text:
							'<pre>byte[] filebyte = new byte[999];\n\t\t\t\n\t\t\tfile.read(filebyte, 0, filebyte.length);\n\t\t\tfile.write(filebyte, 0, filebyte.length);\n\t\t\tfilebyte=message.getBytes();\n\t\t\t\n\t\t\tSystem.out.println(new String(filebyte));</pre><p>Bagaimana cara untuk memprint data yang sebelumnya ada di txt lalu diappend dengan data yang baru?</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
						UserName: 'Clarissa Chuardi',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595977245162+0700)/',
									Text:
										'<p>karena scanner bukan komponen dari operating systems</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '6bc85420-0778-4ea3-a216-f3cb2a43803d',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>karena scanner bukan komponen dari operating systems</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595928659831+0700)/',
								Text:
									'<p>Kenapa saya inisialisasi scanner di nachos bakal terjadi error?</p>',
								UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
							},
						],
						Id: 'fb790937-86f7-454a-9e1d-06264500da3f',
						Lovers: [],
						RespondenUserName: 'Clarissa Chuardi',
						Status: null,
						StatusBy: null,
						Text:
							'<p>Kenapa saya inisialisasi scanner di nachos bakal terjadi error?</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
						UserName: 'Clarissa Chuardi',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T116      ',
			TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Clarissa Chuardi',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1596016800000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Network Link',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Materi saya cukup</p><p>2. Kontrol kelas tidak ada</p><p>3. saya bisa pertanyaan subco</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595928820339+0700)/',
						Text:
							'<p>1. Materi saya cukup</p><p>2. Kontrol kelas tidak ada</p><p>3. saya bisa pertanyaan subco</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
					},
				],
				Id: '35fb7ae0-2637-4bd2-8179-f67a60a0b4a2',
				UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
				UserName: 'David',
			},
			PresentationDate: '/Date(1595928820192+0700)/',
			PresentationNo: 1,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595975257414+0700)/',
									Text:
										'<p>Yang saya temukan untuk dapat menjalankan class ElevatorTest</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'ce6bbc38-a4d8-4224-9ed0-e0bb01c84c07',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Yang saya temukan untuk dapat menjalankan class ElevatorTest</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595928820339+0700)/',
								Text: '<p>&nbsp;apa itu Machine.Bank?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: '538bd77c-83ab-48ea-9427-fa651fdfcf89',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text: '<p>&nbsp;apa itu Machine.Bank?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595928820339+0700)/',
								Text:
									'<p>berapa batas console yang dapat dibuka untuk network link?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: 'dfe1da73-365b-4e26-99d0-95d582d174e0',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text:
							'<p>berapa batas console yang dapat dibuka untuk network link?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595928820339+0700)/',
								Text:
									'<pre> static {\n\thash = System.getProperty("user.name").hashCode();\n\tportBase = 0x4E41 + Math.abs(hash%0x4E41);\n\tnetworkID  = (byte) (hash/0x4E41);\t\n    }\t</pre><p>apa arti code tersebut dalam class networklink?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: '1ef1119a-2f40-4beb-8e12-2d825cc6bff0',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text:
							'<pre> static {\n\thash = System.getProperty("user.name").hashCode();\n\tportBase = 0x4E41 + Math.abs(hash%0x4E41);\n\tnetworkID  = (byte) (hash/0x4E41);\t\n    }\t</pre><p>apa arti code tersebut dalam class networklink?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595928820339+0700)/',
								Text:
									'<p>jika saya membuat scanner pada project nachos akan muncul<b>&nbsp;</b><span style="background-color: initial;"><b>java.lang.SecurityException,&nbsp;</b></span><span style="background-color: initial;">bagaimana cara agar saya dapat menggunakan scanner pada nachos project?&nbsp;</span></p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: '82d9708a-a55d-4e27-8dbc-f225d5dfd6bd',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text:
							'<p>jika saya membuat scanner pada project nachos akan muncul<b>&nbsp;</b><span style="background-color: initial;"><b>java.lang.SecurityException,&nbsp;</b></span><span style="background-color: initial;">bagaimana cara agar saya dapat menggunakan scanner pada nachos project?&nbsp;</span></p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595928820339+0700)/',
								Text:
									'<p>apa bedanya networklink yang ada di nachos dengan socket?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: '2016a9ff-828b-4b43-a873-08b0752a8a92',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text:
							'<p>apa bedanya networklink yang ada di nachos dengan socket?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595948717563+0700)/',
									Text:
										'<p>NetworkLink.reliability adalah kemungkinan suatu packet tidak dapat terkirim oleh jaringannya. Nilainya antar 0 dan 1. 1 itu berarti paket nya akan selalu terkirim dengan tepat</p>',
									UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '38cb253a-7065-43da-86dc-d72257655902',
							Lovers: [],
							RespondenUserName: 'Lionel Ritchie',
							Status: null,
							StatusBy: null,
							Text:
								'<p>NetworkLink.reliability adalah kemungkinan suatu packet tidak dapat terkirim oleh jaringannya. Nilainya antar 0 dan 1. 1 itu berarti paket nya akan selalu terkirim dengan tepat</p>',
							UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Lionel Ritchie',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595928820339+0700)/',
								Text:
									'<p>apa itu fungsi dari&nbsp;<span style="background-color: initial;"><b>NetworkLink.reliability ?</b></span></p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: 'ac2892a7-0e22-4b86-ad83-e31c19d0fc41',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text:
							'<p>apa itu fungsi dari&nbsp;<span style="background-color: initial;"><b>NetworkLink.reliability ?</b></span></p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T059      ',
			TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'David',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1596016800000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Serial Console & Timer',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Materi Saya oke</p><p>2. Control kelas oke</p><p>3. Interaksi dengan mahasiswa oke</p><h2>4. namun PIC presentasi rasa saya menghafal</h2><p>5. teman - teman 20-2 harap presentasi seperti saya tapi jangan hafal.</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595909291050+0700)/',
						Text:
							'<p>1. Materi Saya oke</p><p>2. Control kelas oke</p><p>3. Interaksi dengan mahasiswa oke</p><h2>4. namun PIC presentasi rasa saya menghafal</h2><p>5. teman - teman 20-2 harap presentasi seperti saya tapi jangan hafal.</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
					},
				],
				Id: '6bfcd84b-a512-430e-8810-82fb3eaf3e6f',
				UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
				UserName: 'Thaddeus Cleo',
			},
			PresentationDate: '/Date(1595909290904+0700)/',
			PresentationNo: 1,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595950432102+0700)/',
									Text:
										'<p>1. Console mengambil concole dari class Machine</p><p>2. membuat semaphore dan diset ke value (0) / waiting</p><p>2. Console membuat interupt untuk menghandle read (di trigger saat melakukan read ) dan sent (di trigger saat akan print),</p><p>3. Console membuat semaphore :</p><p>dalam method read, semaphore diset P lalu di Runnable read dicek apakah sudah akhir kalimat, jika iya semaphore diset V, jika tidak, lanjutkan append String</p><p>dalam method write, semaphore diset P, lalu di Runnable sent di set V</p>',
									UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '3aead301-d8a1-4c34-bbc5-f3192566979a',
							Lovers: [],
							RespondenUserName: 'Felix Novando',
							Status: null,
							StatusBy: null,
							Text:
								'<p>1. Console mengambil concole dari class Machine</p><p>2. membuat semaphore dan diset ke value (0) / waiting</p><p>2. Console membuat interupt untuk menghandle read (di trigger saat melakukan read ) dan sent (di trigger saat akan print),</p><p>3. Console membuat semaphore :</p><p>dalam method read, semaphore diset P lalu di Runnable read dicek apakah sudah akhir kalimat, jika iya semaphore diset V, jika tidak, lanjutkan append String</p><p>dalam method write, semaphore diset P, lalu di Runnable sent di set V</p>',
							UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Felix Novando',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595950559742+0700)/',
									Text:
										'<p>proses membaca dan print pada saat console dengan cara mengkonvert setiap char pada string menjadi byte sehingga dapat digunakan untuk diproses pada saat membaca dan print. Dalam proses tersebut, terdapat semaphore dimana dia akan meratakan proses tersebut dengan menggunakan action P() dan V() dimana P digunakan untuk menghentikan proses sementara dan V untuk menjalankan proses??</p>',
									UserId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '04c7a8d4-d04a-4493-b737-52dd1c514486',
							Lovers: [],
							RespondenUserName: 'Bryan Takari',
							Status: null,
							StatusBy: null,
							Text:
								'<p>proses membaca dan print pada saat console dengan cara mengkonvert setiap char pada string menjadi byte sehingga dapat digunakan untuk diproses pada saat membaca dan print. Dalam proses tersebut, terdapat semaphore dimana dia akan meratakan proses tersebut dengan menggunakan action P() dan V() dimana P digunakan untuk menghentikan proses sementara dan V untuk menjalankan proses??</p>',
							UserId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Bryan Takari',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595953405976+0700)/',
									Text:
										'<p>console akan menerima inputan dan dikonversikan menjadi dalam bentuk byte, sedangkan ketika ingin print dia akan mengirim tipe data byte dan kita harus menggunakan syntax toString untuk mengubah bentuk2 byte itu menjadi string lalu kita print</p>',
									UserId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '91fe7f6f-0259-4e94-a57e-f8e590c22986',
							Lovers: [],
							RespondenUserName: 'Erwin',
							Status: null,
							StatusBy: null,
							Text:
								'<p>console akan menerima inputan dan dikonversikan menjadi dalam bentuk byte, sedangkan ketika ingin print dia akan mengirim tipe data byte dan kita harus menggunakan syntax toString untuk mengubah bentuk2 byte itu menjadi string lalu kita print</p>',
							UserId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Erwin',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595909291050+0700)/',
								Text:
									'<p>1.&nbsp; jelaskan proses console membaca dan print</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: '1a3a3b53-affd-48ba-aee4-3c274f4868a6',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text: '<p>1.&nbsp; jelaskan proses console membaca dan print</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595913151219+0700)/',
									Text: '<p>dalam 1 second terdapat 10 juta ticks</p>',
									UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '92ed5303-4af5-4676-b6b2-648e646f02c6',
							Lovers: [],
							RespondenUserName: 'David',
							Status: null,
							StatusBy: null,
							Text: '<p>dalam 1 second terdapat 10 juta ticks</p>',
							UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'David',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595909291050+0700)/',
								Text: '<p>2. Berapa jumlah tick dalam satu seconds ?</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: '8ff1e3ed-4272-47f5-8992-c1f2c8494bd5',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text: '<p>2. Berapa jumlah tick dalam satu seconds ?</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595914273738+0700)/',
									Text:
										'<p>Receive interrupt handler terpanggil saat SerialConsole menggunakan method readBytes</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '1adf3b10-5938-436b-9285-eff60317af81',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Receive interrupt handler terpanggil saat SerialConsole menggunakan method readBytes</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595909291050+0700)/',
								Text: '<p>3. Kapan Receive interup handler terpanggil</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: 'e3e68d1b-0de7-4f22-8e1c-d80a1003a741',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text: '<p>3. Kapan Receive interup handler terpanggil</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595914100598+0700)/',
									Text:
										'<p>Runnable pada timer akan berjalan setiap 500 ticks sekali</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '1c2bb171-5226-4f4d-b73b-bfb7d932bee2',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: 'correct',
							StatusBy: 'CP18-1',
							Text:
								'<p>Runnable pada timer akan berjalan setiap 500 ticks sekali</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595909291050+0700)/',
								Text:
									'<p>4 Runnable dalam timer akan berjalan dalam setiap . . .</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: '96f20177-eb64-4e7e-93e4-071ba70ddeee',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>4 Runnable dalam timer akan berjalan dalam setiap . . .</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: 'correct',
					StatusBy: 'CP18-1',
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T084      ',
			TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Thaddeus Cleo',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1596016800000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Serkon & time',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1.Materi saya kurang<br>2.OOP saya lecet sedikit<br>3.Interaksi dengan mahasiswa ada<br>4.Control class ada<br></p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595911864764+0700)/',
						Text:
							'<p>1.Materi saya kurang<br>2.OOP saya lecet sedikit<br>3.Interaksi dengan mahasiswa ada<br>4.Control class ada<br></p>',
						UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
					},
				],
				Id: 'acb15af3-4856-45a2-ac8d-49cc880ca8a9',
				UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
				UserName: 'Erwin',
			},
			PresentationDate: '/Date(1595911864599+0700)/',
			PresentationNo: 2,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595911864763+0700)/',
								Text:
									'<p>Apa perbedaan dari console dan serial console dalam operating system</p>',
								UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
							},
						],
						Id: '8a16b818-8cbb-4fc8-9bf3-3deb3e9eaa24',
						Lovers: [],
						RespondenUserName: 'Erwin',
						Status: null,
						StatusBy: null,
						Text:
							'<p>Apa perbedaan dari console dan serial console dalam operating system</p>',
						UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
						UserName: 'Erwin',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595952179843+0700)/',
									Text:
										"<p>Karena processor melakukan read dalam bentuk 'byte' dalam setiap 8 byte (processor 64 bit), 4 byte (processor 32) dalam sekali read dalam satuan waktu</p>",
									UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'b18f4bea-a589-4fce-84cb-3122fdad77d0',
							Lovers: [],
							RespondenUserName: 'Felix Novando',
							Status: null,
							StatusBy: null,
							Text:
								"<p>Karena processor melakukan read dalam bentuk 'byte' dalam setiap 8 byte (processor 64 bit), 4 byte (processor 32) dalam sekali read dalam satuan waktu</p>",
							UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Felix Novando',
						},
					],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595911864763+0700)/',
								Text:
									'<p>Mengapa serial console hanya dapat menerima 1 byte setiap waktu</p>',
								UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
							},
						],
						Id: 'd4674659-d593-4601-b1be-fd74a4f03efb',
						Lovers: [],
						RespondenUserName: 'Erwin',
						Status: null,
						StatusBy: null,
						Text:
							'<p>Mengapa serial console hanya dapat menerima 1 byte setiap waktu</p>',
						UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
						UserName: 'Erwin',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595911864763+0700)/',
								Text:
									'<p>method apa yang dijalankan saat nanchos pertama kali jalan (selain method run pada threaderkernel)</p>',
								UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
							},
						],
						Id: '5ddaa049-baa1-4468-a33f-796bf0debd40',
						Lovers: [],
						RespondenUserName: 'Erwin',
						Status: null,
						StatusBy: null,
						Text:
							'<p>method apa yang dijalankan saat nanchos pertama kali jalan (selain method run pada threaderkernel)</p>',
						UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
						UserName: 'Erwin',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [],
					DeadlinePassed: false,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595911864763+0700)/',
								Text:
									'<p>Bagaimana cara ngecek configurasi nachos tanpa membuka nachos.conf</p>',
								UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
							},
						],
						Id: '05e175fc-4b46-46e1-b4b6-286b5c632174',
						Lovers: [],
						RespondenUserName: 'Erwin',
						Status: null,
						StatusBy: null,
						Text:
							'<p>Bagaimana cara ngecek configurasi nachos tanpa membuka nachos.conf</p>',
						UserId: '239ed8e8-7eb7-e811-8260-d8d385fce79e',
						UserName: 'Erwin',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T044      ',
			TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Erwin',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1595671200000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Design Pattern',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Materi kosong</p><h1>2. saya ngoding 1 frame 40 menit dan itu masih error</h1><h2>3. Progress saya menurun drastis&nbsp;</h2><h2>4. Saya hopeless di Java</h2><h1>5. Teman-teman bantu saya, saya masi semangat training</h1>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595575292982+0700)/',
						Text:
							'<p>1. Materi kosong</p><h1>2. saya ngoding 1 frame 40 menit dan itu masih error</h1><h2>3. Progress saya menurun drastis&nbsp;</h2><h2>4. Saya hopeless di Java</h2><h1>5. Teman-teman bantu saya, saya masi semangat training</h1>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
					},
				],
				Id: '286ae926-d2cc-46a6-ab59-4ec2462acab9',
				UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
				UserName: 'Veronica',
			},
			PresentationDate: '/Date(1595575292836+0700)/',
			PresentationNo: 2,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595660042839+0700)/',
									Text:
										'<p>Database adalah kumpulan data yang disimpan untuk dikelola karena data sangat berharga di era sekarang ini. Codingan database sebenarnya tidak begitu krusial dalam mengcoding design pattern, karena itu dapat digantikan dengan Vector ataupun ArrayList.</p>',
									UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'ef51af7b-70da-49d8-ab29-58f2792afe6a',
							Lovers: [],
							RespondenUserName: 'Veronica',
							Status: 'wrong',
							StatusBy: 'IX19-2',
							Text:
								'<p>Database adalah kumpulan data yang disimpan untuk dikelola karena data sangat berharga di era sekarang ini. Codingan database sebenarnya tidak begitu krusial dalam mengcoding design pattern, karena itu dapat digantikan dengan Vector ataupun ArrayList.</p>',
							UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Veronica',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595764164431+0700)/',
									Text:
										'<p>Kemarin saya ingin membuat program dimana ada insert, update dan delete barang. Query2 ini akan saya hubungkan dengan database. Peran design pattern singleton yang ingin saya gunakan berfungsi untuk jika ada lebih dari 1 user yang ingin mengakses query, maka proses nya harus dibuat sepert queue, yaitu mengunakan syntax synchronized</p>',
									UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '867d36fd-8e7c-4672-9ed0-fddd64e1ffb9',
							Lovers: [],
							RespondenUserName: 'Veronica',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Kemarin saya ingin membuat program dimana ada insert, update dan delete barang. Query2 ini akan saya hubungkan dengan database. Peran design pattern singleton yang ingin saya gunakan berfungsi untuk jika ada lebih dari 1 user yang ingin mengakses query, maka proses nya harus dibuat sepert queue, yaitu mengunakan syntax synchronized</p>',
							UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Veronica',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575292981+0700)/',
								Text:
									'<p>1. Hubungan antara codingan database saya dengan design pattern apa?</p>',
								UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
							},
						],
						Id: 'bcdd2bb2-f114-4f1b-8c79-88b51215b59e',
						Lovers: [],
						RespondenUserName: 'Veronica',
						Status: null,
						StatusBy: null,
						Text:
							'<p>1. Hubungan antara codingan database saya dengan design pattern apa?</p>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
						UserName: 'Veronica',
					},
					Status: 'wrong',
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595606129422+0700)/',
									Text:
										'<p>1. Creational : berhubungan dengan pembuatan atau inisialisasi (Singleton,Builder)</p><p>2. Structural?? : berhubungan dengan komposisi yang dimiliki suatu sistem (Composite)</p><p>3. Behavioral : berhubungan dengan komunikasi dalam suatu sistem antar object-objectnya(Template Method)??</p>',
									UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'b2494d91-bbe9-4807-a4f0-8658f38df371',
							Lovers: [],
							RespondenUserName: 'David',
							Status: 'correct',
							StatusBy: 'IX19-2',
							Text:
								'<p>1. Creational : berhubungan dengan pembuatan atau inisialisasi (Singleton,Builder)</p><p>2. Structural?? : berhubungan dengan komposisi yang dimiliki suatu sistem (Composite)</p><p>3. Behavioral : berhubungan dengan komunikasi dalam suatu sistem antar object-objectnya(Template Method)??</p>',
							UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'David',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575292981+0700)/',
								Text: '<p>2.&nbsp; Sebutkan jenis-jenis design pattern</p>',
								UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
							},
						],
						Id: '7ff62548-2903-463e-ae03-6a1b2ef9c942',
						Lovers: [],
						RespondenUserName: 'Veronica',
						Status: null,
						StatusBy: null,
						Text: '<p>2.&nbsp; Sebutkan jenis-jenis design pattern</p>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
						UserName: 'Veronica',
					},
					Status: 'correct',
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595619054642+0700)/',
									Text:
										'<p>merupakan sebuah arsitektur pattern yang membagi logika program menjadi 3 yaitu model, view, controller yang masing masing mempunyai tugasnya sendiri sendiri di dalam classnya sendiri.<br/></p>',
									UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '4e394097-90b0-45dc-84b2-0d3006124b1d',
							Lovers: [],
							RespondenUserName: 'Stanley Dave Teherag',
							Status: 'correct',
							StatusBy: 'IX19-2',
							Text:
								'<p>merupakan sebuah arsitektur pattern yang membagi logika program menjadi 3 yaitu model, view, controller yang masing masing mempunyai tugasnya sendiri sendiri di dalam classnya sendiri.<br/></p>',
							UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Stanley Dave Teherag',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575292981+0700)/',
								Text:
									'<p>3. View dan Controller tidak termasuk design pattern. Lalu termasuk apa?</p>',
								UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
							},
						],
						Id: 'c60a34a6-a46f-4984-bd22-8467d0cc389d',
						Lovers: [],
						RespondenUserName: 'Veronica',
						Status: null,
						StatusBy: null,
						Text:
							'<p>3. View dan Controller tidak termasuk design pattern. Lalu termasuk apa?</p>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
						UserName: 'Veronica',
					},
					Status: 'correct',
					StatusBy: 'IX19-2',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'Penjelasan masih tidak lengkap dan kurang menjawab',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595687281080+0700)/',
											Text:
												'Penjelasan masih tidak lengkap dan kurang menjawab',
											UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
										},
									],
									Id: 'dd114bd7-6674-4aa5-9c8e-f03c7692c22c',
									UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
									UserName: 'Natasia',
								},
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'Penjelasan masih tidak lengkap dan kurang menjawab',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595687281990+0700)/',
											Text:
												'Penjelasan masih tidak lengkap dan kurang menjawab',
											UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
										},
									],
									Id: 'da21483b-dc14-4439-8ad1-7f07a02123e4',
									UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
									UserName: 'Natasia',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595628167076+0700)/',
									Text:
										'<p>Singleton adalah sebuah Design Pattern, yang memungkinkan sebuah object untuk digunakan untuk semua proses</p>',
									UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'a26379b3-22c0-4325-9040-b283cce83749',
							Lovers: [],
							RespondenUserName: 'Johanes Peter Vincentius',
							Status: 'unchecked',
							StatusBy: 'NS17-1',
							Text:
								'<p>Singleton adalah sebuah Design Pattern, yang memungkinkan sebuah object untuk digunakan untuk semua proses</p>',
							UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Johanes Peter Vincentius',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595764305890+0700)/',
									Text:
										'<p>Singleton digunakan untuk jika ada?? lebih dari 1 thread yang ada, proses yang dijalankan tetap 1 per 1, seperti konsep queue, dimana harus antri hingga thread yang sebelumnya selesai dijalankan. Dengan menggunakan syntax synchronized</p>',
									UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '89576709-b9f6-4350-82e4-5dea9212c88c',
							Lovers: [],
							RespondenUserName: 'Veronica',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Singleton digunakan untuk jika ada?? lebih dari 1 thread yang ada, proses yang dijalankan tetap 1 per 1, seperti konsep queue, dimana harus antri hingga thread yang sebelumnya selesai dijalankan. Dengan menggunakan syntax synchronized</p>',
							UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Veronica',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595950988131+0700)/',
									Text:
										'<p>Singleton merupakan sebuah design pattern dimana singleton pattern ingin memecahkan masalah instance yang sering digunakan berkali kali dan menyebabkan alokasi memori yang tidak penting. Kegunaannya adalah menghemat penggunaan memori dan penggunaan sebuah objek yang lebih efisien<br/></p>',
									UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd3910217-f1ce-4f5e-bf6b-c6c75b0c97c0',
							Lovers: [],
							RespondenUserName: 'Stanley Dave Teherag',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Singleton merupakan sebuah design pattern dimana singleton pattern ingin memecahkan masalah instance yang sering digunakan berkali kali dan menyebabkan alokasi memori yang tidak penting. Kegunaannya adalah menghemat penggunaan memori dan penggunaan sebuah objek yang lebih efisien<br/></p>',
							UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Stanley Dave Teherag',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575292981+0700)/',
								Text:
									'<p>4. Apa itu singleton? dan Sebutkan kegunaan dari singleton</p>',
								UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
							},
						],
						Id: 'aa1c2d5d-e975-47b5-957b-88a173e317a6',
						Lovers: [],
						RespondenUserName: 'Veronica',
						Status: null,
						StatusBy: null,
						Text:
							'<p>4. Apa itu singleton? dan Sebutkan kegunaan dari singleton</p>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
						UserName: 'Veronica',
					},
					Status: 'wrong',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595766277680+0700)/',
									Text:
										'<p><span style="color: rgb(50, 50, 50);background-color: rgb(255, 255, 255);float: none;"><span>Double locking singleton kita perlu untuk mengecek instance sebanyak 2 kali.??</span></span></p><p><span style="color: rgb(50, 50, 50);background-color: rgb(255, 255, 255);float: none;"><span>2 thread dapat memasuki if condition secara bersamaan ketika instance == null. Lalu, thread yang pertama bisa masuk ke synchronized dan menginisialisasi instance, ketika yang lain antri. Ketika thread yang pertama keluar dari synchronized, thread lain yang sedang antri buat object Singleton yang baru. Perlu diketahui jika ketika ada 2 thread yang masuk ke synchronized, dia tidak mengecek kondisi if instance != null.</span></span></p><p><code class="htmlscript plain">public static Singleton</code><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">getInstance() {</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ??if (instance == null) {??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? ?? ?? ?? synchronized(Singleton.class) {??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? ?? ?? ?? ??if??</span><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">(instance == null)</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? ?? ?? ?? ?? ?? ??instance = new Singleton();</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? ?? ?? ??}??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? }??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ??return instance;??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">}</span></p>',
									UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'a817de96-1504-4a2b-93c4-08d31e9bd1ac',
							Lovers: [],
							RespondenUserName: 'Veronica',
							Status: null,
							StatusBy: null,
							Text:
								'<p><span style="color: rgb(50, 50, 50);background-color: rgb(255, 255, 255);float: none;"><span>Double locking singleton kita perlu untuk mengecek instance sebanyak 2 kali.??</span></span></p><p><span style="color: rgb(50, 50, 50);background-color: rgb(255, 255, 255);float: none;"><span>2 thread dapat memasuki if condition secara bersamaan ketika instance == null. Lalu, thread yang pertama bisa masuk ke synchronized dan menginisialisasi instance, ketika yang lain antri. Ketika thread yang pertama keluar dari synchronized, thread lain yang sedang antri buat object Singleton yang baru. Perlu diketahui jika ketika ada 2 thread yang masuk ke synchronized, dia tidak mengecek kondisi if instance != null.</span></span></p><p><code class="htmlscript plain">public static Singleton</code><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">getInstance() {</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ??if (instance == null) {??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? ?? ?? ?? synchronized(Singleton.class) {??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? ?? ?? ?? ??if??</span><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">(instance == null)</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? ?? ?? ?? ?? ?? ??instance = new Singleton();</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? ?? ?? ??}??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ?? }??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">?? ?? ??return instance;??</span></p><p><span style="background-color: rgb(249, 242, 244);color: rgb(199, 37, 78);">}</span></p>',
							UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Veronica',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575292981+0700)/',
								Text: '<p>5. Apa itu double checked locking singleton?</p>',
								UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
							},
						],
						Id: '8663b017-75ea-4b85-bff3-18fb930708c3',
						Lovers: [],
						RespondenUserName: 'Veronica',
						Status: null,
						StatusBy: null,
						Text: '<p>5. Apa itu double checked locking singleton?</p>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
						UserName: 'Veronica',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595659688608+0700)/',
									Text:
										'<pre style="color: rgb(53, 56, 51);text-align: left;">public static final??int EXIT_ON_CLOSE VS <strong style="color: rgb(53, 56, 51);text-align: left;"><b><a href="https://docs.oracle.com/javase/7/docs/api/javax/swing/JFrame.html#setDefaultCloseOperation(int)" style="color: rgb(76, 107, 135);">setDefaultCloseOperation</a></b></strong><span style="color: rgb(53, 56, 51);text-align: left;background-color: rgb(255, 255, 255);float: none;">(int??operation)</span></pre><div class="block" style="color: rgb(53, 56, 51);text-align: left;">ketika exit window, program terminate bersamaan. Perbedaanya adalah EXIT.ON.CLOSE secara default akan throws??<code style="color: rgb(199, 37, 78);background-color: rgb(249, 242, 244);text-align: left;">SecurityException</code><span style="color: rgb(53, 56, 51);text-align: left;background-color: rgb(255, 255, 255);">?? , maka lebih aman</span><br/></div>',
									UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'e3ed9abd-8a8a-4ca8-a283-3e72dabe2e47',
							Lovers: [],
							RespondenUserName: 'Veronica',
							Status: 'wrong',
							StatusBy: 'NS17-1',
							Text:
								'<pre style="color: rgb(53, 56, 51);text-align: left;">public static final??int EXIT_ON_CLOSE VS <strong style="color: rgb(53, 56, 51);text-align: left;"><b><a href="https://docs.oracle.com/javase/7/docs/api/javax/swing/JFrame.html#setDefaultCloseOperation(int)" style="color: rgb(76, 107, 135);">setDefaultCloseOperation</a></b></strong><span style="color: rgb(53, 56, 51);text-align: left;background-color: rgb(255, 255, 255);float: none;">(int??operation)</span></pre><div class="block" style="color: rgb(53, 56, 51);text-align: left;">ketika exit window, program terminate bersamaan. Perbedaanya adalah EXIT.ON.CLOSE secara default akan throws??<code style="color: rgb(199, 37, 78);background-color: rgb(249, 242, 244);text-align: left;">SecurityException</code><span style="color: rgb(53, 56, 51);text-align: left;background-color: rgb(255, 255, 255);">?? , maka lebih aman</span><br/></div>',
							UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Veronica',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595766435012+0700)/',
									Text:
										'<p>setDefaultCloseOperation(EXIT.ON.CLOSE); digunakan untuk terminate program yang sedang di execute ketika kita meng-close window.</p><p>Sedangkan?? tidak ada yang terjadi ketika??<span style="background-color: initial;">setDefaultCloseOperation(0); Hal ini sama dengan??<span style="color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);float: none;">setDefaultCloseOperation(<span style="color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);float: none;">DO_NOTHING_ON_CLOSE</span>) ;</span></span></p><p><span style="background-color: initial;"><br/></span></p>',
									UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '495a87cf-3477-4540-acb6-5069733f8640',
							Lovers: [],
							RespondenUserName: 'Veronica',
							Status: null,
							StatusBy: null,
							Text:
								'<p>setDefaultCloseOperation(EXIT.ON.CLOSE); digunakan untuk terminate program yang sedang di execute ketika kita meng-close window.</p><p>Sedangkan?? tidak ada yang terjadi ketika??<span style="background-color: initial;">setDefaultCloseOperation(0); Hal ini sama dengan??<span style="color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);float: none;">setDefaultCloseOperation(<span style="color: rgb(85, 85, 85);background-color: rgb(255, 255, 255);float: none;">DO_NOTHING_ON_CLOSE</span>) ;</span></span></p><p><span style="background-color: initial;"><br/></span></p>',
							UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Veronica',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595784601664+0700)/',
									Text:
										'<p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">setDefaultCloseOperation(EXIT.ON.CLOSE);<span>?? -&gt; Program akan di terminate ketika jendela JFrame kita di Close</span></span><br/></p><p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;"><span>sedangkan??<span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">setDefaultCloseOperation(0); -&gt; Jendela JFrame tidak bisa di close, kecuali anda terminate programnya.</span></span></span></p>',
									UserId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '73e7e982-0324-49ae-b815-096d13dd2ec7',
							Lovers: [],
							RespondenUserName: 'Vincent Benedict',
							Status: null,
							StatusBy: null,
							Text:
								'<p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">setDefaultCloseOperation(EXIT.ON.CLOSE);<span>?? -&gt; Program akan di terminate ketika jendela JFrame kita di Close</span></span><br/></p><p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;"><span>sedangkan??<span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">setDefaultCloseOperation(0); -&gt; Jendela JFrame tidak bisa di close, kecuali anda terminate programnya.</span></span></span></p>',
							UserId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Vincent Benedict',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575292981+0700)/',
								Text:
									'<p>6. Apa beda nya?</p><pre>setDefaultCloseOperation(0);</pre><pre>setDefaultCloseOperation(EXIT.ON.CLOSE);</pre>',
								UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
							},
						],
						Id: '42575e26-2393-4356-820d-0998183ea1f1',
						Lovers: [],
						RespondenUserName: 'Veronica',
						Status: null,
						StatusBy: null,
						Text:
							'<p>6. Apa beda nya?</p><pre>setDefaultCloseOperation(0);</pre><pre>setDefaultCloseOperation(EXIT.ON.CLOSE);</pre>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
						UserName: 'Veronica',
					},
					Status: 'wrong',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595607131780+0700)/',
									Text:
										"<p>Naming convention adalah aturan dalam memberikan nama pada variabel-variabel yang kita ingin gunakan, aturan ini tidak wajib diikuti tetapi akan lebih baik jika kita menurutinya agar orang lain dapat lebih mengerti apa yang kita buat</p><p>1. nama class dimulai dengan huruf kapital dan merupakan nama benda</p><p>2. nama Interface dimulai dengan huruf kapital dan merupakan kata sifat seperti Runnable, dan lain-lain</p><p>3. nama method atau function dimulai dengan huruf kecil, jika terdapat 2 kata maka huruf pertama pada kata kedua haruslah kapital dan 2 kata ini digabung</p><p>4. nama variabel dimulai dengan huruf kecil, tidak dimulai dengan character spesial(#,$,*,dll), hindari penggunaan variabel dengan 1 huruf saja</p><p>5. nama package dimulai dengan huruf kecil, jika terdapat lebih dari 1 kata maka di tengah kata-kata akan disambungkan dengan tanda '.'</p><p>6. nama Constant harus dikapital semua, jika terdapat lebih dari 1 kata maka akan disambung menggunakan tanda '_'</p><p><br/></p><p><br/></p><p><br/></p>",
									UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '0558fc12-7ea3-4e10-9cb5-06d3e7aa02e7',
							Lovers: [],
							RespondenUserName: 'David',
							Status: 'correct',
							StatusBy: 'CT19-2',
							Text:
								"<p>Naming convention adalah aturan dalam memberikan nama pada variabel-variabel yang kita ingin gunakan, aturan ini tidak wajib diikuti tetapi akan lebih baik jika kita menurutinya agar orang lain dapat lebih mengerti apa yang kita buat</p><p>1. nama class dimulai dengan huruf kapital dan merupakan nama benda</p><p>2. nama Interface dimulai dengan huruf kapital dan merupakan kata sifat seperti Runnable, dan lain-lain</p><p>3. nama method atau function dimulai dengan huruf kecil, jika terdapat 2 kata maka huruf pertama pada kata kedua haruslah kapital dan 2 kata ini digabung</p><p>4. nama variabel dimulai dengan huruf kecil, tidak dimulai dengan character spesial(#,$,*,dll), hindari penggunaan variabel dengan 1 huruf saja</p><p>5. nama package dimulai dengan huruf kecil, jika terdapat lebih dari 1 kata maka di tengah kata-kata akan disambungkan dengan tanda '.'</p><p>6. nama Constant harus dikapital semua, jika terdapat lebih dari 1 kata maka akan disambung menggunakan tanda '_'</p><p><br/></p><p><br/></p><p><br/></p>",
							UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'David',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575292981+0700)/',
								Text:
									'<p>7. Apa itu naming convention pada Java? Jelaskan apa saja naming convention di Java</p>',
								UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
							},
						],
						Id: 'e4890055-903f-4b69-82ab-c823eabe8f27',
						Lovers: [],
						RespondenUserName: 'Veronica',
						Status: null,
						StatusBy: null,
						Text:
							'<p>7. Apa itu naming convention pada Java? Jelaskan apa saja naming convention di Java</p>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
						UserName: 'Veronica',
					},
					Status: 'correct',
					StatusBy: 'CT19-2',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595605449726+0700)/',
									Text:
										'<p>Karena jika kita ingin menambahkan atribut - atribut lagi pada frame, tambahan nya tidak akan muncul lagi, bila setVisible tidak dipanggil. jadi kita gabungin dulu semua, baru pada akhirnya di setVisible</p>',
									UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd2085053-5b8c-4990-984f-c197681db1c3',
							Lovers: [],
							RespondenUserName: 'Felix Novando',
							Status: 'correct',
							StatusBy: 'CT19-2',
							Text:
								'<p>Karena jika kita ingin menambahkan atribut - atribut lagi pada frame, tambahan nya tidak akan muncul lagi, bila setVisible tidak dipanggil. jadi kita gabungin dulu semua, baru pada akhirnya di setVisible</p>',
							UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Felix Novando',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575292981+0700)/',
								Text: '<p>8. Kenapa setVisible harus letak di bawah?</p>',
								UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
							},
						],
						Id: '2134abc1-f8a4-4428-a97a-e430c146cdaa',
						Lovers: [],
						RespondenUserName: 'Veronica',
						Status: null,
						StatusBy: null,
						Text: '<p>8. Kenapa setVisible harus letak di bawah?</p>',
						UserId: 'a265d56b-98b0-e911-b1af-d8d385fce79e',
						UserName: 'Veronica',
					},
					Status: 'correct',
					StatusBy: 'CT19-2',
				},
			],
			SubjectId: 'aa349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T117      ',
			TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Veronica',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1595066400000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Max Heap',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Materi cukup tapi agak macet</p><p>2. Control kelas tidak ada</p><p>3. Penjelasan harus jelas, dipertegas</p><p>4. Penggunaan comment masih kurang</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1594957078070+0700)/',
						Text:
							'<p>1. Materi cukup tapi agak macet</p><p>2. Control kelas tidak ada</p><p>3. Penjelasan harus jelas, dipertegas</p><p>4. Penggunaan comment masih kurang</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
					},
				],
				Id: 'b819078b-b9d6-4b2e-a92e-aee985b9d5ca',
				UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
				UserName: 'Clarissa Chuardi',
			},
			PresentationDate: '/Date(1594957077900+0700)/',
			PresentationNo: 2,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1594965397487+0700)/',
									Text:
										'<p>kodingan tersebut bisa berjalan karena 3 merupakan value truthy pada C dan if(-1) hasilnya juga akan tetap jalan karena nilai apapun selain 0 merupakan nilai truthy dan akan dievaluasi sebagai true pada if tersebut.</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '6310113c-e4bd-478f-b59f-e2fcf8b03040',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: 'correct',
							StatusBy: 'IX19-2',
							Text:
								'<p>kodingan tersebut bisa berjalan karena 3 merupakan value truthy pada C dan if(-1) hasilnya juga akan tetap jalan karena nilai apapun selain 0 merupakan nilai truthy dan akan dievaluasi sebagai true pada if tersebut.</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594957078070+0700)/',
								Text:
									'<p>1.&nbsp;</p><pre>if(3){\n\t\tprintf("a");\n\t}</pre><p>Kenapa kodingan printfnya jalan?&nbsp; if(-1) hasilnya bagaimana?</p>',
								UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
							},
						],
						Id: 'afa396db-cc56-445a-9ae1-e3db31b4bd26',
						Lovers: [],
						RespondenUserName: 'Clarissa Chuardi',
						Status: null,
						StatusBy: null,
						Text:
							'<p>1.&nbsp;</p><pre>if(3){\n\t\tprintf("a");\n\t}</pre><p>Kenapa kodingan printfnya jalan?&nbsp; if(-1) hasilnya bagaimana?</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
						UserName: 'Clarissa Chuardi',
					},
					Status: 'correct',
					StatusBy: 'IX19-2',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595139704304+0700)/',
									Text:
										'<p>Untuk mengoptimisasi algoritma yang membutuhkan nilai terkecil atau terbesar, seperti algoritma dijkstra?? yang di setiap tahapnya selalu mencari node dengan cost terkecil</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'febbc27f-f8b5-4ad2-9cc4-81d23c30539b',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Untuk mengoptimisasi algoritma yang membutuhkan nilai terkecil atau terbesar, seperti algoritma dijkstra?? yang di setiap tahapnya selalu mencari node dengan cost terkecil</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595522919019+0700)/',
									Text:
										'<p>Mencari nilai terkecil dan terbesar dari suatu data, mempercepat proses pengurutan suatu data dengan menghindari penggunaan tabel yang banyak, karena penyimpanan data pada algoritma heap hanya menggunakan satu tabel.</p>',
									UserId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '7dcb728e-38b5-4ca2-9182-2f7b8bc0f7ea',
							Lovers: [],
							RespondenUserName: 'Vincent Benedict',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Mencari nilai terkecil dan terbesar dari suatu data, mempercepat proses pengurutan suatu data dengan menghindari penggunaan tabel yang banyak, karena penyimpanan data pada algoritma heap hanya menggunakan satu tabel.</p>',
							UserId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Vincent Benedict',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594957078070+0700)/',
								Text: '<p>2. Apa kegunaan heap selain untuk sorting?</p>',
								UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
							},
						],
						Id: 'fd0d1b1d-c954-486a-9ffa-007ec3391e53',
						Lovers: [],
						RespondenUserName: 'Clarissa Chuardi',
						Status: null,
						StatusBy: null,
						Text: '<p>2. Apa kegunaan heap selain untuk sorting?</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
						UserName: 'Clarissa Chuardi',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment:
										'Jawabannya tidak salah, tapi permasalahannya adalah pengganti { } dalam C secara umumnya. Diteliti lagi maksud dari pertanyaannya ya.',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595482769793+0700)/',
											Text:
												'Jawabannya tidak salah, tapi permasalahannya adalah pengganti { } dalam C secara umumnya. Diteliti lagi maksud dari pertanyaannya ya.',
											UserId: '957eab9c-250a-e811-9d86-d8d385fce79e',
										},
									],
									Id: 'ed5e0283-cc01-4399-8390-0aa27698f351',
									UserId: '957eab9c-250a-e811-9d86-d8d385fce79e',
									UserName: 'Christopher Limawan',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595050181884+0700)/',
									Text:
										'<p>Pengganti kurung kurawal di C dapat dihapus jika statement yang akan dijalankan hanya satu misalnya : if(a&gt;0) printf(&#34;Hello World&#34;);??</p>',
									UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '73e37f3a-6ac5-4d7c-a8cb-8a1ff1618453',
							Lovers: [],
							RespondenUserName: 'Clarissa Chuardi',
							Status: 'wrong',
							StatusBy: 'CP18-1',
							Text:
								'<p>Pengganti kurung kurawal di C dapat dihapus jika statement yang akan dijalankan hanya satu misalnya : if(a&gt;0) printf(&#34;Hello World&#34;);??</p>',
							UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Clarissa Chuardi',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595439258889+0700)/',
									Text:
										'<p>pengganti kurung kurawal { } di C adalah &lt;% dan %&gt;</p>',
									UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'c17c03e9-e37d-44fb-af4b-289a008a6adb',
							Lovers: [],
							RespondenUserName: 'David',
							Status: 'correct',
							StatusBy: 'CP18-1',
							Text:
								'<p>pengganti kurung kurawal { } di C adalah &lt;% dan %&gt;</p>',
							UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'David',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594957078070+0700)/',
								Text: '<p>3. Pengganti kurung kurawal di C</p>',
								UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
							},
						],
						Id: '8bdc8b69-6527-4ad4-8718-0dc04a92016d',
						Lovers: [],
						RespondenUserName: 'Clarissa Chuardi',
						Status: null,
						StatusBy: null,
						Text: '<p>3. Pengganti kurung kurawal di C</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
						UserName: 'Clarissa Chuardi',
					},
					Status: 'correct',
					StatusBy: 'CP18-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595050902595+0700)/',
									Text:
										'<p>Karena memory yang diberikan kepada program kita??itu terbatas, jadi kalau kita bikin dimain dia akan mengalokasikan banyak memori yang nantinya akan error</p>',
									UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'b9241fe5-30ce-4153-a45e-2913e3dddca3',
							Lovers: [],
							RespondenUserName: 'Clarissa Chuardi',
							Status: 'correct',
							StatusBy: 'NS17-1',
							Text:
								'<p>Karena memory yang diberikan kepada program kita??itu terbatas, jadi kalau kita bikin dimain dia akan mengalokasikan banyak memori yang nantinya akan error</p>',
							UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Clarissa Chuardi',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594957078070+0700)/',
								Text:
									'<p>4.&nbsp;</p><pre>int main(){\nint a[10000][10000];\n</pre><p>Kenapa ini error?</p>',
								UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
							},
						],
						Id: '43bb1b51-4018-4b4a-94cd-f1779fef5145',
						Lovers: [],
						RespondenUserName: 'Clarissa Chuardi',
						Status: null,
						StatusBy: null,
						Text:
							'<p>4.&nbsp;</p><pre>int main(){\nint a[10000][10000];\n</pre><p>Kenapa ini error?</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
						UserName: 'Clarissa Chuardi',
					},
					Status: 'correct',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'Penjelasannya masih kurang jelas dan spesifik',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595318011217+0700)/',
											Text: 'Penjelasannya masih kurang jelas dan spesifik',
											UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
										},
									],
									Id: '2c194742-c6c2-4aaf-96f0-dbc169b7ea0f',
									UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
									UserName: 'Natasia',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595088524055+0700)/',
									Text:
										'<p>Memang bisa dijalankan karena array di C masi primitive dan memorinya masih mentah sehingga tidak ada batas pengecekan namun jika melakukan itu, tidak menutup?? kemungkinan terjadinya error.</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '2656c18a-ac01-4132-8035-67a69d082cf9',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: 'unchecked',
							StatusBy: 'NS17-1',
							Text:
								'<p>Memang bisa dijalankan karena array di C masi primitive dan memorinya masih mentah sehingga tidak ada batas pengecekan namun jika melakukan itu, tidak menutup?? kemungkinan terjadinya error.</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595605102862+0700)/',
									Text:
										'<p><span style="color: rgba(0, 0, 0, 0.84);text-align: left;background-color: rgb(255, 255, 255);float: none;">karena dalam C, tidak ada spesifikasi yang berurusan dengan masalah mengakses invalid index. Dalam C, ini dikenal sebagai undefined Behavior.</span></p>',
									UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'e0dcd126-eb78-487b-b669-c4d3f28bc344',
							Lovers: [],
							RespondenUserName: 'Veronica',
							Status: 'wrong',
							StatusBy: 'NS17-1',
							Text:
								'<p><span style="color: rgba(0, 0, 0, 0.84);text-align: left;background-color: rgb(255, 255, 255);float: none;">karena dalam C, tidak ada spesifikasi yang berurusan dengan masalah mengakses invalid index. Dalam C, ini dikenal sebagai undefined Behavior.</span></p>',
							UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Veronica',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594957078070+0700)/',
								Text:
									'<p>5.&nbsp;</p><pre>int heap[100];\nheap[101]=10;</pre><p>Apakah ini bisa berjalan? Kalau bisa jelaskan</p>',
								UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
							},
						],
						Id: '5001898a-b7e3-4ec1-ae2d-6ffe09f2b8e3',
						Lovers: [],
						RespondenUserName: 'Clarissa Chuardi',
						Status: null,
						StatusBy: null,
						Text:
							'<p>5.&nbsp;</p><pre>int heap[100];\nheap[101]=10;</pre><p>Apakah ini bisa berjalan? Kalau bisa jelaskan</p>',
						UserId: '8ddf7340-cfaf-e911-b1af-d8d385fce79e',
						UserName: 'Clarissa Chuardi',
					},
					Status: 'unchecked',
					StatusBy: 'NS17-1',
				},
			],
			SubjectId: '4ed03bfd-3db5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T116      ',
			TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Clarissa Chuardi',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1595325600000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Stored Procedure and Function',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. ada interaksi terhadap mahasiswa</p><h2>2. saya menunjukkan perkembangan(JE bahagia)</h2><p>3. flow mengajar saya sudah baik, tapi saya tidak menjelaskan konsep di awal</p><p>4. control kelas mantap</p><p>5. saya ngemeng</p><p>6. materi saya sudah bagus</p><h1>7. saya siap gb onsite buat DBH2S1</h1>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595216938109+0700)/',
						Text:
							'<p>1. ada interaksi terhadap mahasiswa</p><h2>2. saya menunjukkan perkembangan(JE bahagia)</h2><p>3. flow mengajar saya sudah baik, tapi saya tidak menjelaskan konsep di awal</p><p>4. control kelas mantap</p><p>5. saya ngemeng</p><p>6. materi saya sudah bagus</p><h1>7. saya siap gb onsite buat DBH2S1</h1>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
					},
				],
				Id: '8c210345-fa0d-44b7-835b-7f82586cb926',
				UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
				UserName: 'David',
			},
			PresentationDate: '/Date(1595216937964+0700)/',
			PresentationNo: 2,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595261581564+0700)/',
									Text:
										'<p>color code adalah sistem dimana sistem tersebut membuat output yang kita memiliki warna sesuai color code yang kita masukkan</p>',
									UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'ff22e575-326f-4496-afea-8bec541323ca',
							Lovers: [],
							RespondenUserName: 'David',
							Status: 'correct',
							StatusBy: 'IR19-1',
							Text:
								'<p>color code adalah sistem dimana sistem tersebut membuat output yang kita memiliki warna sesuai color code yang kita masukkan</p>',
							UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'David',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595216938109+0700)/',
								Text: '<p>apa itu color code di SSMS?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: 'f0d40771-2954-4103-92cf-d74570b4bff1',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text: '<p>apa itu color code di SSMS?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: 'correct',
					StatusBy: 'IR19-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595230003950+0700)/',
									Text:
										'<p>@@ adalah sebuah variable global atau sebuah function yang sudah disediakan dari SQL</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '033b2045-cd7e-40bb-97b4-10aafcfed175',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: 'correct',
							StatusBy: 'IR19-1',
							Text:
								'<p>@@ adalah sebuah variable global atau sebuah function yang sudah disediakan dari SQL</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595286224638+0700)/',
									Text:
										'<p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">@@ merupakan simbol yang digunakan untuk menunjukkan bahwa variable yang memiliki prefix ini merupakan function dari system yang disediakan dari SQL</span><br/></p><p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;"><br/></span></p>',
									UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'b8bebde2-4a55-4622-b5fe-bec87e45e064',
							Lovers: [],
							RespondenUserName: 'Yoshua Aron Nainggolan',
							Status: 'correct',
							StatusBy: 'IR19-1',
							Text:
								'<p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">@@ merupakan simbol yang digunakan untuk menunjukkan bahwa variable yang memiliki prefix ini merupakan function dari system yang disediakan dari SQL</span><br/></p><p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;"><br/></span></p>',
							UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
							UserName: 'Yoshua Aron Nainggolan',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595216938109+0700)/',
								Text: '<p>apa itu @@?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: 'ab8f51dc-7236-45c2-8b1b-76dc8189773f',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text: '<p>apa itu @@?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: 'correct',
					StatusBy: 'IR19-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595263042650+0700)/',
									Text:
										'<p>cara untuk melihat tempat dimana stored procedure tersebut disimpan</p><p>1. Expand Database yang kita mau di object explorer</p><p>2. Expand yang programmability</p><p>3. Expand stored procedure</p><p>4. Stored Procedure yang ada disimpan disini</p>',
									UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '47e4725a-da2e-427f-bd13-1606182b11ad',
							Lovers: [],
							RespondenUserName: 'David',
							Status: 'correct',
							StatusBy: 'DF19-1',
							Text:
								'<p>cara untuk melihat tempat dimana stored procedure tersebut disimpan</p><p>1. Expand Database yang kita mau di object explorer</p><p>2. Expand yang programmability</p><p>3. Expand stored procedure</p><p>4. Stored Procedure yang ada disimpan disini</p>',
							UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'David',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595216938109+0700)/',
								Text: '<p>dimanakah store procedure disimpan?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: 'eaa61d48-e855-419e-aa32-b89ab4486e73',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text: '<p>dimanakah store procedure disimpan?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: 'correct',
					StatusBy: 'DF19-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595602528247+0700)/',
									Text:
										'<p>Cara lain untuk mengakses database tanpa menggunakan dbo.sysdatabases adalah dengan menggunakan sys.databases</p><pre>select * from sys.databases&#10;</pre>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd91be4e7-d8d6-4996-a7fe-1d903195bb53',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Cara lain untuk mengakses database tanpa menggunakan dbo.sysdatabases adalah dengan menggunakan sys.databases</p><pre>select * from sys.databases&#10;</pre>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595216938109+0700)/',
								Text:
									'<p>bagaimana cara mengakses database tanpa menggunakan dbo.sysdatabases?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: '4e452bcf-0d1e-4516-951c-9af1dbb32aa8',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text:
							'<p>bagaimana cara mengakses database tanpa menggunakan dbo.sysdatabases?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595264772455+0700)/',
									Text:
										'<p>sql injection adalah teknik yang menggunakan celah keamanan yang terdapat di SQL, yang membuat seseorang dapat memanipulasi query yang ada. Sehingga umumnya, orang yang tidak seharusnya dapat melihat data-data akhirnya dapat mengakses data-data tersebut</p><p><br/></p><p>cara mengatasi : 1. menyesuaikan input yang diminta (nama hanya dapat diisi karakter)</p><p>?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 2. memberi batasan input(nama dibatasi 50 karakter)?? sehingga penulisan sql injection lebih susah karena kendala karakter</p><p>?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 3. memfilter tiap inputan user??</p>',
									UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '9b792c01-5da1-4573-9cd6-0419ac340726',
							Lovers: [],
							RespondenUserName: 'David',
							Status: 'wrong',
							StatusBy: 'IR19-1',
							Text:
								'<p>sql injection adalah teknik yang menggunakan celah keamanan yang terdapat di SQL, yang membuat seseorang dapat memanipulasi query yang ada. Sehingga umumnya, orang yang tidak seharusnya dapat melihat data-data akhirnya dapat mengakses data-data tersebut</p><p><br/></p><p>cara mengatasi : 1. menyesuaikan input yang diminta (nama hanya dapat diisi karakter)</p><p>?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 2. memberi batasan input(nama dibatasi 50 karakter)?? sehingga penulisan sql injection lebih susah karena kendala karakter</p><p>?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 3. memfilter tiap inputan user??</p>',
							UserId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'David',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595317130932+0700)/',
									Text: '<p>tidak keliatan jelas preventionnya<br/></p>',
									UserId: '567551f0-e525-e911-8e6f-d8d385fce79e',
								},
							],
							Id: '389b1fd1-e63e-4ff4-ae27-d2cbccfd9696',
							Lovers: [],
							RespondenUserName: 'Ivan Rivaldi',
							Status: null,
							StatusBy: null,
							Text: '<p>tidak keliatan jelas preventionnya<br/></p>',
							UserId: '567551f0-e525-e911-8e6f-d8d385fce79e',
							UserName: 'Ivan Rivaldi',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595627779720+0700)/',
									Text:
										'<p>Prevention dari sql injection adalah??<br/>1. Parameterized Statement -&gt; memastikan bahwa parameter pada sql statement aman untuk dijalankan contohnya :?? String statement = &#34;SELECT * FROM users WHERE id=?&#34;<br/>2. Object Rational Mapping -&gt; framework yang dapat mengubah suatu sql result set menjadi suatu code<br/>3. Escaping Input -&gt; memastikan tidak ada special character pada inputan</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'ea60f08d-be4a-4e3f-bef3-0c197bb92c5c',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Prevention dari sql injection adalah??<br/>1. Parameterized Statement -&gt; memastikan bahwa parameter pada sql statement aman untuk dijalankan contohnya :?? String statement = &#34;SELECT * FROM users WHERE id=?&#34;<br/>2. Object Rational Mapping -&gt; framework yang dapat mengubah suatu sql result set menjadi suatu code<br/>3. Escaping Input -&gt; memastikan tidak ada special character pada inputan</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595789984694+0700)/',
									Text:
										"<p>sql injection adalah teknik dimana ada celah kemanan terdapat di sql, dan bisa memanipulasi query kita</p><p>preventionnya bisa menggunakan??</p><p>- input validation dari data yang diinput, misalnya untuk validasi nomor tidak boleh ada karakter lain selain aja, melainkan untuk string juga tidak boleh karakter lain selain karakter alfabet.</p><p>- parameterized statement, jadi hasil dari inputan kita ditampung dulu ke dalam variable kita yang nantinya akan dipilih jika inputan dari kita valid atau tidak untuk dimasukkan ke dalam db</p><p>- escaping input untuk membatasi karakter yang kita bisa input ke dalam inputan kita, jadi sebelumnya kita masih bisa menginput karakter ' / ' , tetapi dengan escaping input kita tidak bisa menginput karakter itu</p>",
									UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'e48549aa-14ac-4883-9b17-43679e6e3969',
							Lovers: [],
							RespondenUserName: 'Clarissa Chuardi',
							Status: 'correct',
							StatusBy: 'CY19-1',
							Text:
								"<p>sql injection adalah teknik dimana ada celah kemanan terdapat di sql, dan bisa memanipulasi query kita</p><p>preventionnya bisa menggunakan??</p><p>- input validation dari data yang diinput, misalnya untuk validasi nomor tidak boleh ada karakter lain selain aja, melainkan untuk string juga tidak boleh karakter lain selain karakter alfabet.</p><p>- parameterized statement, jadi hasil dari inputan kita ditampung dulu ke dalam variable kita yang nantinya akan dipilih jika inputan dari kita valid atau tidak untuk dimasukkan ke dalam db</p><p>- escaping input untuk membatasi karakter yang kita bisa input ke dalam inputan kita, jadi sebelumnya kita masih bisa menginput karakter ' / ' , tetapi dengan escaping input kita tidak bisa menginput karakter itu</p>",
							UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Clarissa Chuardi',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595216938109+0700)/',
								Text:
									'<p>apa itu SQL injection dan bagaimana cara mencegahnya?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: '0cb60f8e-75d1-4399-a350-c9be70079da4',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text:
							'<p>apa itu SQL injection dan bagaimana cara mencegahnya?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: 'correct',
					StatusBy: 'CY19-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595525130926+0700)/',
									Text:
										'<ol start="1" class="dp-sql" style="background-color: rgb(255, 255, 255);"><li class="alt" style="background-color: rgb(255, 255, 255);"><span style="background-color: inherit;"><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>Create</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>procedure??</b></b></span><span style="color: black;background-color: inherit;">Sp_insert</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;">(</span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;">@ID??<span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>int</b></b></span><span style="color: black;background-color: inherit;">,</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;">@TempName??<span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>varchar</b></b></span><span style="color: black;background-color: inherit;">(</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>max</b></b></span><span style="color: black;background-color: inherit;">)</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;">)</span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>as</b></b></span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>begin</b></b></span></span></li><li class="" style="background-color: rgb(248, 248, 248);"><span style="background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>Declare??</b></b></span><span style="color: black;background-color: inherit;">@SampleTable??</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>Table</b></b></span><span style="color: black;background-color: inherit;">(id??</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>int</b></b></span><span style="color: black;background-color: inherit;">,??</span><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>Name</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>varchar</b></b></span><span style="color: black;background-color: inherit;">(</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>max</b></b></span><span style="color: black;background-color: inherit;">))</span></span></li><li class="" style="background-color: rgb(248, 248, 248);"><span style="background-color: inherit;"><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>Insert</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>into??</b></b></span><span style="color: black;background-color: inherit;">@SampleTable(id,??</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>Name</b></b></span><span style="color: black;background-color: inherit;">)</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>values</b></b></span><span style="color: black;background-color: inherit;">(@ID,@TempName)</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>select??</b></b></span><span style="color: black;background-color: inherit;">*??</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>from??</b></b></span><span style="color: black;background-color: inherit;">@SampleTable</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>end</b></b></span></span></li></ol><div style="background-color: rgb(255, 255, 255);"><ol start="1" class="dp-sql" style="background-color: rgb(255, 255, 255);"><li class="alt" style="background-color: rgb(255, 255, 255);"><span style="background-color: inherit;"><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>create</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>procedure??</b></b></span><span style="color: black;background-color: inherit;">Sp_Call</span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;">(</span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;">@SID??<span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>int</b></b></span><span style="color: black;background-color: inherit;">,</span></span></li><li class="alt" style="background-color: rgb(255, 255, 255);"><span style="background-color: inherit;"><font color="#000000">@</font><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>Name</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>varchar</b></b></span><span style="color: black;background-color: inherit;">(</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>max</b></b></span><span style="color: black;background-color: inherit;">)</span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;">)</span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>as</b></b></span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>begin</b></b></span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>exec??</b></b></span><span style="color: black;background-color: inherit;">Sp_insert @ID = @SID, @TempName = @</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>Name //menjalankan SP yang pertama</b></b></span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>end</b></b></span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><br/></li></ol><div style="color: rgb(119, 119, 119);"><font color="#000000"><span style="color: rgb(33, 33, 33);background-color: rgb(255, 255, 255);float: none;">Diatas merupakan query pembuktian bahwa SP dapat dipanggil dalam SP.?? Diatas merupakan 2 SP yang di create , dimana data dari SP yang kedua dapat di panggil pada SP yang pertama.</span></font></div></div>',
									UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'f3d69410-60d0-4487-a182-d1abeb234e29',
							Lovers: [],
							RespondenUserName: 'Veronica',
							Status: null,
							StatusBy: null,
							Text:
								'<ol start="1" class="dp-sql" style="background-color: rgb(255, 255, 255);"><li class="alt" style="background-color: rgb(255, 255, 255);"><span style="background-color: inherit;"><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>Create</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>procedure??</b></b></span><span style="color: black;background-color: inherit;">Sp_insert</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;">(</span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;">@ID??<span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>int</b></b></span><span style="color: black;background-color: inherit;">,</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;">@TempName??<span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>varchar</b></b></span><span style="color: black;background-color: inherit;">(</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>max</b></b></span><span style="color: black;background-color: inherit;">)</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;">)</span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>as</b></b></span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>begin</b></b></span></span></li><li class="" style="background-color: rgb(248, 248, 248);"><span style="background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>Declare??</b></b></span><span style="color: black;background-color: inherit;">@SampleTable??</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>Table</b></b></span><span style="color: black;background-color: inherit;">(id??</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>int</b></b></span><span style="color: black;background-color: inherit;">,??</span><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>Name</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>varchar</b></b></span><span style="color: black;background-color: inherit;">(</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>max</b></b></span><span style="color: black;background-color: inherit;">))</span></span></li><li class="" style="background-color: rgb(248, 248, 248);"><span style="background-color: inherit;"><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>Insert</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>into??</b></b></span><span style="color: black;background-color: inherit;">@SampleTable(id,??</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>Name</b></b></span><span style="color: black;background-color: inherit;">)</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>values</b></b></span><span style="color: black;background-color: inherit;">(@ID,@TempName)</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>select??</b></b></span><span style="color: black;background-color: inherit;">*??</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>from??</b></b></span><span style="color: black;background-color: inherit;">@SampleTable</span></span></li><li class="" style="color: rgb(92, 92, 92);background-color: rgb(248, 248, 248);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>end</b></b></span></span></li></ol><div style="background-color: rgb(255, 255, 255);"><ol start="1" class="dp-sql" style="background-color: rgb(255, 255, 255);"><li class="alt" style="background-color: rgb(255, 255, 255);"><span style="background-color: inherit;"><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>create</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>procedure??</b></b></span><span style="color: black;background-color: inherit;">Sp_Call</span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;">(</span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;">@SID??<span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>int</b></b></span><span style="color: black;background-color: inherit;">,</span></span></li><li class="alt" style="background-color: rgb(255, 255, 255);"><span style="background-color: inherit;"><font color="#000000">@</font><span class="keyword" style="background-color: inherit;"><b style="color: rgb(0, 102, 153);"><b>Name</b></b><font color="#000000">??</font></span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>varchar</b></b></span><span style="color: black;background-color: inherit;">(</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>max</b></b></span><span style="color: black;background-color: inherit;">)</span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;">)</span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>as</b></b></span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>begin</b></b></span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>exec??</b></b></span><span style="color: black;background-color: inherit;">Sp_insert @ID = @SID, @TempName = @</span><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>Name //menjalankan SP yang pertama</b></b></span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><span style="color: black;background-color: inherit;"><span class="keyword" style="color: rgb(0, 102, 153);background-color: inherit;"><b><b>end</b></b></span></span></li><li class="alt" style="color: inherit;background-color: rgb(255, 255, 255);"><br/></li></ol><div style="color: rgb(119, 119, 119);"><font color="#000000"><span style="color: rgb(33, 33, 33);background-color: rgb(255, 255, 255);float: none;">Diatas merupakan query pembuktian bahwa SP dapat dipanggil dalam SP.?? Diatas merupakan 2 SP yang di create , dimana data dari SP yang kedua dapat di panggil pada SP yang pertama.</span></font></div></div>',
							UserId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Veronica',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595216938109+0700)/',
								Text:
									'<p>apakah SP dapat memanggil function dan kebalikannya?</p>',
								UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
							},
						],
						Id: '341cd04b-db53-4180-989c-5e854f937846',
						Lovers: [],
						RespondenUserName: 'David',
						Status: null,
						StatusBy: null,
						Text: '<p>apakah SP dapat memanggil function dan kebalikannya?</p>',
						UserId: 'bc87f207-24cb-e811-8260-d8d385fce79e',
						UserName: 'David',
					},
					Status: null,
					StatusBy: null,
				},
			],
			SubjectId: '50d03bfd-3db5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T059      ',
			TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'David',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1594893600000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Hash Table',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<pre>1. Materi kurang dikuasai\n2. Insertnya belum bisa\n3. Dipancing masih tidak bisa\n4. Cara mengajarnya saya masih mutar-mutar.</pre>\n            ',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1594805747352+0700)/',
						Text:
							'<pre>1. Materi kurang dikuasai\n2. Insertnya belum bisa\n3. Dipancing masih tidak bisa\n4. Cara mengajarnya saya masih mutar-mutar.</pre>\n            ',
						UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
					},
				],
				Id: '2561234d-b4bd-4135-8c65-4ef3600f8274',
				UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
				UserName: 'Yoshua Aron Nainggolan',
			},
			PresentationDate: '/Date(1594805747204+0700)/',
			PresentationNo: 1,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1594853440223+0700)/',
									Text:
										'<p>Karena yang di-hash pada code snippet tersebut adalah integer. Fungsi hash seharusnya menerima input string.</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '16ea70f8-182e-452d-be66-572bf16deb80',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Karena yang di-hash pada code snippet tersebut adalah integer. Fungsi hash seharusnya menerima input string.</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1594853843717+0700)/',
									Text:
										'<p>Karena apabila bucket[hashkey] belum memiliki node, harus dibuat terlebih dahulu dengan mengalokasikan memory terlebih dahulu dan menetapkan isi dari setiap attribute data struct yang ada. Codingan saya diatas belum mempunyai validasi apakah bucket[hashkey] sudah ada yang menempati atau tidak.</p>',
									UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '6e09d58f-28ba-434f-b66c-0cbed2c050ef',
							Lovers: [],
							RespondenUserName: 'Yoshua Aron Nainggolan',
							Status: 'correct',
							StatusBy: 'NS17-1',
							Text:
								'<p>Karena apabila bucket[hashkey] belum memiliki node, harus dibuat terlebih dahulu dengan mengalokasikan memory terlebih dahulu dan menetapkan isi dari setiap attribute data struct yang ada. Codingan saya diatas belum mempunyai validasi apakah bucket[hashkey] sudah ada yang menempati atau tidak.</p>',
							UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
							UserName: 'Yoshua Aron Nainggolan',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594805747352+0700)/',
								Text:
									'<pre>int insert(int value){\n\tint hashkey = hash(value);\n\tbucket[hashkey]-&gt;value = value;\n\treturn bucket[hashkey]-&gt;value;\n}\n</pre><pre>printf("%d %d %d", insert(1), insert(2), insert(3));</pre><pre></pre><pre>Kenapa pas saya insert masih error?</pre><p><br></p>',
								UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
							},
						],
						Id: '25e5aec7-3602-4a0a-a56d-3cbc62b01a6c',
						Lovers: [],
						RespondenUserName: 'Yoshua Aron Nainggolan',
						Status: null,
						StatusBy: null,
						Text:
							'<pre>int insert(int value){\n\tint hashkey = hash(value);\n\tbucket[hashkey]-&gt;value = value;\n\treturn bucket[hashkey]-&gt;value;\n}\n</pre><pre>printf("%d %d %d", insert(1), insert(2), insert(3));</pre><pre></pre><pre>Kenapa pas saya insert masih error?</pre><p><br></p>',
						UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
						UserName: 'Yoshua Aron Nainggolan',
					},
					Status: 'correct',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1594852924205+0700)/',
									Text:
										'<p>1. djb2</p><p>2. sdbm</p><p>3. lose lose</p><p>4. md5</p><p>5. sha1</p>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '50686cf7-80dd-463f-b735-a19c3ecccbe4',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: 'correct',
							StatusBy: 'WS19-2',
							Text:
								'<p>1. djb2</p><p>2. sdbm</p><p>3. lose lose</p><p>4. md5</p><p>5. sha1</p>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1594854389755+0700)/',
									Text:
										'<p>1. Message Digest??<span style="color: rgb(46, 46, 46);float: none;">5 (MD5)</span></p><p><span style="color: rgb(46, 46, 46);float: none;">2.??<span style="color: rgb(46, 46, 46);float: none;">Secure Hashing Algorithm (SHA) 1 and 2</span></span></p><p><span style="color: rgb(46, 46, 46);float: none;"><span style="color: rgb(46, 46, 46);float: none;">3.Bernstein\'s hash djb2<br/></span></span></p><p><span style="color: rgb(46, 46, 46);float: none;"><span style="color: rgb(46, 46, 46);float: none;">4. SWIFFT</span></span></p><p><span style="float: none;"><span style="float: none;"><font color="#202122">5. GOST hash??</font></span></span></p>',
									UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '6fbfe800-2fd6-4cb4-b53f-8a054a440690',
							Lovers: [],
							RespondenUserName: 'Yoshua Aron Nainggolan',
							Status: null,
							StatusBy: null,
							Text:
								'<p>1. Message Digest??<span style="color: rgb(46, 46, 46);float: none;">5 (MD5)</span></p><p><span style="color: rgb(46, 46, 46);float: none;">2.??<span style="color: rgb(46, 46, 46);float: none;">Secure Hashing Algorithm (SHA) 1 and 2</span></span></p><p><span style="color: rgb(46, 46, 46);float: none;"><span style="color: rgb(46, 46, 46);float: none;">3.Bernstein\'s hash djb2<br/></span></span></p><p><span style="color: rgb(46, 46, 46);float: none;"><span style="color: rgb(46, 46, 46);float: none;">4. SWIFFT</span></span></p><p><span style="float: none;"><span style="float: none;"><font color="#202122">5. GOST hash??</font></span></span></p>',
							UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
							UserName: 'Yoshua Aron Nainggolan',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594805747352+0700)/',
								Text:
									'<pre>Sebutkan 5 Contoh algoritma hashing di dunia nyata!</pre>',
								UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
							},
						],
						Id: 'd7e4e53b-6341-4a89-91f0-e232b21583eb',
						Lovers: [],
						RespondenUserName: 'Yoshua Aron Nainggolan',
						Status: null,
						StatusBy: null,
						Text:
							'<pre>Sebutkan 5 Contoh algoritma hashing di dunia nyata!</pre>',
						UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
						UserName: 'Yoshua Aron Nainggolan',
					},
					Status: 'correct',
					StatusBy: 'WS19-2',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1594852822168+0700)/',
									Text:
										'<p>mengakses value tanpa tanda panah dapat dilakukan dengan cara:</p><pre style="color: rgb(51, 51, 51);background-color: rgb(245, 245, 245);">int insert(int value){&#10;&#9;int hashkey = hash(value);&#10;&#9;(*bucket[hashkey]).value = value;&#10;&#9;return (*bucket[hashkey]).value;&#10;}</pre>',
									UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd1d6c1a1-843e-42ad-b014-846b6e344b2e',
							Lovers: [],
							RespondenUserName: 'Brandon Julio Thenaro',
							Status: 'correct',
							StatusBy: 'NS17-1',
							Text:
								'<p>mengakses value tanpa tanda panah dapat dilakukan dengan cara:</p><pre style="color: rgb(51, 51, 51);background-color: rgb(245, 245, 245);">int insert(int value){&#10;&#9;int hashkey = hash(value);&#10;&#9;(*bucket[hashkey]).value = value;&#10;&#9;return (*bucket[hashkey]).value;&#10;}</pre>',
							UserId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Brandon Julio Thenaro',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment:
										'Selain dengan -> (arrow pointer), kita dapat mengakses\nkita dapat mengakses member pada struktur  dengan sebuah titik ( . ) \nseperti pada kodingan berikut.\n\n\nint insert(int value){\n\tint hashkey = hash(value);\n\t(*bucket[hashkey]).value = value;\n\treturn (*bucket[hashkey]).value;\n}',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1594876949963+0700)/',
											Text:
												'Selain dengan -> (arrow pointer), kita dapat mengakses\nkita dapat mengakses member pada struktur  dengan sebuah titik ( . ) \nseperti pada kodingan berikut.\n\n\nint insert(int value){\n\tint hashkey = hash(value);\n\t(*bucket[hashkey]).value = value;\n\treturn (*bucket[hashkey]).value;\n}',
											UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
										},
									],
									Id: '9b6e139c-13ed-4407-9dbe-dae3f83d0919',
									UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
									UserName: 'Yoshua Aron Nainggolan',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1594876927088+0700)/',
									Text:
										'<p><span style="color: rgb(0, 0, 0);background-color: rgb(255, 255, 255);float: none;">Selain dengan -&gt; (arrow pointer), kita dapat mengakseskita dapat mengakses member pada struktur  dengan sebuah titik ( . ) seperti pada kodingan berikut.int insert(int value){int hashkey = hash(value);(*bucket[hashkey]).value = value;return (*bucket[hashkey]).value;}</span><br/></p>',
									UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '2546aac2-b319-4f03-add4-f6816b05442c',
							Lovers: [],
							RespondenUserName: 'Yoshua Aron Nainggolan',
							Status: null,
							StatusBy: null,
							Text:
								'<p><span style="color: rgb(0, 0, 0);background-color: rgb(255, 255, 255);float: none;">Selain dengan -&gt; (arrow pointer), kita dapat mengakseskita dapat mengakses member pada struktur  dengan sebuah titik ( . ) seperti pada kodingan berikut.int insert(int value){int hashkey = hash(value);(*bucket[hashkey]).value = value;return (*bucket[hashkey]).value;}</span><br/></p>',
							UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
							UserName: 'Yoshua Aron Nainggolan',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594805747352+0700)/',
								Text:
									'<pre>int insert(int value){\n\tint hashkey = hash(value);\n\tbucket[hashkey]-&gt;value = value;\n\treturn bucket[hashkey]-&gt;value;\n}\n\nBagaimana cara mengakses value tanpa tanda panah?</pre>',
								UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
							},
						],
						Id: 'e030e23b-de7b-4f28-9947-a7f761181c01',
						Lovers: [],
						RespondenUserName: 'Yoshua Aron Nainggolan',
						Status: null,
						StatusBy: null,
						Text:
							'<pre>int insert(int value){\n\tint hashkey = hash(value);\n\tbucket[hashkey]-&gt;value = value;\n\treturn bucket[hashkey]-&gt;value;\n}\n\nBagaimana cara mengakses value tanpa tanda panah?</pre>',
						UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
						UserName: 'Yoshua Aron Nainggolan',
					},
					Status: 'correct',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment:
										'Ini masih salah ya, cara penjelasan kamu. mengarah ke hashtable, coba di cari lagi. pertanyaan nya itu hashmap ya.',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1594904964947+0700)/',
											Text:
												'Ini masih salah ya, cara penjelasan kamu. mengarah ke hashtable, coba di cari lagi. pertanyaan nya itu hashmap ya.',
											UserId: 'b8b7f18e-78be-e911-81c2-d8d385fce79e',
										},
									],
									Id: '5b0b78e4-3891-4940-86d1-4e2b63b212ca',
									UserId: 'b8b7f18e-78be-e911-81c2-d8d385fce79e',
									UserName: 'Sandyka Bala',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1594879151227+0700)/',
									Text:
										'<p>Hash map adalah sebuah struktur yang memetakan key ke value. Hash map menggunakan fungsi hash untuk menghitung index yang akan dipakai guna menyimpan data pada struktur data tersebut.</p>',
									UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'c123c623-56ef-416a-8335-c17fcd6e07e8',
							Lovers: [],
							RespondenUserName: 'Yoshua Aron Nainggolan',
							Status: 'wrong',
							StatusBy: 'SK19-2',
							Text:
								'<p>Hash map adalah sebuah struktur yang memetakan key ke value. Hash map menggunakan fungsi hash untuk menghitung index yang akan dipakai guna menyimpan data pada struktur data tersebut.</p>',
							UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
							UserName: 'Yoshua Aron Nainggolan',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595179091717+0700)/',
									Text:
										'<p>Hash map adalah sebuah collection yang menyimpan key yang kita tentukan dengan valuenya, jadi key dan value itu sepasang, key itu bisa berupa string, float, int, char, dan lain-lain. Bisa dibilang key itu merupakan index dari collection tersebut.</p>',
									UserId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '1b538ea4-65ff-406d-aa17-26acbf2e7b6a',
							Lovers: [],
							RespondenUserName: 'Vincent Benedict',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Hash map adalah sebuah collection yang menyimpan key yang kita tentukan dengan valuenya, jadi key dan value itu sepasang, key itu bisa berupa string, float, int, char, dan lain-lain. Bisa dibilang key itu merupakan index dari collection tersebut.</p>',
							UserId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Vincent Benedict',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595786989532+0700)/',
									Text:
										'<p>hash map adalah sebuah collection untuk menyimpan data dengan menyimpan data tersebut ke dalam index atau key menggunakan hash method</p>',
									UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd606e346-3ad5-4643-bd72-f18839052102',
							Lovers: [],
							RespondenUserName: 'Clarissa Chuardi',
							Status: 'correct',
							StatusBy: 'CY19-1',
							Text:
								'<p>hash map adalah sebuah collection untuk menyimpan data dengan menyimpan data tersebut ke dalam index atau key menggunakan hash method</p>',
							UserId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Clarissa Chuardi',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1594805747352+0700)/',
								Text: '<pre>Apa itu hash map?</pre>',
								UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
							},
						],
						Id: '7b5661a9-955f-424c-8037-c4200b5f3af1',
						Lovers: [],
						RespondenUserName: 'Yoshua Aron Nainggolan',
						Status: null,
						StatusBy: null,
						Text: '<pre>Apa itu hash map?</pre>',
						UserId: 'b314d2d5-2870-e911-b1d7-d8d385fce79e',
						UserName: 'Yoshua Aron Nainggolan',
					},
					Status: 'correct',
					StatusBy: 'CY19-1',
				},
			],
			SubjectId: '4ed03bfd-3db5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T124      ',
			TraineeId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
			TraineeName: 'Yoshua Aron Nainggolan',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1595671200000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'MVC',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Control kelas bagus</p><p>2. Saya menanyakan font</p><p>3. Saya memberikan komen pada codingan saya</p><p>4. Saya memperhatikan tema dan menggunakan auto complete</p><p>5. Saya belum paham MVC</p><p>6. Basic GUI saya kacau</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595575929297+0700)/',
						Text:
							'<p>1. Control kelas bagus</p><p>2. Saya menanyakan font</p><p>3. Saya memberikan komen pada codingan saya</p><p>4. Saya memperhatikan tema dan menggunakan auto complete</p><p>5. Saya belum paham MVC</p><p>6. Basic GUI saya kacau</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
					},
				],
				Id: 'c2e14a58-62fa-4daa-bb7f-424846d1afac',
				UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
				UserName: 'Jonathan Ronald Honggo',
			},
			PresentationDate: '/Date(1595575929134+0700)/',
			PresentationNo: 2,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595606573199+0700)/',
									Text:
										'<p>MVC adalah Model, View, and Controlling salah satu dari design pattern yang digunakan untuk memudahkan pemograman<br/>Model adalah tempat pengaturan data dan fungsi fungsi dari sebuah database</p><p>View adalah tempat untuk mengolah tampilan ataupun sebuah output yang dihasilkan untuk diperlihatkan</p><p>Controlling adalah tempat untuk memasukan perintah - perintah untuk mengupdate database tersebut??</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '361e74b7-b1ad-43d5-8f0a-0c24b26c4ec3',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: 'wrong',
							StatusBy: 'IX19-2',
							Text:
								'<p>MVC adalah Model, View, and Controlling salah satu dari design pattern yang digunakan untuk memudahkan pemograman<br/>Model adalah tempat pengaturan data dan fungsi fungsi dari sebuah database</p><p>View adalah tempat untuk mengolah tampilan ataupun sebuah output yang dihasilkan untuk diperlihatkan</p><p>Controlling adalah tempat untuk memasukan perintah - perintah untuk mengupdate database tersebut??</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595738547970+0700)/',
									Text:
										'<p>??MVC merupakan sebuah arsitektur pattern dimana kita memisahkan program logic menjadi 3 yaitu Model ,View dan Controller.</p><p>Model itu adalah tempat penyimpanan yang berisi atribut atribut data dan model bergerak berdasarkan instruksi controller.<br/>View adalah sebuah bagian yang meminta input?? dan memberikan data kepad customer</p><p>Controller adalah bagian ditengah tengah Model dan View yang berguna untuk menerima input dari View yang digunakan untuk memerikan command pada Model</p>',
									UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '2bcacca3-c109-4899-a900-fbfd3b0e4658',
							Lovers: [],
							RespondenUserName: 'Stanley Dave Teherag',
							Status: null,
							StatusBy: null,
							Text:
								'<p>??MVC merupakan sebuah arsitektur pattern dimana kita memisahkan program logic menjadi 3 yaitu Model ,View dan Controller.</p><p>Model itu adalah tempat penyimpanan yang berisi atribut atribut data dan model bergerak berdasarkan instruksi controller.<br/>View adalah sebuah bagian yang meminta input?? dan memberikan data kepad customer</p><p>Controller adalah bagian ditengah tengah Model dan View yang berguna untuk menerima input dari View yang digunakan untuk memerikan command pada Model</p>',
							UserId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Stanley Dave Teherag',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595829006237+0700)/',
									Text:
										'<p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">MVC adalah kepanjangan Model View Controller dimana model mempresentasikan object dan bertugas untuk CRUD data. Untuk controller adalah mengatur logic pada sebuah response dari view dan view adalah sebuah tampilan yang akan dterima oleh client untuk bernteraksi dengan app.</span><br/></p><p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">sebagai contoh penerapan mvc pada login??</span></p><p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">Flow Login pada MVC dimulai dari request page login dan controller mengirim ke client page login kemudian view menampilkan tampilan untuk client beriteraksi dengan apikasi ketika client mengisi form dan menekan submit button maka data tersebut dikirimkan ke cotroller untuk di validasi apakah datanya ada pada database. Supaya bisa berinteraksi dengan database model dgunakan untuk menarik data dari database dan model adalah representasi object dari user tersebut bila controller menemukan kesamaan data pada login maka diberikan akses masuk namun bila tidak ada kecocokan dengan model maka akan ditolak.<br/></span></p>',
									UserId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '31639514-a57c-4427-aaf5-ee9f711e7f69',
							Lovers: [],
							RespondenUserName: 'Thaddeus Cleo',
							Status: 'correct',
							StatusBy: 'CY19-1',
							Text:
								'<p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">MVC adalah kepanjangan Model View Controller dimana model mempresentasikan object dan bertugas untuk CRUD data. Untuk controller adalah mengatur logic pada sebuah response dari view dan view adalah sebuah tampilan yang akan dterima oleh client untuk bernteraksi dengan app.</span><br/></p><p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">sebagai contoh penerapan mvc pada login??</span></p><p><span style="color: rgb(119, 119, 119);background-color: rgb(255, 255, 255);float: none;">Flow Login pada MVC dimulai dari request page login dan controller mengirim ke client page login kemudian view menampilkan tampilan untuk client beriteraksi dengan apikasi ketika client mengisi form dan menekan submit button maka data tersebut dikirimkan ke cotroller untuk di validasi apakah datanya ada pada database. Supaya bisa berinteraksi dengan database model dgunakan untuk menarik data dari database dan model adalah representasi object dari user tersebut bila controller menemukan kesamaan data pada login maka diberikan akses masuk namun bila tidak ada kecocokan dengan model maka akan ditolak.<br/></span></p>',
							UserId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Thaddeus Cleo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575929296+0700)/',
								Text: '<p>1. Apa itu MVC dan jelaskan (M, V, C)</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: 'cc2649f2-2b2c-4feb-84fc-7dfa0eb98780',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text: '<p>1. Apa itu MVC dan jelaskan (M, V, C)</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: 'correct',
					StatusBy: 'CY19-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595608846187+0700)/',
									Text:
										'<p>MVP mirip dengan MVC dimana sama - sama model and view. namun yang berbeda adalah di?? P dan C dimana P adalah presenter. Presenter bekerja seperti presenter di dunia asli, dimana customer akan memberikan input kepada presenter, lalu dengan kerja sama dengan model, presenter akan menghasilkan outputnya di view.</p><p>MVVM adalah Model View View-Model dimana perbedaannya dengan MVP Di VM yang berarti View-Model dimana kita sebagai customer juga dapat melihat proses atau hasil mentah dari sebuah program yang dibuat</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'd863f00d-cbbe-4452-8f05-95305bc7f3a7',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>MVP mirip dengan MVC dimana sama - sama model and view. namun yang berbeda adalah di?? P dan C dimana P adalah presenter. Presenter bekerja seperti presenter di dunia asli, dimana customer akan memberikan input kepada presenter, lalu dengan kerja sama dengan model, presenter akan menghasilkan outputnya di view.</p><p>MVVM adalah Model View View-Model dimana perbedaannya dengan MVP Di VM yang berarti View-Model dimana kita sebagai customer juga dapat melihat proses atau hasil mentah dari sebuah program yang dibuat</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575929296+0700)/',
								Text:
									'<p>2. Sebutkan dan jelaskan konsep asitektur software minimal 2 selain MVC</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '2c47b2b3-00ae-4591-8e71-a2b473d6cb7d',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>2. Sebutkan dan jelaskan konsep asitektur software minimal 2 selain MVC</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'masih salah.',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595687804600+0700)/',
											Text: 'masih salah.',
											UserId: 'c3b7f18e-78be-e911-81c2-d8d385fce79e',
										},
									],
									Id: 'b75e8965-e8ca-4b90-8150-2011599b9593',
									UserId: 'c3b7f18e-78be-e911-81c2-d8d385fce79e',
									UserName: 'Chandra Tan',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595607339715+0700)/',
									Text:
										'<p>Setiap method ada kelebihan dan kekurangannya. Untuk factory method, kita bayangkan saja sebuah perusahaan dan seorang customer. Sebagai pihak perusahaan, kita tidak mau memperlihatkan data - data keseluruhan dari perusahaan ke customer bukan ? Jadi, dengan menggunakan factory method, kita menyimpan data atau objek penting di 1 tempat sedangkan 1 tempat lagi untuk diperlihatkan ke customer</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '65b892b3-04a7-4578-be02-51181c450da8',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: 'unchecked',
							StatusBy: 'CT19-2',
							Text:
								'<p>Setiap method ada kelebihan dan kekurangannya. Untuk factory method, kita bayangkan saja sebuah perusahaan dan seorang customer. Sebagai pihak perusahaan, kita tidak mau memperlihatkan data - data keseluruhan dari perusahaan ke customer bukan ? Jadi, dengan menggunakan factory method, kita menyimpan data atau objek penting di 1 tempat sedangkan 1 tempat lagi untuk diperlihatkan ke customer</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595789269848+0700)/',
									Text:
										'<p>Karena terkadang saat membuat oop untuk sebuah keperluan, kita dapat tahu untuk keperluan apa object-object tertentu namun belum tentu tahu situasi yang akan terjadi. Sebagai contoh, kita mau menciptakan object binatang, namun ingin menciptakan bintang tertentu berdasar situasi (unta di gurun, penguin di kutub, dll), namun kita tidak bisa menebak situasi apa yang akan terjadi,?? maka dapat digunakan factory untuk menciptakan object tertentu berdasar situasinya.</p>',
									UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '0a422ca2-0243-409e-a543-aae5d760d832',
							Lovers: [],
							RespondenUserName: 'Johanes Peter Vincentius',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Karena terkadang saat membuat oop untuk sebuah keperluan, kita dapat tahu untuk keperluan apa object-object tertentu namun belum tentu tahu situasi yang akan terjadi. Sebagai contoh, kita mau menciptakan object binatang, namun ingin menciptakan bintang tertentu berdasar situasi (unta di gurun, penguin di kutub, dll), namun kita tidak bisa menebak situasi apa yang akan terjadi,?? maka dapat digunakan factory untuk menciptakan object tertentu berdasar situasinya.</p>',
							UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Johanes Peter Vincentius',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595790072427+0700)/',
									Text:
										'<p>factory method adalah salah satu creational design pattern. creational design pattern adalah design pattern yang mensolusikan problem yang ditemukan ketika suatu object terbentuk. apabila menggunakan new constructor merupakan (problem/pengulangan) kita melakukan coding berulang dan design pattern ingin menyelesaikan problem pengulangan code tersebut. jadi kalau pake new constructor itu tidak memenuhi design pattern karena kita coding berulang.</p>',
									UserId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '824b32d9-2a09-44f5-8676-7ab94abbd7d9',
							Lovers: [],
							RespondenUserName: 'Erwin',
							Status: null,
							StatusBy: null,
							Text:
								'<p>factory method adalah salah satu creational design pattern. creational design pattern adalah design pattern yang mensolusikan problem yang ditemukan ketika suatu object terbentuk. apabila menggunakan new constructor merupakan (problem/pengulangan) kita melakukan coding berulang dan design pattern ingin menyelesaikan problem pengulangan code tersebut. jadi kalau pake new constructor itu tidak memenuhi design pattern karena kita coding berulang.</p>',
							UserId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Erwin',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595790082901+0700)/',
									Text:
										'<p>Factory method digunakan untuk mengumpulkan method - method dari class - class yang berhubungan, sehingga kita tidak perlu melihat class nya secara menyeluruh untuk menggunakan suatu method.</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'a9bad991-fda3-4696-ad01-55ef3587315b',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>Factory method digunakan untuk mengumpulkan method - method dari class - class yang berhubungan, sehingga kita tidak perlu melihat class nya secara menyeluruh untuk menggunakan suatu method.</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575929296+0700)/',
								Text:
									'<p>3. Apa gunanya factory method, kenapa ga langsung new aja pakai constructor ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '0aeb4c3d-5e1d-4882-8b38-34145446828a',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>3. Apa gunanya factory method, kenapa ga langsung new aja pakai constructor ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: 'wrong',
					StatusBy: 'CT19-2',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595609345266+0700)/',
									Text:
										'<p>Creational design pattern, dimana jenis pattern ini berhubungan dengan instansi sebuah objek maupun pembuatan sebuah objek. Contohnya adalah singleton pattern</p><p>Structural design pattern, dimana jenis pattern ini berhubungan erat dengan strukturnya dan biasa digunakan dalam inheritance. Contohnya adalah Composite pattern.</p><p>Behaviour design pattern, dimana jenis design pattern ini berkaitan dengan interaksi dan komunikasi antar objek . Contohnya adalah visitor pattern.</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '87b12957-7d88-441f-b793-8285f4e2812b',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: 'correct',
							StatusBy: 'CT19-2',
							Text:
								'<p>Creational design pattern, dimana jenis pattern ini berhubungan dengan instansi sebuah objek maupun pembuatan sebuah objek. Contohnya adalah singleton pattern</p><p>Structural design pattern, dimana jenis pattern ini berhubungan erat dengan strukturnya dan biasa digunakan dalam inheritance. Contohnya adalah Composite pattern.</p><p>Behaviour design pattern, dimana jenis design pattern ini berkaitan dengan interaksi dan komunikasi antar objek . Contohnya adalah visitor pattern.</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575929296+0700)/',
								Text:
									'<p>4. Apa jenis - jenis design pattern dan perbedaannya ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: 'd143fb93-479f-4f77-bf42-256d469f5898',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>4. Apa jenis - jenis design pattern dan perbedaannya ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: 'correct',
					StatusBy: 'CT19-2',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595786960791+0700)/',
									Text:
										'<p>menurut saya design pattern yang bisa dihubungkan dengan factory adalah abstract factory dimana data - data factory tersebut akan di enkapsulasi</p>',
									UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'cc8b970a-43ac-4876-b304-be799586099f',
							Lovers: [],
							RespondenUserName: 'Jonathan Ronald Honggo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>menurut saya design pattern yang bisa dihubungkan dengan factory adalah abstract factory dimana data - data factory tersebut akan di enkapsulasi</p>',
							UserId: '980c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Jonathan Ronald Honggo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575929296+0700)/',
								Text:
									'<p>5. Desgin pattern apa saja yang dapat dihubungkan dengan factory dan mengapa ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: '84c5f38d-e92f-4cbb-989c-08fde22285e0',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>5. Desgin pattern apa saja yang dapat dihubungkan dengan factory dan mengapa ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595734861936+0700)/',
									Text:
										'<p>Solid bukan sebuah design pattern, solid merupakan sebuah design principle. Design priciple merupakan sebuah prinsip yang abstract dimana tidak dijelaskan bahwa cara kerja sebuah case tertentu menggunakan prinsip ini, justru kita harus menerapkan secara general. Design pattern adalah sebuah pattern yang bisa diikuti untuk menyelesaikan case dimana pattern bisa langsung bisa dimplemntasikan kedalam code dalam case tertentu, jika principle lebih abstract dan sifatnya secara genaral</p>',
									UserId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '9ea0f737-49b0-4141-9f1b-9f5db5c5f942',
							Lovers: [],
							RespondenUserName: 'Thaddeus Cleo',
							Status: 'correct',
							StatusBy: 'CY19-1',
							Text:
								'<p>Solid bukan sebuah design pattern, solid merupakan sebuah design principle. Design priciple merupakan sebuah prinsip yang abstract dimana tidak dijelaskan bahwa cara kerja sebuah case tertentu menggunakan prinsip ini, justru kita harus menerapkan secara general. Design pattern adalah sebuah pattern yang bisa diikuti untuk menyelesaikan case dimana pattern bisa langsung bisa dimplemntasikan kedalam code dalam case tertentu, jika principle lebih abstract dan sifatnya secara genaral</p>',
							UserId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Thaddeus Cleo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595575929296+0700)/',
								Text: '<p>6. Apakah solid adalah sebuah design pattern ?</p>',
								UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
							},
						],
						Id: 'e7b29189-c12f-4ada-a69b-32faeca5e400',
						Lovers: [],
						RespondenUserName: 'Jonathan Ronald Honggo',
						Status: null,
						StatusBy: null,
						Text: '<p>6. Apakah solid adalah sebuah design pattern ?</p>',
						UserId: '7c09193e-ecaa-e811-9421-d8d385fce79e',
						UserName: 'Jonathan Ronald Honggo',
					},
					Status: 'correct',
					StatusBy: 'CY19-1',
				},
			],
			SubjectId: 'aa349105-3eb5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T035      ',
			TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Jonathan Ronald Honggo',
		},
		{
			__type: 'CoreTrainingPresentation:#BPlusTraining.Logic',
			Comment: null,
			Deadline: '/Date(1595412000000+0700)/',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Material: 'Sub Query dan Alias Sub query',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PresentationComment: {
				__type: 'CoreTrainingPresentationComment:#BPlusTraining.Logic',
				Comment:
					'<p>1. Materi Saya secukupnya</p><p>2. Penjelasan contoh saya irrelevan</p><h1>3. SUDAH H3 tidak tau pertanyaan subco LY19-1 Bingung NAR20-2 niat core atau tidak</h1><p>4. query saya masih tidak rapih&nbsp;</p><p>5. Jangan ada yang seperti saya saat presentasi, PIC meluluskan karena kasihan</p>',
				Histories: [
					{
						__type: 'DataHistory:#BPlusTraining.Logic',
						SavedDate: '/Date(1595303727986+0700)/',
						Text:
							'<p>1. Materi Saya secukupnya</p><p>2. Penjelasan contoh saya irrelevan</p><h1>3. SUDAH H3 tidak tau pertanyaan subco LY19-1 Bingung NAR20-2 niat core atau tidak</h1><p>4. query saya masih tidak rapih&nbsp;</p><p>5. Jangan ada yang seperti saya saat presentasi, PIC meluluskan karena kasihan</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
					},
				],
				Id: '1942a63a-964d-4093-b645-b78a6760e734',
				UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
				UserName: 'Thaddeus Cleo',
			},
			PresentationDate: '/Date(1595303727825+0700)/',
			PresentationNo: 2,
			Questions: [
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'penjelasannya tidak ada',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595391516675+0700)/',
											Text: 'penjelasannya tidak ada',
											UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
										},
									],
									Id: '94b0e73c-9bbf-4a08-9125-e99b25abb915',
									UserId: '0f6c96b3-6fe4-e611-9a56-d8d385fce79e',
									UserName: 'Natasia',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595368347392+0700)/',
									Text:
										'<p>Subquery dapat dibuat di sebelah statement select, where dan having.</p>',
									UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'e0af6f11-e9ab-4339-9511-c3d743ce0054',
							Lovers: [],
							RespondenUserName: 'Yoshua Aron Nainggolan',
							Status: 'unchecked',
							StatusBy: 'NS17-1',
							Text:
								'<p>Subquery dapat dibuat di sebelah statement select, where dan having.</p>',
							UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
							UserName: 'Yoshua Aron Nainggolan',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595782207964+0700)/',
									Text:
										'<p>subquery dapat digunakan untuk where, having, in, dan, exist, dalam kepentingan validasi untuk memilih tabel tabel yang ditampilkan, dimana subquery bertindak sebagai tabel, namun dipilih dengan statement.</p>',
									UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'a030e6ec-f4c2-43c7-99cb-fc281a7a7d52',
							Lovers: [],
							RespondenUserName: 'Johanes Peter Vincentius',
							Status: null,
							StatusBy: null,
							Text:
								'<p>subquery dapat digunakan untuk where, having, in, dan, exist, dalam kepentingan validasi untuk memilih tabel tabel yang ditampilkan, dimana subquery bertindak sebagai tabel, namun dipilih dengan statement.</p>',
							UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Johanes Peter Vincentius',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595782208017+0700)/',
									Text:
										'<p>subquery dapat digunakan untuk where, having, in, dan, exist, dalam kepentingan validasi untuk memilih tabel tabel yang ditampilkan, dimana subquery bertindak sebagai tabel, namun dipilih dengan statement.</p>',
									UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '1ef70420-fb82-43c8-9dd2-dfb8eb21998f',
							Lovers: [],
							RespondenUserName: 'Johanes Peter Vincentius',
							Status: null,
							StatusBy: null,
							Text:
								'<p>subquery dapat digunakan untuk where, having, in, dan, exist, dalam kepentingan validasi untuk memilih tabel tabel yang ditampilkan, dimana subquery bertindak sebagai tabel, namun dipilih dengan statement.</p>',
							UserId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Johanes Peter Vincentius',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595303727986+0700)/',
								Text:
									'<p>1. Dimana sub query bisa di letakkan selain sebelah FROM! Sebutkan dan jelaskan!</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: 'c8f78cd5-f41d-4c2d-b39d-5f78510d43b0',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>1. Dimana sub query bisa di letakkan selain sebelah FROM! Sebutkan dan jelaskan!</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: 'wrong',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595368225624+0700)/',
									Text:
										'<p>Selain syntax in dan exists yang menyatakan sebuah ekpresi dalam statement, subquery dapat dibuat pada statement untuk perbandingan, yaitu dengan menggunakan syntax ANY, ALL, SOME</p>',
									UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '1986e493-98a4-4651-80b2-11a9cfaffcb0',
							Lovers: [],
							RespondenUserName: 'Yoshua Aron Nainggolan',
							Status: 'correct',
							StatusBy: 'NS17-1',
							Text:
								'<p>Selain syntax in dan exists yang menyatakan sebuah ekpresi dalam statement, subquery dapat dibuat pada statement untuk perbandingan, yaitu dengan menggunakan syntax ANY, ALL, SOME</p>',
							UserId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
							UserName: 'Yoshua Aron Nainggolan',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595303727986+0700)/',
								Text:
									'<p>2. Selain IN dan EXISTS subquery bisa menggunakan apa lagi?</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: 'd3170699-2dbc-4396-af3a-800907656dba',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>2. Selain IN dan EXISTS subquery bisa menggunakan apa lagi?</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: 'correct',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'coba sekalian di query saja',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595591128058+0700)/',
											Text: 'coba sekalian di query saja',
											UserId: '697551f0-e525-e911-8e6f-d8d385fce79e',
										},
									],
									Id: '770826ba-e64f-49bc-a476-58c7cc6fd242',
									UserId: '697551f0-e525-e911-8e6f-d8d385fce79e',
									UserName: 'Muhamad Daffa Mennawi',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595452605417+0700)/',
									Text:
										'<p>cara membuat nested subquery dapat dilakukan dengan cara menselect per data dengan reference dari data lain</p>',
									UserId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '78e2bafa-ea1b-4e28-bec4-b32466f505bf',
							Lovers: [],
							RespondenUserName: 'Bryan Takari',
							Status: 'wrong',
							StatusBy: 'DF19-1',
							Text:
								'<p>cara membuat nested subquery dapat dilakukan dengan cara menselect per data dengan reference dari data lain</p>',
							UserId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Bryan Takari',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595790420096+0700)/',
									Text:
										'<p>contoh:</p><div style="color: #abb2bf;background-color: #282c34;"><div><span style="color: #5c6370;"><i>SELECT??t.TeacherId,??t.TeacherName,??t.TeacherInitial??</i></span></div><div><span style="color: #5c6370;"><i>FROM??Teachers??t</i></span></div><div><span style="color: #5c6370;"><i>WHERE??NOT??EXISTS(</i></span></div><div><span style="color: #5c6370;"><i>?? SELECT??*</i></span></div><div><span style="color: #5c6370;"><i>?? FROM??Teaching??tch??</i></span></div><div><span style="color: #5c6370;"><i>?? WHERE??tch.TeacherId??=??t.TeacherId??AND??EXISTS(</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? SELECT??*</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? FROM??Classes??c</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? WHERE??c.ClassId??=??tch.ClassId??AND??ClassName??LIKE??\'[B-D]\'??AND??EXISTS(</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? ?? ?? SELECT??*</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? ?? ?? FROM??Years??y</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? ?? ?? WHERE??y.YearId??=??c.YearId??AND??y.YearStart??=??2019??AND??y.YearEnd??=??2020</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? )</i></span></div><div><span style="color: #5c6370;"><i>?? )</i></span></div><div><span style="color: #5c6370;"><i>)</i></span></div></div>',
									UserId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '37f859ff-15c9-47ea-9674-63ba8edea661',
							Lovers: [],
							RespondenUserName: 'Thaddeus Cleo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>contoh:</p><div style="color: #abb2bf;background-color: #282c34;"><div><span style="color: #5c6370;"><i>SELECT??t.TeacherId,??t.TeacherName,??t.TeacherInitial??</i></span></div><div><span style="color: #5c6370;"><i>FROM??Teachers??t</i></span></div><div><span style="color: #5c6370;"><i>WHERE??NOT??EXISTS(</i></span></div><div><span style="color: #5c6370;"><i>?? SELECT??*</i></span></div><div><span style="color: #5c6370;"><i>?? FROM??Teaching??tch??</i></span></div><div><span style="color: #5c6370;"><i>?? WHERE??tch.TeacherId??=??t.TeacherId??AND??EXISTS(</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? SELECT??*</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? FROM??Classes??c</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? WHERE??c.ClassId??=??tch.ClassId??AND??ClassName??LIKE??\'[B-D]\'??AND??EXISTS(</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? ?? ?? SELECT??*</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? ?? ?? FROM??Years??y</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? ?? ?? WHERE??y.YearId??=??c.YearId??AND??y.YearStart??=??2019??AND??y.YearEnd??=??2020</i></span></div><div><span style="color: #5c6370;"><i>?? ?? ?? )</i></span></div><div><span style="color: #5c6370;"><i>?? )</i></span></div><div><span style="color: #5c6370;"><i>)</i></span></div></div>',
							UserId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Thaddeus Cleo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595303727986+0700)/',
								Text: '<p>3. Cara bikin nested subquery bagaimana?</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: '10cd35a9-4837-4600-8790-788c415665e1',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text: '<p>3. Cara bikin nested subquery bagaimana?</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: 'wrong',
					StatusBy: 'DF19-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595525195474+0700)/',
									Text:
										'<p>kedalaman maksimum dari nested subquery adalah 32 level baik subquery itu ada di dalam where , from?? , select, dll</p><p><br/></p>',
									UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'c5ec3fdd-065b-4715-8b72-43262a7195ce',
							Lovers: [],
							RespondenUserName: 'Lionel Ritchie',
							Status: 'wrong',
							StatusBy: 'HY18-2',
							Text:
								'<p>kedalaman maksimum dari nested subquery adalah 32 level baik subquery itu ada di dalam where , from?? , select, dll</p><p><br/></p>',
							UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Lionel Ritchie',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595303727986+0700)/',
								Text:
									'<p>4. Berapa dalam kedalaman maximum dari nested subquery</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: 'a8d78ac6-45c6-4319-8c8e-cadc09770b9d',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>4. Berapa dalam kedalaman maximum dari nested subquery</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: 'wrong',
					StatusBy: 'HY18-2',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [
								{
									__type:
										'CoreTrainingPresentationComment:#BPlusTraining.Logic',
									Comment: 'dari pernyataanmu masih ada yg salah',
									Histories: [
										{
											__type: 'DataHistory:#BPlusTraining.Logic',
											SavedDate: '/Date(1595834354743+0700)/',
											Text: 'dari pernyataanmu masih ada yg salah',
											UserId: '347d8cd2-32a4-e811-9421-d8d385fce79e',
										},
									],
									Id: '2f1ec990-14b6-470d-adbb-5520afbdd8df',
									UserId: '347d8cd2-32a4-e811-9421-d8d385fce79e',
									UserName: 'Hanni Yolina',
								},
							],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595480886648+0700)/',
									Text:
										'<p>Di sql kita tidak dapat mengganti warna default dari query, kita hanya bisa mengganti warna text untuk yang bukan sebuah sql statement</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'c0e1f642-9901-4444-b12c-a4877f317dfd',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: 'unchecked',
							StatusBy: 'HY18-2',
							Text:
								'<p>Di sql kita tidak dapat mengganti warna default dari query, kita hanya bisa mengganti warna text untuk yang bukan sebuah sql statement</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595303727986+0700)/',
								Text:
									'<p>5. Apakah Dapat mengganti default warna query pada sql ? jika bisa jelasakan!</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: '02e85b66-9521-49f7-8481-1d36562fc8c7',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>5. Apakah Dapat mengganti default warna query pada sql ? jika bisa jelasakan!</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: 'wrong',
					StatusBy: 'HY18-2',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595463390425+0700)/',
									Text:
										'<p>sql clause adalah suatu statement untuk menampilkan ataupun memanipulasi data pada database.</p><p>SELECT</p><p>FROM</p><p>WHERE</p><p>GROUP BY</p><p>HAVING</p><p>ORDER BY</p>',
									UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '86de8d28-dad5-4ffa-b934-4ccd3fa8dedf',
							Lovers: [],
							RespondenUserName: 'Skolastika Gabriella Theresandia Prasetyo',
							Status: null,
							StatusBy: null,
							Text:
								'<p>sql clause adalah suatu statement untuk menampilkan ataupun memanipulasi data pada database.</p><p>SELECT</p><p>FROM</p><p>WHERE</p><p>GROUP BY</p><p>HAVING</p><p>ORDER BY</p>',
							UserId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Skolastika Gabriella Theresandia Prasetyo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595303727986+0700)/',
								Text:
									'<p>6. Apa itu Klausa SQL ? Berikan klausa tersebut secara berurutan!</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: '968adf75-ae60-4d33-8db8-480c5e189e23',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>6. Apa itu Klausa SQL ? Berikan klausa tersebut secara berurutan!</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: null,
					StatusBy: null,
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595452545383+0700)/',
									Text:
										'<p>Terkadang ssms mungkin mengidentifikasi query sebagai lanjutan dari query sebelumnya, sehingga akan muncul garis merah.</p><p>Jadi, kita menambahkan batch separator berupa GO, sehingga query akan ter-seperate dan tidak bergantung pada query atas nya lagi, sehingga garis merah nya hilang</p>',
									UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '6cdf3e42-5ca9-417e-b1c1-d71d641e1726',
							Lovers: [],
							RespondenUserName: 'Felix Novando',
							Status: 'correct',
							StatusBy: 'NS17-1',
							Text:
								'<p>Terkadang ssms mungkin mengidentifikasi query sebagai lanjutan dari query sebelumnya, sehingga akan muncul garis merah.</p><p>Jadi, kita menambahkan batch separator berupa GO, sehingga query akan ter-seperate dan tidak bergantung pada query atas nya lagi, sehingga garis merah nya hilang</p>',
							UserId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Felix Novando',
						},
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595452582202+0700)/',
									Text:
										'<p>GO itu digunakan untuk memisahkan batch - batch yang ada di sql.?? Batch itu sendiri artinya statement - statement yang dikirim ke sql server untuk di eksekusi. Jadi, batch seperator itu adalah pemisah statement - statement di sql server dan query yang digunakan untuk melakukan hal itu adalah GO</p>',
									UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: '4f0a7662-4137-4d56-9790-1fb261d84977',
							Lovers: [],
							RespondenUserName: 'Lionel Ritchie',
							Status: 'correct',
							StatusBy: 'NS17-1',
							Text:
								'<p>GO itu digunakan untuk memisahkan batch - batch yang ada di sql.?? Batch itu sendiri artinya statement - statement yang dikirim ke sql server untuk di eksekusi. Jadi, batch seperator itu adalah pemisah statement - statement di sql server dan query yang digunakan untuk melakukan hal itu adalah GO</p>',
							UserId: '940c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Lionel Ritchie',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595303727986+0700)/',
								Text: '<p>7. APa itu GO dan Batch separator ?</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: '8fad4507-724e-490e-90e6-aa9b916deeb7',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text: '<p>7. APa itu GO dan Batch separator ?</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: 'correct',
					StatusBy: 'NS17-1',
				},
				{
					__type: 'CoreTrainingPresentationQuestion:#BPlusTraining.Logic',
					AcceptedAnswerId: '00000000-0000-0000-0000-000000000000',
					Answers: [
						{
							__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
							Comments: [],
							Haters: [],
							Histories: [
								{
									__type: 'DataHistory:#BPlusTraining.Logic',
									SavedDate: '/Date(1595347948177+0700)/',
									Text:
										'<p>NoSQL atau <b>Not Only SQL</b> adalah database yang tidak struktural dan tidak harus memiliki relasi seoerti pada SQL yang harus memiliki key-key untuk merelasikan tabel-tabel. Cara kerja database NoSQL menggunakan berbagai model database untuk mengelolah dan mengakses data, contoh: dokument, key-value, graph, in-memory, dan search-engine.??</p><p><br/></p><p>Contoh :</p><p>1. MongoDB</p><p>2. CouchDB</p><p>3. Cassandra</p><p>4. Redis</p><p>5. Riak</p>',
									UserId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
								},
							],
							Id: 'ec17a9b2-db5b-4304-ba3a-62516599c8a2',
							Lovers: [],
							RespondenUserName: 'Thaddeus Cleo',
							Status: 'correct',
							StatusBy: 'EV19-1',
							Text:
								'<p>NoSQL atau <b>Not Only SQL</b> adalah database yang tidak struktural dan tidak harus memiliki relasi seoerti pada SQL yang harus memiliki key-key untuk merelasikan tabel-tabel. Cara kerja database NoSQL menggunakan berbagai model database untuk mengelolah dan mengakses data, contoh: dokument, key-value, graph, in-memory, dan search-engine.??</p><p><br/></p><p>Contoh :</p><p>1. MongoDB</p><p>2. CouchDB</p><p>3. Cassandra</p><p>4. Redis</p><p>5. Riak</p>',
							UserId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
							UserName: 'Thaddeus Cleo',
						},
					],
					DeadlinePassed: true,
					Question: {
						__type: 'CoreTrainingPresentationItem:#BPlusTraining.Logic',
						Comments: [],
						Haters: [],
						Histories: [
							{
								__type: 'DataHistory:#BPlusTraining.Logic',
								SavedDate: '/Date(1595303727986+0700)/',
								Text:
									'<p>8. Apa itu NOSQL dan apa bedanya dengan SQL? sebukan contoh NOSQL!</p>',
								UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
							},
						],
						Id: 'bfc774f0-4418-4cf5-b518-48bf2e48bf6c',
						Lovers: [],
						RespondenUserName: 'Thaddeus Cleo',
						Status: null,
						StatusBy: null,
						Text:
							'<p>8. Apa itu NOSQL dan apa bedanya dengan SQL? sebukan contoh NOSQL!</p>',
						UserId: '7effae52-92df-e811-baf7-d8d385fce79e',
						UserName: 'Thaddeus Cleo',
					},
					Status: 'correct',
					StatusBy: 'EV19-1',
				},
			],
			SubjectId: '50d03bfd-3db5-ea11-abcb-d8d385fcda38',
			TraineeCode: 'T084      ',
			TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			TraineeName: 'Thaddeus Cleo',
		},
	],

	// filename: "51fb670e-2468-ea11-abcb-d8d385fcda38|40cb12af-3db5-ea11-abcb-d8d385fcda38|ac349105-3eb5-ea11-abcb-d8d385fcda38|940c2345-e868-ea11-abcb-d8d385fcda38|1"
	GetPresentationStatus: 'Passed',

	// subjectId: "ac349105-3eb5-ea11-abcb-d8d385fcda38"
	GetPresentationReportSummary: [
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T024      ',
			traineeId: '8d0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Vincent',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T026      ',
			traineeId: '8f0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Eric Pangiawan',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 1,
			savedAt: '/Date(1595839005010+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T031      ',
			traineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Lionel Ritchie',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T034      ',
			traineeId: '970c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Ricky Imanuel',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 3,
			savedAt: '/Date(1595995130608+0700)/',
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T035      ',
			traineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Jonathan Ronald Honggo',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T036      ',
			traineeId: '990c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Kelvin',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 2,
			savedAt: '/Date(1595929714603+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T040      ',
			traineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Vincent Benedict',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 3,
			savedAt: '/Date(1595992294927+0700)/',
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T044      ',
			traineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Erwin',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T046      ',
			traineeId: 'a30c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Vlarancia',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 1,
			savedAt: '/Date(1595930472378+0700)/',
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T048      ',
			traineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Felix Novando',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 3,
			savedAt: '/Date(1595996282096+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T057      ',
			traineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Johanes Peter Vincentius',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 2,
			savedAt: '/Date(1595995136146+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T059      ',
			traineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'David',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 1,
			savedAt: '/Date(1595909465223+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T080      ',
			traineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Bryan Takari',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 2,
			savedAt: '/Date(1595912759643+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T082      ',
			traineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Stanley Dave Teherag',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 2,
			savedAt: '/Date(1595998557302+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T084      ',
			traineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Thaddeus Cleo',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 1,
			savedAt: '/Date(1595907383267+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T088      ',
			traineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Brandon Julio Thenaro',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 1,
			savedAt: '/Date(1595844780204+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T089      ',
			traineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Skolastika Gabriella Theresandia Prasetyo',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T097      ',
			traineeId: 'd60c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Muladi Muhamad',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 2,
			savedAt: '/Date(1595930511581+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T116      ',
			traineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Clarissa Chuardi',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: true,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 3,
			savedAt: '/Date(1595994315653+0700)/',
			savedBy: null,
			score: 0,
			status: 'Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T117      ',
			traineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Veronica',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T123      ',
			traineeId: 'af0d28a9-686a-ea11-abcb-d8d385fcda38',
			traineeName: 'Raka Nurul Fikri',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T124      ',
			traineeId: 'b00d28a9-686a-ea11-abcb-d8d385fcda38',
			traineeName: 'Yoshua Aron Nainggolan',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T125      ',
			traineeId: 'b10d28a9-686a-ea11-abcb-d8d385fcda38',
			traineeName: 'Rhenald Saputra',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T126      ',
			traineeId: 'b20d28a9-686a-ea11-abcb-d8d385fcda38',
			traineeName: 'Denies',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T127      ',
			traineeId: 'b30d28a9-686a-ea11-abcb-d8d385fcda38',
			traineeName: 'Levina Niolana',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T129      ',
			traineeId: 'b50d28a9-686a-ea11-abcb-d8d385fcda38',
			traineeName: 'Gianni Fiesta Dewi',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T130      ',
			traineeId: 'b60d28a9-686a-ea11-abcb-d8d385fcda38',
			traineeName: 'Andi Suryo Laksono',
			understanding: 0,
			voice: 0,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 0,
			comment: null,
			generationId: '00000000-0000-0000-0000-000000000000',
			material: null,
			notes: null,
			phaseId: '00000000-0000-0000-0000-000000000000',
			presentationId: '00000000-0000-0000-0000-000000000000',
			presentationNo: 0,
			savedAt: null,
			savedBy: null,
			score: 0,
			status: 'Not Passed',
			subjectId: '00000000-0000-0000-0000-000000000000',
			traineeCode: 'T131      ',
			traineeId: 'b70d28a9-686a-ea11-abcb-d8d385fcda38',
			traineeName: 'Stefany Chrisdayanty',
			understanding: 0,
			voice: 0,
		},
	],
	// subjectId: "ac349105-3eb5-ea11-abcb-d8d385fcda38"
	GetPresentationReportDetail: [
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 4,
			comment:
				'<p>1. Interaksi dengan mahasiswa baik.</p><p>2. Menggunakan help dengan baik.</p><p>3. Kontrol kelas baik.</p><p>4. Materi oke.</p><p>5. Penyampaian materi oke.</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Shell Script + Basic CLI',
			notes: 'materinya dah oke',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '186a5585-cf59-49cd-a6b6-a389581181d9',
			presentationNo: 1,
			savedAt: '/Date(1595839005010+0700)/',
			savedBy: 'MV19-2',
			score: 3.2,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T031      ',
			traineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Lionel Ritchie',
			understanding: 3,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Materi saya kurang banget&nbsp; :(</p><p>2. Saya dipancing mahasiswa, tapi tetap tidak bisa :"</p><p>3. Control kelas oke</p><p>4. Saya masih belum bisa bikin console sendiri</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'SerCon + Time',
			notes: 'Masih belum bisa serial console. Konfigurasi juga masih lecet.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '80c368e0-0555-4c51-a8b6-88fad6bb4833',
			presentationNo: 1,
			savedAt: '/Date(1595912182269+0700)/',
			savedBy: 'EI19-2',
			score: 2.5,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T035      ',
			traineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Jonathan Ronald Honggo',
			understanding: 2,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Saya kurang teliti dalam mengisi buku</p><p>2. Saya lupa cara config NachOS</p><p>3. Materi saya perlu dipancing</p><p>4. Materi basic NachOS saya masih minim</p><p>5. Saya kurang menguasai materi Network Link</p><p>6. Saya ingat membesarkan font</p><p>7. Kontrol kelas oke</p><p>8. Interaksi dengan mahasiswa oke</p><p>9. Pastikan NachOS dapat berjalan terlebih dahulu baru coding</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Network Link',
			notes:
				'ini config nachos aja masih gagal harus di pancing, semaphore lecet, pengertiap dia terhadap cara kerja dan alur network link lecet',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '71197ae5-64a3-454f-b548-f5226646b469',
			presentationNo: 2,
			savedAt: '/Date(1595930983104+0700)/',
			savedBy: 'IX19-2',
			score: 2.2,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T035      ',
			traineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Jonathan Ronald Honggo',
			understanding: 2,
			voice: 2,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 2,
			comment:
				'<p>1. Materi yang saya bawakan masih lecet</p><p>2. Walau sudah dipancing saya tidak dapat menyelesaikan code KThread saya</p><p>3. Saya lupa materi yang dibawakan oleh pengajar</p><p><br></p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Schedulers',
			notes:
				'Materi yang dibawakan tidak dpat tersampaikan dengan baik. Dia tidak menjelaskan scheduler secara lengkap dan perlu dipancing untuk menyebutkannya. Dan untuk KThread banyak salah code (tidak selesai codenya).',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '918862b2-3dfb-4530-91b5-3f5c0a5c8df0',
			presentationNo: 3,
			savedAt: '/Date(1595995130608+0700)/',
			savedBy: 'RX19-2',
			score: 2.3,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T035      ',
			traineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Jonathan Ronald Honggo',
			understanding: 2,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 1,
			comment:
				'<ol><li>Saya sempat membesarkan font tapi saya tidak mempertanyakannya kepada mahasiswa font saya sudah pas atau belum&nbsp;</li><li>Interaksi saya dan mahasiswa ada.</li><li>Saya ada menunjuk nunjuk layar saat saya presentasi.</li><li>Materi basic saya mengenai cli cukup oke tapi shell scripting saya null</li></ol>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Shell Script & Basic Linux Command',
			notes:
				'-Basic CLI ok (Hanya bisa 5 dari 21 line command pemberian IX)\n-Tidak bisa Shell Script\n-Tidak bisa pertanyaan subco\n-Buku tidak dipersiapkan dengan baik\n-Salah Nama PIC di bukunya',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '5f23986d-d387-4840-8d07-8244aba26e7f',
			presentationNo: 1,
			savedAt: '/Date(1595841978777+0700)/',
			savedBy: 'LH19-2',
			score: 2.1,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T040      ',
			traineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Vincent Benedict',
			understanding: 2,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<ol><li>Logika saya dapet. Pancing sedikit langsung ngerti.</li><li>Penjelasan saya kurang jelas.</li></ol>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Network Link',
			notes:
				'Pancing dikit mengerti literally 1 pertanyaan langsung diolah :), logika dapet untuk yang diajar untuk hal baru mungkin butuh waktu lebih lama.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '2b73f8c0-8406-41a4-8bdf-f96be3963e68',
			presentationNo: 2,
			savedAt: '/Date(1595929714603+0700)/',
			savedBy: 'CN19-1',
			score: 3,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T040      ',
			traineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Vincent Benedict',
			understanding: 3,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 4,
			comment:
				'<h3>1.pembukaan dan kontrol kelas sudah bagus tapi pindah working directory tidak tahu<br>2.Materi saya null habis<br>3.Saya ngemeng<br>4.Saya tidak mengerti pertanyaan subco</h3>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'shell scripting & linux command',
			notes:
				'- Pembukaan dan kontrol kelas sudah bagus\n- change dan mkdir Directory tidak bisa\n- Materi Null',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '6018568a-7090-4447-9faa-1fbce0068238',
			presentationNo: 1,
			savedAt: '/Date(1595843495353+0700)/',
			savedBy: 'CT19-2',
			score: 1.9,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T044      ',
			traineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Erwin',
			understanding: 1,
			voice: 2,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1.Materi saya kurang<br>2.OOP saya lecet sedikit<br>3.Interaksi dengan mahasiswa ada<br>4.Control class ada<br></p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Serkon & time',
			notes:
				'T044\n\nComment\n1.Materi saya kurang\n2.OOP saya lecet sedikit\n3.Interaksi dengan mahasiswa ada\n4.Control class ada\n\nSubco\nBeda kernel , shell, driver\nSemaphore dalam nachos\n\nDia cuma bisa buat sampe semaphore\nthreaded kernel di extend ke mainsystem\nmaterinya kurang sih',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'd2008acd-e3a4-4e00-87c9-9bedc1867552',
			presentationNo: 2,
			savedAt: '/Date(1595916731802+0700)/',
			savedBy: 'WU19-1',
			score: 2.5,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T044      ',
			traineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Erwin',
			understanding: 2,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Penjelasan cukup</p><p>2. Materi kurang</p><p>3. penamaan class tidak sesuai kegunaan</p><p>4. Saya mencoba menghafal</p><p>5. Saya buat schedulers tapi tidak sempat saya pakai&nbsp;</p><p>6. sudah subject OS OOP saya lecet</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Schedulers',
			notes: 'materinya kacau dan seperti ngapal.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '2f57b07a-51f8-445c-9884-dea1bb26f636',
			presentationNo: 3,
			savedAt: '/Date(1595992294927+0700)/',
			savedBy: 'MV19-2',
			score: 1.7,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T044      ',
			traineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Erwin',
			understanding: 1,
			voice: 2,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 2,
			comment:
				'<p>1. Materi Berantakan</p><p>2. Pembawaan Berantakan</p><p>3. Kurang Interaksi dengan mahasiswa</p><p>4. Rapiin kodingan (campur bahasa, upper lower case, enter kebanyakan)</p><p>5. Kurang penjelasan teori</p><p>6. Control kelas kurang</p><p>7. Saya belum bisa pertanyaan subco</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'File System',
			notes: '- tidak bisa pertanyaan subco',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '3c76bf7e-0aff-43e6-8ad5-b36e7382d9a5',
			presentationNo: 1,
			savedAt: '/Date(1595930472378+0700)/',
			savedBy: 'ZZ19-2',
			score: 2.5,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T048      ',
			traineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Felix Novando',
			understanding: 3,
			voice: 2,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Penjelasan jangan terburu-buru.</p><p>2. Biasakan luangkan waktu untuk persiapan diri sebelum mengajar.</p><p>3. Penjelasan kurang detail.</p><p>4. Pengajaran saya skip-skip.</p><p>5. Saya ngemeng.&nbsp;</p><h1>6. Teman-teman 20-2, jika masih niat core training, tunjukan niat kalian. Bukan sekedar omongan.</h1><h1>7. Pertanyaan subco masih saya sepelekan. Mau sampe kapan kalian seperti ini ?</h1><p><br></p><p><br></p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'LInux command line and shell scripting',
			notes:
				'Tidak lulus karena: \n1. Pengajaran skip-skip (vi dilompatin; rm dilompatin; mkdir hanya untuk single directory)\n2. Error untuk if[[$angka<10]] tidak mampu diperbaiki dalam 5 menit. (time limit yang dikasih PIC Presentasi).\n3. Pertanyaan subco tidak bisa jawab (alibinya mengatakan ngeblank).',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '73f2e535-507c-4a01-8bc9-65385cd38827',
			presentationNo: 1,
			savedAt: '/Date(1595837444667+0700)/',
			savedBy: 'CP18-1',
			score: 2.2,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T057      ',
			traineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Johanes Peter Vincentius',
			understanding: 2,
			voice: 2,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 4,
			comment:
				'<pre>1. Materi Lumayan \n2. Interaksi dengan mahasiswa mantap\n3. Penjelasan untuk semaphore masih kurang tepat\n4. Suaranya juga oke\n5. Saya memaksimalkan penggunaan paint\n6. Saya menutup window yang tidak digunakan di eclipse\n\n\n</pre>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Serial Console and Timer',
			notes:
				'Lulus karena overall penjelasan sudah oke. Kodingan lancar. Debugnya juga lancar. Interaksi dengan mahasiswanya dh mantap. Palingan penjelasan flow semaphorenya lecet dikit. Tapi setidaknya dia tau semaphore itu apa dan gunanya buat apa',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '9333b892-2eb5-448c-b545-926a2390d9c9',
			presentationNo: 2,
			savedAt: '/Date(1595909869915+0700)/',
			savedBy: 'OS19-2',
			score: 3.2,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T057      ',
			traineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Johanes Peter Vincentius',
			understanding: 3,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<h1>1. Materi saya hampir null.</h1><h1>2. Saya mengaku skip-skip pada saat sesi pengajaran.</h1><h1>3. Saya sudah dipancing maksimal tapi masih tidak bisa.</h1>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Scheduler',
			notes:
				'Materi hampir null dan dia bilang belum pernah nyobain scheduler karena skip skip pas training',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'c695af31-8830-4c85-bfcf-62872dd74f86',
			presentationNo: 3,
			savedAt: '/Date(1595996282096+0700)/',
			savedBy: 'OS19-2',
			score: 1.4,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T057      ',
			traineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Johanes Peter Vincentius',
			understanding: 1,
			voice: 1,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 1,
			comment:
				'<p>1. Materi saya cukup</p><p>2. Kontrol kelas tidak ada</p><p>3. saya bisa pertanyaan subco</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Network Link',
			notes:
				'Materinya sudah cukup, codingan bisa jalan. Cuma dipancing sedikit untuk bikin object Network Link dan auto receive. Konsep dan teorinya juga sudah oke.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'ac0ab28e-a4e3-4ea4-b5cf-da8ac31552f9',
			presentationNo: 1,
			savedAt: '/Date(1595929011093+0700)/',
			savedBy: 'RX19-2',
			score: 3.1,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T059      ',
			traineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'David',
			understanding: 4,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. saya peduli dengan mahasiswa</p><p>2. penjelasan oke</p><p>3. materi oke</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Scheduler',
			notes:
				'materiny oke, sedikit tersendat di akhir tapi salahnya minor dan sudah di benarkan.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'b9934fca-4139-46bc-84ad-74bc93c5495e',
			presentationNo: 2,
			savedAt: '/Date(1595995136146+0700)/',
			savedBy: 'MV19-2',
			score: 3.5,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T059      ',
			traineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'David',
			understanding: 4,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Suara mantul</p><p>2. Control class mantul</p><p>3. Saya menguasai materi meski terkadang penjelasan saya <b>sedikit</b> tersendat</p><p>4. SK mempunyai harapan kepada T080</p><p>5. Standar Presentasi nachOS minimal seperti saya</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Serial Console & Timer',
			notes:
				'Pertanyaan di jawab dan mencoba menjawab dengan baik. penjelasan oke, meski dia terpaku sama di ajarkan pengajar tapi overall oke semua. perkembangan ada / meningkat dari sebelum nya.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'e6378604-8107-460d-8e7a-0540f557fda3',
			presentationNo: 1,
			savedAt: '/Date(1595909465223+0700)/',
			savedBy: 'SK19-2',
			score: 3,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T080      ',
			traineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Bryan Takari',
			understanding: 3,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>\n            1. Saya zoom tapi telat dikit</p><p>2. Materi basic command bisa cuman di bagian shell saya kurang sedikit</p><p>3. Kontrol kelas oke</p><p>4. penjelasan sudah cukup terstruktur dan tertata rapi<br></p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Shell Script dan Basic Linux Command',
			notes:
				'T082 - Jawa alliance\n\n10 Command\npwd\nls\ncd\nmkdir\nrmdir\nrm\ntouch\nnano\nmv\nchmod\n\nPertanyaan\ncara tambahin akses tanpa pake bilangan oktet\npas ls -l ada prk prk itu apaan?\n#!/bin/bash itu nama istilahnya apa dan kegunaanya buat apa\ncara jalanin bash script file tanpa pake ./\n\n\nComment\nzoom nya telat dikit\nmateri basic command bisa\n\nSaran\ngunakan autocomplete nak\nAnda nge scripting bukan nge coding\n\nSubco\nCMD vs Powershell vs bash vs terminal (lecet dikit di powershell)\nKernel vs driver vs shell\n\nDia echo("$TANGGAL") yang buat error\nkarena itu () == `` untuk jalanin command\njadi command jalanin command jadinya error\nbasicnya bisa sih tapi command nya receh2 \njadi saya tidak luluskan, tapi dia masi tergolong yang lumayan',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '5b45ec6d-1149-424f-808c-931fdbe211d4',
			presentationNo: 1,
			savedAt: '/Date(1595840319362+0700)/',
			savedBy: 'WU19-1',
			score: 2.8,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T082      ',
			traineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Stanley Dave Teherag',
			understanding: 2,
			voice: 4,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 4,
			comment:
				'<p>\n            1. Materi cukup oke <br></p><p>2. Penjelasan tolong diperjelas lagi</p><p>3. Kontrol kelas oke</p><p>4. Interaksi dengan mahasiswa oke<br></p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Sercon & Timer',
			notes:
				'Sudah bagus tetapi pengetahuannya belum cukup dalam, mungkin karena baru pertama kali belajar dan belum research sebelumnya.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'aca6a1e7-697b-49eb-b33e-59b3672b1686',
			presentationNo: 2,
			savedAt: '/Date(1595912759643+0700)/',
			savedBy: 'PB19-1',
			score: 3.2,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T082      ',
			traineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Stanley Dave Teherag',
			understanding: 3,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Materi Saya oke</p><p>2. Control kelas oke</p><p>3. Interaksi dengan mahasiswa oke</p><h2>4. namun PIC presentasi rasa saya menghafal</h2><p>5. teman - teman 20-2 harap presentasi seperti saya tapi jangan hafal.</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Serial Console & Timer',
			notes:
				'Penjelasan doi udah mantap, materi udah oke tapi sempet bikin kzl di satu method untuk printINT(dia ngide gatau dari mana bikin method ini). Di dalam  method print dia panggil method scan () ? tidak tahu apakah menghafal apakah ngeblank',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'ddf5cc52-055d-40c8-b59c-3f13c1dbd278',
			presentationNo: 1,
			savedAt: '/Date(1595912656342+0700)/',
			savedBy: 'PB19-1',
			score: 3,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T084      ',
			traineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Thaddeus Cleo',
			understanding: 3,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Materi Saya Mantap</p><p>2. Saya ingat membesarkan font dan mengganti theme</p><p>3. Saya bisa pertanyaan Subco</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Schedule',
			notes:
				'Dapat menjalaskan materi secara lengkap walaupun perlu dipancing dikit untuk new KThread() dan configure scheduler di nachos.conf.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'b7c9a2fe-f6ad-4a50-aae9-c3af2d96981c',
			presentationNo: 2,
			savedAt: '/Date(1595998557302+0700)/',
			savedBy: 'RX19-2',
			score: 3.8,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T084      ',
			traineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Thaddeus Cleo',
			understanding: 4,
			voice: 4,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Materi saya lancar.</p><p>2. Jika mengajar, coba memperlambat cara mengetik.</p><p>3. Saya membuat console dengan singleton.</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Sercon + Timer',
			notes:
				'Mater lancar. Mampu mebenarkan error dengan lancar sekali (jado debug). Cuma menurut saya cara mengajarnya masih agak cepat, kurang pelan2 untuk ke mahasiswa. Tapi overall mantap.',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '0b36f38d-13ae-45f0-bdb0-604c20c67690',
			presentationNo: 1,
			savedAt: '/Date(1595907383267+0700)/',
			savedBy: 'EI19-2',
			score: 3.5,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T088      ',
			traineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Brandon Julio Thenaro',
			understanding: 4,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Materi saya mantap</p><p>2. Control kelas bisa lebih baik</p><p>3. Saya lupa zoom diawal</p><p>4. Saya menjelaskan shortcut dengan baik</p><p>5. Argument &amp; Help telah saya jelaskan dengan baik</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Shell Script  + Basic Command Line',
			notes:
				'T089\n\nCommand\nls\npwd\nmkdir\ntouch\nnano\ncat\nrm\nmkdir\ncd\nchmod\necho\nman\nhistory\ndu\ndf\n\nComment\nmateri saya lancar\nkontrol kelas bisa lebih baik\nsaya lupa zoom di awal\nsaya menjelaskan shortcut dengan baik\nargs dan help sudah dijelaskan dengan baik\n\nSaran\nGunakan autocomplete lebih baik lagi\npastikan semua file yang tidak berhubungan dengan pengajaran di close terlebih dahulu\n\nSubco\n1. Kernel vs driver vs shell (pengertian lancar )\n2. Semaphore dalam nachos (udah bisa)\n\nDia penjelasan udah oke\ntiap command dijelaskan secara lengkap\npertanyaan subco juga penjelasannya lumayan, krg detail tapi by general nya udah bener\nbash nya lancar smpe looping foreach\nPIC senang overall',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'c2644902-1a3a-4132-aec5-4ec4c4b7203b',
			presentationNo: 1,
			savedAt: '/Date(1595844780204+0700)/',
			savedBy: 'WU19-1',
			score: 3.8,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T089      ',
			traineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Skolastika Gabriella Theresandia Prasetyo',
			understanding: 4,
			voice: 4,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 1,
			comment:
				'<p>1. Introduction tidak jelas</p><p>2. Ada tanya font diawal</p><p><span style="background-color: initial;">3. Gak ada kontrol kelas</span><br></p><p>4. Kadang ada beberapa option kurang dijelasin pada command</p><p>5. Pergi ke pasar beli gas, kalau negur yang tegas</p><p>6. Pergi ke jepang beli sake, materi saya cukup oke</p><p>7. Pergi ke pasar bareng mama, kalau ngajar jangan lama</p><p>8. Lagi tidur digigit ngengat, suara saya kurang semangat</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Shell Script & Linux Command Line',
			notes:
				'- Introduction tidak jelas\n- Ada tanya font\n- Kurang semangat suaranya\n- Ga ada kontrol kelas\n- kadang ada beberapa option kurang dijelasin',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: '4ff8d60f-dceb-4acd-b2bf-85a4a0f4829a',
			presentationNo: 1,
			savedAt: '/Date(1595839453071+0700)/',
			savedBy: 'CT19-2',
			score: 2,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T116      ',
			traineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Clarissa Chuardi',
			understanding: 3,
			voice: 1,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Saya tidak bisa menyelesaikan tantangan sederhana dari pic</p><p>2. Materi saya lumayan baik</p><p>3. Font saya lupa diperbesar</p><p>4. Suara sudah lumayan keras</p><p>5. Rangkai kata-kata dengan baik sebelum menjelaskan</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'File System',
			notes:
				'lulus karena kodingannya lancar dan ditanya beberapa hal dia dapat jelasin. Tapi ditantang hal yang sederhana tidak bisa',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'c5f919e3-e16f-4b49-afd8-eb49fd6dd064',
			presentationNo: 2,
			savedAt: '/Date(1595930511581+0700)/',
			savedBy: 'OS19-2',
			score: 2.5,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T116      ',
			traineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Clarissa Chuardi',
			understanding: 2,
			voice: 3,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<p>1. Control kelas ok</p><p>2. Saya ingat untuk membesarkan font</p><p>3. Materi saya kurang</p><p>4. Saya masih kacangin mahasiswa saat error sudah diselesaikan</p><h1>5. WU19-1 kehilangan harapan dengan saya</h1>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Shell Script & Basic Linux Command',
			notes:
				'T117\n\nCommand yang bisa\npwd\nmkdir\ncd (lecet)\nls\ntouch\nrm\nwhoami\nadduser (gagal)\ndeluser (tidak dipraktekan)\n\n\nPertanyaan : \ntouch itu apakah kegunaan nya hanya untuk membuat file? apakah ada cara lain\ncara remove sebuah folder yang ada isinya\ncari tahu shortcut lain dalam linux\n\nComment : \nControl class oke\nSaya mengingat membesarkan font\nSaya masih terkadang mengacangin mahasiswa\nWU19-1 kehilangan harapan dengan saya\n\nSaran : \nGunakan autocomplete\nTerminal nya jangan lupa di maximize\ngunakan help sebaik mungkin\nJika menggunakan command lain jangan lupa dijelaskan\n\nPertanyaan Subco :\n1. Kernel Shell Driver (kurang tepat)\n2. Semaphore (salah besar)\n\ngak bisa ke folder sebelumnya\nterus beberapa command dia contohin tpi tidak keliatan\nterus command sederhana cd gak bisa',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'c25fa118-cda0-4684-8c14-3a5f07f8ff64',
			presentationNo: 1,
			savedAt: '/Date(1595835833972+0700)/',
			savedBy: 'WU19-1',
			score: 1.4,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T117      ',
			traineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Veronica',
			understanding: 1,
			voice: 1,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 2,
			comment:
				'<p>1. Ingat font walau agak telat</p><p>2. Materi saya kurang</p><p>3. Penjelasan saya kurang</p><p>4. Saya dipancing PIC</p><p>5. Saya sedikit menghapal</p><p>6. Saya masih belum mengerti konsep Nachos</p><p>7. Suara masih kecil dan lemah lembut</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Sercon & Timer',
			notes: 'materi ny masih kurang, dan lemah lembut',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'd91ace60-3553-4263-976e-8776974ebe87',
			presentationNo: 2,
			savedAt: '/Date(1595909355936+0700)/',
			savedBy: 'MV19-2',
			score: 2,
			status: 'Not Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T117      ',
			traineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Veronica',
			understanding: 2,
			voice: 2,
		},
		{
			__type: 'TraineePresentation:#BPlusTraining.Logic',
			IsActive: false,
			classControl: 3,
			comment:
				'<h1>1. Saya berhasil menepati janji lulus pada hari ini</h1><p>2. Materi saya mantap</p><p>3. Saya ingat untuk membesarkan font</p><p>4. Sebisanya kalo ketemu error di debug dulu sampai selesai</p><p>5. Biasakan untuk menjelaskan error setelah di debug</p>',
			generationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			material: 'Scheduler',
			notes:
				'lulus karena kodingan dia bisa debug sendiri. Terus nggak macet macet amet. Ditanyain tentang kodingannya juga dominan dia bisa jelasin dengan baik',
			phaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			presentationId: 'ba51140e-7566-43f4-b24d-26ab4b9025ef',
			presentationNo: 3,
			savedAt: '/Date(1595994315653+0700)/',
			savedBy: 'OS19-2',
			score: 3,
			status: 'Passed',
			subjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
			traineeCode: 'T117      ',
			traineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			traineeName: 'Veronica',
			understanding: 3,
			voice: 3,
		},
	],
	//#endregion

	//#region Vote.svc
	// scheduleId: "195b4281-9256-45c9-8198-914794b5adaf"
	GetTopBottomVotesForSchedule: [
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'kurang hardskill dan suaranya kecil, namun saya percaya dengan core training ini dan kami dapat membantu dia meningkatkan hardskillnya.  Saya juga yakin suaranya akan lantang ketika sudah nyaman di lingkungannya',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'kurang disiplin, namun saya sudah melihat dia terus berkembang dan terus mencoba untuk disiplin, ketika sudah melakukan kesalahan, saya melihat dia terus mencoba agar tidak mengulanginya',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'sering kehilangan motivasi, namun ketika diingatkan kembali, dia kembali aktif dan termotivasi untuk menjadi teaching assistant yang baik',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'aktif, pintar, dan jago saat menjelaskan ke teman lainnya',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Jiwa kepemimpinannya terlihat saat core training',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'peduli terhadap orang lain dan mau menjelaskan kepada orang lain',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: 'c2589a02-a58d-40ef-b308-75009b5a3ac5',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'mungkin pas menjawab atau berkata pemilihan katanya tidak bagus',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'tidak tau mau milih siapa lagi',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'kadang pas ditanya tentang soal yang kurang dimengerti, suka dijawab tinggal research saja yang kesannya agak sombong',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'membantu dalam banyak hal,bp, onsite, bisa mengatur dengan baik, dapat diandalkan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'sering membantu, peduli, enak diajak kerja sama, orangnya asik',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'baik, ingin membantu jika dia bisa, langsung bertanya jika orang lain tidak bisa, ingin maju',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: '8389e2cc-3c2c-4c99-a8da-fa7b1828d853',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Meskipun mempunyai niat yang kuat T117 masih belum menemukan metode belajar yang tepat untuk dirinya agar bisa menguasai materi dengan baik dan T117 masih kurang dalam disiplin waktu kehidupan sehari hari',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Dikarenankan masih mempunyai kekurangan dalam hal pembicaraan',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Mental masih kurang dan terlihat dengan sangat jelas meskipun aktif dalam core training',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Saya memilih karena Trainee T031 termasuk trainee yang bisa mengontrol angkatan dan tahu kapan timing yang tepat dalam melakukan sesuatu. Dan juga trainee T031 dapat membantu sesamanya yang kesusahan dengan perlahan tapi pasti.',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Saya memilih Trainee T088 untuk menjadi yang kedua dikarenakan Trainee T088 mempunyai pengetahuan diatas rata rata angkatan dan sangat handal dalam melakukan research , tetapi cara mengajar terhadap angkatan masih kurang',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Dikarenakan T057 juga mempunyai kemampuan materi diatas rata rata angkatan tetapi masih banyak kekurangan di kehidupan sehari hari dan tata cara bahasa saat berbicara .',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: 'fb5000b1-1849-4540-ab07-9c487b8503ca',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'mungkin jonathan agak sering tidur waktu saat mengerjakan BP',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'menurut saya, T117 hanya kurang di bagian pemahana dalam waktu singkat, dan mungkin sering tertinggal',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'menurut saya mungkin T059 agak kurang terbuka pada angkatan',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karena T031 selalu menjadi pemimpin angkatan baik dalam maupun luar core training dan dia selalu peduli terhadap sesama',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karena T088 hampir selalu yang memberikan ide dan membantu angkatan dengan kepandaiannya, dia juga sering research padahal di waktu yang sangat sempit dan tidak sungkan untuk mengajarkan yang ia tahu kepada sesama',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'T057 adalah orang yang caring dan perhatian, dia tidak segan untuk langsung pc seseorang jika ada terjadi apa - apa, walaupun mungkin tidak paling pintar, tapi dia selalu berusaha sebaiknya',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: 'd2671780-83a8-40ed-9e76-717191110e6d',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Masih perlu belajar untuk inisiatif dalam mencari peran. Namun trainee ini sudah berjuang.',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Perlu lebih inisiatif dalam menanyakan teman mengenai bisa/tidak terhadap suatu materi.',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Masih perlu belajar lebih dalam materi, namun usahanya sudah luar biasa.',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karena selalu memahami materi dengan mantap dan bersedia membantu angkatan.',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Memahami materi dengan sangat cepat dan bersedia membantu teman-teman yang kurang mampu memahami materi tsb.',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Karena suka membantu.',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: '9029c2c4-f0b1-496e-b8fd-6c611c9f2b6c',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'pemahaman materi masih kurang.',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'pemahaman materi masih kurang , terkadang bicara suka tidak tegas atau takut',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'pemahaman  materi masih kurang, suara terkadang masih kecil (tidak lantang),',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'semua materi paham, memimpin angkatan sangat bagus, punya sifat pemimpin, peduli terhadap angkatan dan sering membantu apabila ada kesusahan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'pandai research, pengetahuan sangat luas, sering membantu dan mengajar kepada sesama sampai mengerti',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sering membantu sesama, materi paham, tidak egois dan sering berfokus untuk membantu yang lain tidak egois.',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: '8a60110d-4731-4209-90ef-135a787a04b5',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sering banget bantu angkatan, tapi kadang - kadang keras kepala',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'sering bantuin angkatan, tapi kurang aktif kalo kasi pendapat',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang aktif pas kasih pendapat, orangnya inisiatif',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Banyak bantuin orang pake ilmu yang dia punya, punya inisiatif untuk ngelakuin sesuatu',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Inisiatif, suka bantuin angkatan, banyak kontribusi kasih pendapat',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Penyemangat di angkatan, pembawaannya santai tapi tegas, bisa bikin suasana lebih santai di angkatan',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: 'e3f3d6b4-f995-48e1-8ab0-63a68e7d8c87',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hanya kurang dalam materi',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Dalam hal materi dan kontribusi juga kurang ketika mengerjakan konsekuensi namun T117 selalu hadir dalam diskusi kelompok',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Terkadang dalam penangkapan materi juga masih kurang sehingga kesulitan untuk membatu teman teman yang mungkin juga membutuhkan bantuan.',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sering membantu angkatan dalam berdiskusi dan evaluasi angkatan. Dan koordinasi antara angkatan bisa lumayan berjalan dengan baik dengan bantuan lionel. Hardskill yang dimiliki juga sangat baik',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Brandon sering membantu dalam hal hardskill dan kesabaran dalam mengajari saya dan trainee yang lain sampai bisa memahami materi yang di ajarkan.',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sering membantu untuk memberikan ide untuk angkatan dan aktf dalam membatu sesama',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: 'ac936983-d05b-4cfc-af3e-f27eebe29851',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Kurang beradaptasi',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Terlalu diam',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang berinteraksi dengannya',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Selalu membuka bicara dan diskusi sehingga sangat membantu dalam core training',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Tanpa dia akan sulit mengerjakan BP',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karena sering membantu saya dalam kesulitan(debugging, dan menjelaskan saya mengenai materi)',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: 'a6baffac-4465-4456-bf25-bbbc8a49f59f',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Memotong pembicaraan dan menanyakan pertanyaan yang sudah ditanyakan',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Kurang aktif berpartisipasi dalam pembicaraan',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Kurang aktif memberi pendapat dan pengalaman',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Bisa mengumpulkan angkatan dan memberi target yang bisa disetujui semua orang',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Rasa ingin membantu dan peduli yang kuat terhadap orang lain',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Berani menanyakan pertanyaan dan mendalami pertanyaan-pertanyaannya, hingga semua orang dapat ikut mengerti',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: 'cdd1bd16-9e31-448a-aea6-b2ff2b22f1d0',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Saya merasa T088 lebih sering mementingkan diri sendiri dan apabila membantu seperti hanya setangah - setengah',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Kadang apabila angkatan ditengah" suatu pembahas sesuatu yang penting T080 menyela dan membicarakan hal lain',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'saya tidak tau harus memilih siapa lagi',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karena T031 dapat memimpin dan mengarahkan angkatan dengan baik, serta sering membantu sesama apabila ada yang kesulitan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karena T116 sering membantu angkatan baik dimintai tolong maupun tidak',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karena T057 apabila dia bisa dia pasti akan membantu secara maksimal dan tidak setangah - setengah',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: '0db87819-6bfb-4904-a540-4cddeaa1a5c6',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Jujur, tidak ada yang mau saya vote down. Jadi ini random',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Jujur, tidak ada yang mau saya vote down. Jadi ini random',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Jujur, tidak ada yang mau saya vote down. Jadi ini random',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karna dia literally yang menjadi penggerak Trainee2 lainnya. Yang selalu menjadi leader',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'BlueJackets butuh orang seperti Brandon yang mantap di Hardskill, dia juga peduli sama angkatan.',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'karena Clarrisa sering membantu angkatan dalam berbagai hal, seperti buku angkatan, dll, kebanyakan credits from her.',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: 'b5886355-75ab-481e-86ab-0d8faaa8521a',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang disiplin dan kadang suka tidak serius',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang fokus dalam mengerjakan sesuatu',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'terkadang bisa kurang perhatian dan kurang fokus',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'mampu memimpin dan memotivasi angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'mampu mengajari angkatan dengan materi-materi yang tergolong susah',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'mau membantu orang lain dengan cepat',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: '622e415f-8a2b-4b24-a912-5a578b5c946e',
		},
		{
			__type: 'TopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Kemampuan berbicaranya kurang dan penguasaan materi kurang.',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Kurang disipliin',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Penguasaan materi kurang',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Karena T031 memiliki kemampuan bicara yang baik serta penguasaan materi yang baik.',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Katena T088 memiliki kemampuan penguasaan materi dan daya tangkap yang luar biasa.',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Karena T084 telah berkembang sangat pesat sampai hari ini.',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
			VoteId: '8dd4d657-efdb-4205-9828-cb68b218f9fa',
		},
	],

	// scheduleId: "195b4281-9256-45c9-8198-914794b5adaf"
	GetTrainerTopBottomVotesForSchedule: [
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Nanya banyak tapi ngertinya lama banget',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Ninja',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Ninja',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Umbe',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Umbe',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Bole la',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'BE19-2',
			VoteId: 'dacd3406-b553-4ce7-b387-4d2a146efd83',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Nanya banyak tapi ngertinya lama banget',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Ninja',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Ninja',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Umbe',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Umbe',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Bole la',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'BE19-2',
			VoteId: 'b815a0fc-af7b-4cb7-927b-27c9cce9ab3a',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Aktif namun yang dia ucapkan kadang kurang dipikirkan terlebih dahulu, lalu juga sewaktu sesi materi terlihat seperti cari perhatian dengan memutar"kan pertanyaan yang intinya sama',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Jika dilihat dari cara dia presentasi (materi dan cara menjelaskan) , seharusnya dia bisa carry angkatan lebih baik lagi apalagi kalo dilihat dari jumlah angkatannya yang kian hari kian menyurut seharusnya lebih mudah lagi untuk mengajari angkatannya. Coba sering-sering di tembak buat ditanyain bantuin siapa aja dan cara ngajarinnya bagaimana. Namun overall doi salah satu orang yang paling ga skip-skip sih',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Terlalu polos dan agak sering skip skip',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Seorang veteran yang paling aktif, dan sering tebein angkatannya pas eval',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Salah satu trainee yang jarang skip dan bisa relate dari materi yang sekarang dengan materi yang sebelumnya',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Mulai aktif di eval dan menunjukkan perubahan',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'SL19-1',
			VoteId: '38c10311-b2b4-4b8c-8436-a12ba46631ca',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'urutan nilai dbhproject',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'urutan nilai dbhproject',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'urutan nilai dbhproject',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'urutan nilai dbhproject',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'urutan nilai dbhproject',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'urutan nilai dbhproject',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'JA17-1',
			VoteId: 'ebb721fb-8b7e-456e-9d92-d8e1c0268799',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'JA17-1',
			VoteId: '6a64a739-6479-4ca2-aa94-19864a87b518',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sebenar nya yang ini awal nya bagus, tapi makin kesini, dia performa menurun, mungkin memang 2 subject ini tidak cocok di dia? saya berharap di kedepan nya bagus sih',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Yang ini gak tau di sebelum nya, tapi kemarin di OSH1 dia cd aja lupa, terlihat gak fokus dan suka ngemeng, semoga kedepan nya membaik',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Untuk yang ini , ku suka sama sifat nya yang baik sih sama sopan. tapi kata angkatan ku dll bilang kalo di belakang dia beda, terus juga untuk materi akhir akhir ini menurun',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Terlihat dia carry angkatan, cukup oke sama mental bisa di kontrol',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'DIa hardskill nya sih yang nonjol ,dan kurasa dengan background dia yang pernah nyentuh web dll cukup berpotensi',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'ku lihat dia cukup berkembang sih, beberapa kali sempat di tertinggi nilai bp nya',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'SK19-2',
			VoteId: '57a201ab-aefc-4364-a189-88074e1f43cf',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materi kurang',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materi kurang, sering ngemeng',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materi kurang, tidak aktif di eval',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskill ok, logika berjalan, terlihat baik',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Aktif di angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskill ok',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'EZ17-1',
			VoteId: '2b132e54-069a-4624-af90-4f6d07cd545b',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ninja',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ninja',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ninja',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'initiative omong di eval',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'skill bagus',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'selalu mencoba dan berusaha',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'LW18-2',
			VoteId: '9cb98058-7905-4df7-bcb3-06c42eea0d29',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'masih kurang menunjukkan perkembangan dari core training sebelumnya',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'menurut saya keliatan kurang serius dalam menjalani core training (salah satu cthnya membalas chat di grup line)',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'cara menjelaskan saat mengajar kurang jelas, suka ngemeng, terlihat kurang serius dalam mengikuti core training',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'aktif di eval dan menunjukkan adanya perkembangan dalam materi',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'menunjukkan perkembangan dalam materi',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'materi mantap dan sudah mulai mau membantu angkatannya',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'LI19-1',
			VoteId: 'b235f581-4d6e-40fb-a31d-824bd5ed4dd5',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'suka ngemeng doang di eval bikin lama kzl banget. Asal jawab tapi tidak dilakukan. Tertawa saat eval ( di LINE ) ketika temannya terkena masalah',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Secara Hardskill kurang dan di eval tidak aktif.',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Secara softskill kurang secara hardskill kurang, kurang terlihat niat untuk corenya (lemes lemes gitu jawabnya dan perawakannya)',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: '- Hardskill oke, carry angkatan dan aktif di eval',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: '- Hardskill mantap lumayan aktif saat eval',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'- Terlihat perkembangan dari awal core training sampai skarang',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'PB19-1',
			VoteId: '554124e9-25e6-4d41-8c1f-25c6ff9a171c',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ngemeng doang, tb banget.',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill kurang, agak tb, namun mungkin mulai tobat',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'materi kurang, soft skill kurang',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Carry angkatan, materi oke, softskill oke',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Carry angkatan di hardskill, softskill nya masi kurang, sekian',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskill oke, cuma mungkin saya jarang liat aja saat eval',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'AE19-2',
			VoteId: '6f94596c-6feb-4425-862b-a538d5c8a95e',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Suaranya kecil, mentalnya masih kurang kuat (sering sekali terlihat menangis), materinya menurun padahal pas awal oke',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Terlalu polos dan kurang terlihat inisiatifnya membantu angkatan',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Ninja, dan belumterlihat aktif di angkatan, dia keliatan aktif karena suka DC (sebenernya saya ga mau vote buttom dia, tapi slotnya harus filled semua)',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sejauh ini dia trainee yang paling bersih dari kesalahan, dan setiap maju selalu lulus, materi oke',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskillnya tidak diragukan lagi, suka bantu angkatan',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Mulai terlihat perkembangan dan bantu ke angkatannya',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'EI19-2',
			VoteId: '03fc9521-503f-4f04-a611-af1df382dee0',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Masih pasif dan materi kurang',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Ngemeng dan gafokus eval (muka cuma setengah terus)',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Pasif',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskill mantap dan aktif di eval',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Setidaknya dia mencoba untuk aktif',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskill oke dan cukup aktif',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'EV19-1',
			VoteId: 'e16acccf-0de7-4d27-9838-6a0ead650c96',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Suaranya kecil, mentalnya masih kurang kuat (sering sekali terlihat menangis), materinya menurun padahal pas awal oke',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Terlalu polos dan kurang terlihat inisiatifnya membantu angkatan',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Ninja, dan belumterlihat aktif di angkatan, dia keliatan aktif karena suka DC (sebenernya saya ga mau vote buttom dia, tapi slotnya harus filled semua)',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sejauh ini dia trainee yang paling bersih dari kesalahan, dan setiap maju selalu lulus, materi oke',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskillnya tidak diragukan lagi, suka bantu angkatan',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Mulai terlihat perkembangan dan bantu ke angkatannya',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'EI19-2',
			VoteId: '569040b3-856a-4ac7-b780-f3f00a1d0af4',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Suaranya kecil, mentalnya masih kurang kuat (sering sekali terlihat menangis), materinya menurun padahal pas awal oke',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Terlalu polos dan kurang terlihat inisiatifnya membantu angkatan',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Ninja, dan belumterlihat aktif di angkatan, dia keliatan aktif karena suka DC (sebenernya saya ga mau vote buttom dia, tapi slotnya harus filled semua)',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sejauh ini dia trainee yang paling bersih dari kesalahan, dan setiap maju selalu lulus, materi oke',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskillnya tidak diragukan lagi, suka bantu angkatan',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Mulai terlihat perkembangan dan bantu ke angkatannya',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'EI19-2',
			VoteId: 'fb81f159-0e77-458f-bef9-4264b376bfc6',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: null,
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'LY19-1',
			VoteId: '07ff1f9e-9982-4591-879a-5650c46e7c0a',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Anaknya agak skip skip dan kurang membantu sesama',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Anaknya agak skip skip dan tidak bersuara',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Ngajar ala youtuber',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Cukup menguasai  materi dan presentasi lancar',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Veteran yang telah menerapkan cara main Core Trainning dimana aktif membantu, inisiatif dan menanyakan  angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Veteran, kyknya karena Veteran dia tau hrs saling membantu sesama',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'LH19-2',
			VoteId: '0b13482e-7644-49dc-a4fa-8959f9e4a37a',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'ini kalau saya ngajar pagi biasanya dia rada skip skip, pernah ketiduran juga. kemudian, Dia kalau ngomong berbelit belit jadi kaya ga dipikir dulu sebelum ngomong, pokonya nyeplos dulu aja, makanya dia ngomong suka bertentangan kalau digali terus. ga cuma di eval, di presentasi juga kalau jelasin materi muter muter dulu terus materi A sebenernya belom selesai, dia uda gas materi B, terus nanti kalau dia tau tau keinget, loncat lagi balik materi A.\nsering ngemeng',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'ini trainee skip skip parah kalau materi, saya ajarin banyak jenis cursor dan trigger, pas presentasi ditanya satupun juga gak tau, padahal diulang-ulang terus waktu materi. \nwaktu materi cli juga sama, dia command cd aja gabisa waktu saya jalan jalan di classroom trainee.\ndan meskipun begitu dia hampir gapernah nanya waktu sesi materi, jadi presentasi dia sering null.\nkemudian dia sering nangis kalau presentasi ga lulus, menurut saya ini poin minus sih karena nanti masa kalau jadi asisten terus mahasiswanya aneh-aneh, dia nangis gitu di tengah sesi, jadi kurang profesional',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'ini diem banget, eval kalo ga ditunjuk ga ngomong, di classroom juga yang lain diskusi dia diem mendengarkan doang gitu ga ikutan diskusi atau sharing atau apa gitu, mungkinkah kondisi rumahnya berisik? tapi saya perhatikan mulai dari Java sampai sekarang begitu terus sih',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'tbin eval, aktif membantu angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'daya tangkap dia cepat untuk materi, dia suka bantu angkatannya, cuma dia biasanya baru bantu kalau ada yang error terus minta bantu, atau ada yang nanya, jadi ga selalu share sendiri',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'dia hampir selalu ngikutin sesi materi (ikut code, ga cuma merhatiin doang), terus dia kalau ga ngerti dia langsung nanya pengajar dan bisa sampe lewat waktunya, dan dia beneran nanya dan ada beberapa materi dia yang berhasil presentasinya lulus juga, bukan cuma sekedar cari perhatian sih menurut saya.\nKemudian dia juga suka bantu angkatannya yang ketinggalan ngerjain soal atau yang mau presentasi kalau di ruangan',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'IX19-2',
			VoteId: 'ce87bd65-2e5c-4287-8bc8-33fb67eccfdb',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill imba, softskill lumayan',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'aktif eval, hardskill lumayan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill lumayan',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'GE19-1',
			VoteId: '2bc87a83-3bbf-4783-8e5a-0f67c49eb7b4',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sangat tidak disiplin (buku sudah nggak dibuka dan tidak update 1 minggu) kalau nggak saya marahin mungkin masih berlanjut',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Sering tb tb dan asal jawab di eval',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'nampaknya agak ninja',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Carry angkatan + leadernya angkatan ini',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Kelihatan salah satu yang paling niat. Di classroom sering terlihat bantu-bantu. Pas sesi pengajaran kelihatan paling aktid dalam bertanya',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Hardskill jago dan banyak membantu pas sesi. Tapi palingan inisiatifnya masih belum banyak terlihat.',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'OS19-2',
			VoteId: '56cdd3d1-3f0d-45c3-ad71-6bb0fa58c746',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ada banyak perkembangan terutama di pembantaian',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'masih terlihat menyedihkan dalam segi materi',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'fak up internet, fak up materi, fak up softskill',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ibarat helper di suatu arsitektur kodingan.',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sedikit ada perkembangan dari yang duls meskipun tetep stay sm bbrp org doang',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ibarat kartu as di poker',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'IR19-1',
			VoteId: '0a748d9a-f61a-4573-beb8-3865b5d161e7',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'tidak terlihat pas eval',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'suka ngemeng',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'materinya sangat kurang, softskill tidak terlihat',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'materi ok softskill ok',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'aktif eval, materi lumayan',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'materi kelihatannya ok',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'GN18-2',
			VoteId: 'b440c2d5-415c-49d3-8dcd-e8b0d9f0b871',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'mental disuapin karna banyak nanya',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ditanya apa jawabnya apa, ga fokus',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang aktif',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'imba, uda dapet banyak sertifikat dan jarang kenak masalah di core',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hard skill lumayan, perkembangan terlihat',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'aktif karena veteran, carry angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'AC19-1',
			VoteId: '1f037931-9c1a-4fe1-b299-6467675c4d78',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Makin lama progressnya makin turun. Presentasi sering NULL, materi basic sangat lecet. Sering ngemeng juga. Dan kalo presentasi sering nangis (terlihat tidak profesional). Masa nanti ngajar mahasiswa sebat, nanti dia nangis pas ngajarin.',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Telihat solo sih, tidak bisa membaur angkatan. Kalo di diskusi sering dia diem sendiri gitu, jarang unmute.',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Makin ke belakang makin banyak skip-skip, telat terus. Dan terkahir presentasi kan dia gk lulus, trus dia malu buat tunjukin commentnya (yang di h1 dia kek cuma kasih liat sekilas doang). Banyak ngemeng jg sih, asal ngomong yg penting aktif pas eval.',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Kalo misalkan lagi eval, dia cukup aktif sih. Dan dia juga paling tau tentang angkatannya klo ada apa apa.',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Carry angkatan. Di awal agak gk keliatan dominasinya cuma makin ke kebalakng makin keliatan. makin sering bantu angkatan dan cepat dalam kerjain soal. Kalo diliat dari websitenya, anak ini juga suka belajar.',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Walaupun materinya agak tersendat. namun saya suka cara penyampaian dia saat mengajar. Selain itu, dia juga sering bantu angkatan kalo misalkan ada masalah. Saya rasa kalo dia sudah persiapan matang, mahasiswa gampang nangkep apa yang diajarkan.',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'RX19-2',
			VoteId: 'c224d54d-649c-4194-b2e0-5c11c571f413',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Kurang tau niat nanyanya apa, bisa jadi untuk ngulur karena pertanyaannya cukup basic',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Jawaban ngelindur, yang ditanya A jawaban Z',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Terlalu pasif dalam masalah eval',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Hardskill oke, alur mengajar oke cukup aktif untuk membantu angkatan',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Terlihat perkembangan dari awal masuk dan hardskillnya cukup, softskill masih terbilang oke',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Carry angkatan, eval hiperaktif. Veteran yang banyak bantu.',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'BD19-1',
			VoteId: 'd798336a-bbe5-4821-9799-2a8b716d651a',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'cara bicara kurang logis saat eval, suka bilang "saya tidak ada alasan lagi kak"',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'bicara ketika eval tidak mikir dlu, langsung bicara saja',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'udah veteran masih malu2 kelihatannya, suara masih lembut, mental masih lemah',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'lumayan carry angkatan veteran yang sudah mantul',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'kelihatannya hardskill imba, tapi siapa tau ada udang dibalik batu',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'softskill imba, bisa bicara dengan logis',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'AL19-1',
			VoteId: 'a56431fd-8211-4a53-a622-d1495fb677f6',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materinya minim, softskill kurang juga',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Materinya minim, softskill kurang juga, dan suka panjang lebar ngomongnya (tidak to the point)',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Materinya masih kurang (masih harus dipancing), tapi harusnya masih bisa meningkat',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Aktif di eval (softskill mantap), hardskill normal',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Softskill normal, sering memberikan ide, hardskill normal',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Hardskill mantap, tapi softskill kurang',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'YT19-2',
			VoteId: 'e40a40da-7f26-4e9b-9bf1-e85f09cfe700',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sebagai veteran, belum menunjukkan contoh seperti apa trainee seharusnya. Secara hard skill masih kurang. Kalau dari frekuensi membantu saat nyelip ke discussion room, termasuk yang minim memberikan bantuan (mengetahui posisinya sebagai veteran)',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Dilihat performa dari dari awal sampai sekarang cukup menurun. Banyak presentasi tidak lulus, secara pengerjaan onsite juga kurang,',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Tidak menunjukkan suatu niat core. Dari pandanganku, dia kurang dalam mengetahui cara belajar yang pas (terlalu ikutin flow dari cara belajar orang lain, padahal tidak pas).',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Dari awal core sampai sekarang menjadi salah satu trainee yang paling aktif dan membantu, sering menjawab dalam eval juga (mungkin karena tau cara mainnya juga).',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Trainee yang ramah, lalu hard skillnya oke. Tipe orang yang membantu di balik layar. (Ini cuma feeling aja sih, tapi perlu diperhatikan juga, karena untuk orang pasif seperti ini, hanya dari teman-teman 20-2 yang tau sifatnya seperti apa)',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Secara hard skill ok, suka bantu juga dalam discussion room (salah satu yang aktif bantu, walaupun sepertinya lebih bantu ke cewek).',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'CP18-1',
			VoteId: '4d8c429f-d528-48a3-8bb3-8689a57c2eda',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sudah keliatan tidak niat, veteran tapi materi sangat pas-pasan, eval diem',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Materi kurang, kosakata dalam bicara sering tidak jelas, terlalu polos (?)',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Tidak semangat core training, materi kurang, keliahatan terpaksa',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materi OK, Softskill OK, Aktif saat eval, pemimpin angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materi bagus, softskill oke lah (suka bantu angkatan)',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Average dari pada yang lain',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'TJ19-2',
			VoteId: '709a6c03-c4b4-42e6-89ba-627555fe85f2',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sudah keliatan tidak niat, veteran tapi materi sangat pas-pasan, eval diem',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Materi kurang, kosakata dalam bicara sering tidak jelas, terlalu polos (?)',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Tidak semangat core training, materi kurang, keliahatan terpaksa',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materi OK, Softskill OK, Aktif saat eval, pemimpin angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materi bagus, softskill oke lah (suka bantu angkatan)',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Average dari pada yang lain',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'TJ19-2',
			VoteId: '3fe67ab6-0098-4ecd-8b70-47476c2fa98c',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sudah Skip" bahkan dari subject awal sampe sekarang... dari saya hopeless sih',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Ninja sangat dieval dari subject awal sampai skr jarang banget liat ngomong dieval (ditunjuk baru kelihatan)',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Ninja sangat dieval dari subject awal sampai skr jarang banget liat ngomong dieval (ditunjuk baru kelihatan)',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Aktif dieval, Carry angkatan, Kelihatannya niat',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Aktif dieval walaupun kadang gaje, Kelihatannya niat',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Aktif dieval, mungkin softskillnya kurang (bisa di bantu pelan"), hardskill ok lah, Kelihatannya niat',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'JX19-2',
			VoteId: 'd6661b73-904d-4874-b3c8-d42d6e92f3c9',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Sepertinya kurang dekat dengan angkatan (?)',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Manis perkataannya',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Suara tetap kecil seperti nar 20-1 (sebelumnya)',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Aktif di eval (tameng angkatan)',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Secara hardskill oke',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Ada perkembangan dibandingkan 20-1',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'SW16-2',
			VoteId: '117facc3-21c0-4d42-b7f1-de96a06e2184',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Solo',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Ngemeng',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Solo',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Solusi mantul',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Oke',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Imba',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'NH19-1',
			VoteId: '587a96c4-ae07-4f32-8659-773d3b36c50a',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'suka ngeblank pas presentasi',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'pas eval jawabnya ga masuk akal',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'suka ngemen dan tidak fokus',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hard skill oke softskill lumayan',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ada perkembangan mental dari core 20-1',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'orangnya logis dan jujur (netral)',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'AS19-1',
			VoteId: 'bf81e88a-81f4-4b55-a88c-dfd6ddbf3d65',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'ini waktu awal tb angkatan di eval, tapi lama2 turun, trus materinya juga malah menurun',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'tidak terlihat perkembangannnya, suara masih kecil, materi mending tapi tetap aja ga terlihat jauh',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'sepertinya batu, kyk dia pintar mengambil hati trainer gitu, dikasih tau sering nanya bagus, dia nanya2 mulu pas ngajar, tapi tetap aja materinya jga ga paham banget, ga tau nanya2 buat apa',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'inisiatif di eval oke, materinya oke, paling tau status angkatan (terlihat peduli angkatan), salah satu yang kerjain konsekuensi, sepertinya yang gerakin angkatan kyk yg mimpin',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'materinya mayan oke, bantu bantu teman juga, kalau di eval bisa ngasih solusi yang mayan bagus (waktu ngmng di eval mikir dulu, walau ga aktif bgt)',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'materi berkembang dari sebelumnya, kadang aktif dieval, niatnya keliatan walau ada masalah dia tetap ikut core training tidak main quit2',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'HY18-2',
			VoteId: '408c0e58-5b5a-4ebc-883b-a5bdd58204e6',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'suka ngemeng, suka lupa.. Menurut trainer lain "dia terlalu polos" takutnya malah dibodoh"in mahasiswa',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Macam gadak semangat hidup.. Suka ngejawab" tapi ngemeng menurutku',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Gadak perkembangan sama sekali.. Loyooo kali.. suka diam.. takutnya diisengin mahasiswa, dan dia diam seribu bahasa.. mewekk..',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Mentalnya bagus, solusi selalu masuk akal',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Suka ngecarry angkatan waktu eval, presentasi juga.. Teorinya evalnya bagus.. Mungkin dia menjalankan teori tersebut (angkatannya yang ga jalanin)',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Menurutku dia jujur, kurang digeprek aja waktu eval.',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'AA19-1',
			VoteId: '91c20e12-e0b1-4f72-8d3c-5f3edf946e41',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang serius dan tampaknya end user',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'sering ngemeng di eval dan materi sering banget null',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'tampaknya sering sekali skip skip',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Terinisiatif dan materi lumayanla. Carry angkatan!!',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Materi termantap walaupun mungkin agak hold back ya.. Kurang inisiatif aja tapi masih mantap',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Veteran kurang inisiatif kalo dibanding dengan veteran veteran sebelumnya, tetapi dibanding yang lain seharusnya yang paling mending T116. Materi setidaknya berkembang',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'ZZ19-2',
			VoteId: 'ab3e8a24-cb8b-4a7a-bd20-f905d72911c3',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'suka ngemeng, suka lupa.. Menurut trainer lain "dia terlalu polos" takutnya malah dibodoh"in mahasiswa',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Macam gadak semangat hidup.. Suka ngejawab" tapi ngemeng menurutku',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Gadak perkembangan sama sekali',
					TraineeId: '00000000-0000-0000-0000-000000000000',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Mentalnya bagus, solusi selalu masuk akal..',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Imba, tapi sayangnya keliatan agak solo..',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Menurutku dia jujur, kurang digeprek aja waktu eval',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'AA19-1',
			VoteId: 'e3ab48d3-28f1-4f64-8c6a-f77d1ac0ee59',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sepertinya orangnya sangat skip", pada saat presentasi OSH1, Cd saja sudah tidak tahu, dan juga petunjuk onsite soalnya pun tidak diikutin',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sering banget kurang memahami materi, kelihatannya hanya sering aktif saja di eval, serasanya di eval itu dia orangnya hanya cari aman, dan keliatannya sering tipu".',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'pada saat di eval, dia ngga lulus presentasi, sering berkata ngeblank terus dari kemaren, ngga pernah ada yang benar, softskill nya pun kurang menurut saya terutama pada saat eval (ngomongnya).',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Mantap, walaupun ada sedikit kek ngga bisa, tetapi pada saat presentasi di java bisa baca dokumentasi, ini benar" kelihatannya rajin dan memahami code bukan menghafal',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Mantap di materi, Aktif dieval',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'mantul, imba, tetapi agak sedikit solo", dari pada sering membantu angkatannya',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'CT19-2',
			VoteId: '174ac966-f63e-42a6-bcd7-b8d675ef3793',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sepertinya orangnya sangat skip", pada saat presentasi OSH1, Cd saja sudah tidak tahu, dan juga petunjuk onsite soalnya pun tidak diikutin',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sering banget kurang memahami materi, kelihatannya hanya sering aktif saja di eval, serasanya di eval itu dia orangnya hanya cari aman, dan keliatannya sering tipu".',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'pada saat di eval, dia ngga lulus presentasi, sering berkata ngeblank terus dari kemaren, ngga pernah ada yang benar, softskill nya pun kurang menurut saya terutama pada saat eval (ngomongnya).',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Mantap, walaupun ada sedikit kek ngga bisa, tetapi pada saat presentasi di java bisa baca dokumentasi, ini benar" kelihatannya rajin dan memahami code bukan menghafal',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Mantap di materi, Aktif dieval',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'mantul, imba, tetapi agak sedikit solo", dari pada sering membantu angkatannya',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'CT19-2',
			VoteId: 'f437a433-436d-47a1-aa3d-9fee20c3fe65',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kalau dilihat", softskill kacao',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'menurut comment trainer lain, suka ngemeng',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'menurut comment trainer lain, suka ngemeng &/ banyak alasan',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'aktif, carry',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'veteran, aktif, carry',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill not bad',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'WT19-1',
			VoteId: '28cb1883-da86-4dba-b132-040e6c47e2fd',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'ini aku cuma ga demen doang sih : . dia kalo di eval nangis, presentasi nangisa sesi nangis, nagis -> nangis, dan karena dia cewe + nangis ga ada yang mau marahin padahal dia udah melakukan kesalahan berulang kali (kasian tranie laen yang di bantai). dia juga aku *asmumsi* lumut soalnya dari yang aku perhatiin dia kalo sesi lumayan bp pernah paling tinggi beberapa kali tapi.. kalo persentasi itu ancur bisa jeeeeleeeek bangeeet jadi keliatan kaya lumut.',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'dia potato si, dia masi berusaha tapi dia potato banget',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ini aku beta beti ama T035 soalnya aku kian melihat mereka',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'back bone angkatan vetran yang veteran :D kaynya dia yang imvba',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'imbaaaa tapi dia ga seaktif pilihan pertama aku',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'ini ama kaya T035 ini mereka kameranya paling bagus :D yang laen entah mukanya 1/2 cuma idung cuma jidat ato dag. mere bedua kemeranya paling bagus :D',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'JE19-2',
			VoteId: 'a0897ce8-9fa5-4907-9827-490369678a36',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'presentasi masih kurang bagus , dan kalau misalnya tidak lulus selalu nangis',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'masih tidak kelihatan di eval, masih menjadi ninja di eval',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'materinya masih kurang bagus',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Sering membantu angkatan, carry angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Cukup imba dan membantu dalam angkatan',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'materi cukup bagus dan kadang dapat membantu angkatan nya',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'VC19-2',
			VoteId: '75a5fdd3-32ff-4bb5-b7ec-5195ee370a6c',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ninja',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang softskill',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'sering dc',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill ok, softskill ok',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill ok, softskill ok',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill ada perkembangan',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'MQ19-1',
			VoteId: '28caf5e8-0ea9-4762-860d-5855ee105740',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ninja',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'kurang softskill',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'sering dc',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill ok, softskill ok',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill ok, softskill ok',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill ada perkembangan',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'MQ19-1',
			VoteId: '2eed641f-5c2a-4f6c-937b-334327a1daeb',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'suka ngeblank saat presentasi',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ada ngemeng',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'keseriusan pas eval perlu ditanyakan',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'waktu presentasi udah bagus',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'presentasi dengan materi lumayan mantab',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'carry angkatan',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'MZ19-1',
			VoteId: '009797ff-0db2-4289-b692-77bb178ce7b4',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sebagai veteran, belum menunjukkan contoh seperti apa trainee seharusnya. Secara hard skill masih kurang. Kalau dari frekuensi membantu saat nyelip ke discussion room, termasuk yang minim memberikan bantuan (mengetahui posisinya sebagai veteran)',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Dilihat performa dari dari awal sampai sekarang cukup menurun. Banyak presentasi tidak lulus, secara pengerjaan onsite juga kurang,',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Tidak menunjukkan suatu niat core. Dari pandanganku, dia kurang dalam mengetahui cara belajar yang pas (terlalu ikutin flow dari cara belajar orang lain, padahal tidak pas).',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Dari awal core sampai sekarang menjadi salah satu trainee yang paling aktif dan membantu, sering menjawab dalam eval juga (mungkin karena tau cara mainnya juga).',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Trainee yang ramah, lalu hard skillnya oke. Tipe orang yang membantu di balik layar. (Ini cuma feeling aja sih, tapi perlu diperhatikan juga, karena untuk orang pasif seperti ini, hanya dari teman-teman 20-2 yang tau sifatnya seperti apa)',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Secara hard skill ok, suka bantu juga dalam discussion room (salah satu yang aktif bantu, walaupun sepertinya lebih bantu ke cewek).',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'CP18-1',
			VoteId: '48527874-b0c8-40b0-88c8-b75dee26c6ed',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Menurutku kurang inisiatif sih, dia 18 soal OS kerjain tetapi dia gak bantuin yang lain. Menurut ku sih harusnya dengan skill yang dia punya, dia bisa jelasin ke angkatan.',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Orang nya gak fokus di eval, skill nya kurang dan ninja. Tidak ada inisiatif.',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Satu manusia ini tidak fokus, skill nya kurang (history clear aja gak bisa), jawabnya ngawur dan kurang inisiatif, dibantu terus dan nyusahin angkatan',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Aktif, inisiatif, suka bantu, salah satu yang aktif di eval dan skill nya cukup baik diantara angkatan" nya',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Salah satu yang skill nya masih lumayan dan penjelasannya bagus dan menyeluruh. Dia inisiatif membantu teman"nya saat sesi dan salah satu orang yang sering memberi ide saat konsekuensi.',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Perkembangannya udah keliatan di OSH1 presentasi sama WU, untuk penjelasannya lancar. Secara materi dan research harusnya udah berkembang dari 20-1, tetapi hanya saja masih kurang sering ngomong di evaluasi. Mungkin perlu dipancing lagi.',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'WU19-1',
			VoteId: 'a0ec0c0b-3453-4158-9a07-8a75363661c1',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Banyak ngemeng (ngebacot), sering menanyakan pertanyaan-pertanyaan tidak penting, suka skip2 dan sering sok ngide dan asumsi. Tidak terlihat benar2 peduli dengan angkatan dan suka cari muka di depan trainer',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sangat diam dan pasif (di eval tidak pernah menjawab kalau tidak ditunjuk). Materi juga kurang.',
					TraineeId: 'e90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Sering skip2, solo, dan kurang kontribusi di angkatan',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Aktif, paling tau mengenai status angkatan (benar2 peduli), materi juga mantab',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Materi mantab, sering carry dan research',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Sudah mulai aktif dan materi pun oke. Semangatnya pun oke',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'NS17-1',
			VoteId: '15244f2b-d9a6-4d1b-b523-c6786885c0e6',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Kurang initiatif',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Dulu PIC presentasi sebelum corenya saya. Menurutku, saat menerangkan dia tidak terlalu memahami konsep dari queue dan stack sehingga tidak tahu mengapa popHead dan pushTail dilakukan pada queue, dan mengapa popTail dan pushHead dapat juga dilakukan. Kurang initiatif, pernah telat hingga jam 3 baru bangun, hardskill tidak terlalu bagus. Meskipun begitu, ada perkembangan di kuis Java2Dnya lulus.',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Sejujurnya yang ini lumayan initiatif, namun seringkali tidak fokus saat eval.',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Initiatif tinggi, materi juga oke',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Initiatif tinggi, materi juga lumayan, walau seringkali ketika ditargetkan menjadi bingung ingin membalas apa',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Initiatif di eval lumayan, mau berkorban menjawab demi angkatan, meskipun akhirnya dia yang kena dan akhir-akhir ini seringkali materi minim, namun menurutku hardskill bisa ditingkatkan lagi nanti',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'MR19-2',
			VoteId: 'db7f84d3-20b2-4a1a-bc5c-9307c01a8a04',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'mentalnya perlu di perhatikan. sering menangis jadi ga tega untuk di tegur. nilai presentasinya kurang',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'bingung antara memang mau bertanya atau mau terlihat bertanya. kadang pertanyaannya cukup aneh dan redundan walaupun dia sudah klarifikasi',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'terlalu ninja sampai saya hampir lupa dia siapa.',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'sering membantu dan jadi inisiator angkatan. materinya bagus saat presentasi. sebagai veteran dia bagus',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'membantu angkatan dan materi presentasinya oke',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'dia membantu banyak pas ada konsekuensi, dan berusaha men TB in angkatan walaupun kadang asal ceplos',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'MV19-2',
			VoteId: '7a0c9568-f292-4075-adfe-8027b9a18a3a',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Sifat yang tersembunyi dari dia yang membuat ragu',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Penurunan drastis perlu dipantau untuk kedepannya',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Gak fokus, kurang memperhatikan',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Carry Angkatan paling aktif dari yang lain performa bagus',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Skill Ok, tetapi masih perlu dilatih softskillnya',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Average tetapi ada perkembangan',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'HS19-2',
			VoteId: '15775ddb-0933-4eeb-bca1-79204763887a',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'ngak terlihat ada perkembangannya, cuman jadi lebih aktif aja di eval (kadang - kadang)',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'entah kenapa rasanya sudah tidak ada niat mau core training ( keliatan waktu quiz java 2d mukanya kek gk niat gitu, diajak ngomong juga dikacangin )',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'tidak terlihat adanya perkembangan dari awal',
					TraineeId: 'c70c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'saya suka cara ngajarnya, cuman emang hard skillnya masih sangat kurang',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'carry angkatan, buat softskillnya juga oke saya rasa',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'selain ngomongnya yang kurang jelas dan terlalu polos. Sisanya menurutku oke',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'WS19-2',
			VoteId: 'e7cc046b-6875-4e62-93d0-9b9a8bc53ff6',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'- Cukup gunakan google dorking untuk mencari informasi terkait T080 dan anda akan melihat pekerjaan yang dia kerjakan itu setengah hati dan tidak layak untuk dipaparkan ke media public => very definition of incompetent lazy ass shit',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'- Hanya bermodalkan pada keberanian untuk buka suara dan tekad TB yang kuat, tapi tidak dibarengi oleh kemampuan untuk mengikuti pengajaran yang diberikan sehingga progress perkembangan di core terbilang stagnant, bahkan sedikit menurun',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'- Sejauh progress core tidak mampu untuk mengikuti pengajaran yang fast pace, apalagi setelah masuk Java Programming',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'- Penjelasan dan cara code nya terstruktur dan rapi\n- Mampu menciptakan suasana yang manageable ditengah core yang ampas ini\n- Mampu memberikan keputusan yang logis dan paling ideal ditengah para trainee yang batu ini',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'- CARRY HARD\n- Perlu dipantau lebih untuk segi softskillnya karena sejauh pengamatan sedikit ninja (?)',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'- Ninja parah, perlu sering dipantau agar lebih aktif\n- Progress selama core baik walaupun kadang sedikit fluktuatif instabil',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'RV19-1',
			VoteId: 'ec2421cb-b7dc-4bb0-9aff-250f39cc5a75',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Pemahaman materi kurang dan kurang inisiatif',
					TraineeId: 'a10c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Pemahaman materi kurang dan kurang inisiatif',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Pemahaman materi kurang dan kurang inisiatif',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Inisiatif di angkatan, Berperan cukup penting di angkatan, pemahaman materi lumayan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'Tidak malu bertanya, Pemahaman cukup walaupun nangkepnya agak lama',
					TraineeId: 'c50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'Untuk logkanya cukup bagus, penyampaian materi bagus',
					TraineeId: '9d0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'LF19-2',
			VoteId: '2e8ef438-f938-4db1-8abc-06471b206a9f',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'materinya kurang, bicaranya kurang jelas',
					TraineeId: 'a50c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'progress turun jauh banget, mulai sering ga fokus, keaktifan di eval menurun, suara kecil',
					TraineeId: 'ea0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'kurang deket sama angkatannya, terlihat solo, kurang bisa berbaur, materi terlihat menurun',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'inisiatif, ngerti kondisi angkatan, leadership nya oke, hardskill mantap, aktif kontribusi di konsekuensi angkatan',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'hardskill mantap, jago research, tangkep materi cepet, bantu-bantu angkatan juga',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason:
						'aktif jawab waktu eval (walau kadang ngaco), hardskill oke, aktif kontribusi di konsekuensi angkatan.',
					TraineeId: 'ae0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'CY19-1',
			VoteId: '8b7ddad0-cc04-43df-a1b8-418972965419',
		},
		{
			__type: 'TrainerTopBottomVote:#BPlusTraining.Logic',
			BottomVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ninja',
					TraineeId: 'c90c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'ninja',
					TraineeId: '980c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'sering dc',
					TraineeId: 'b00c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			TopVotes: [
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskil oke, softskill ok',
					TraineeId: 'cd0c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskil oke, softskill ok',
					TraineeId: '940c2345-e868-ea11-abcb-d8d385fcda38',
				},
				{
					__type: 'VoteItem:#BPlusTraining.Logic',
					Reason: 'hardskill sdh lumayan berkembang',
					TraineeId: 'ce0c2345-e868-ea11-abcb-d8d385fcda38',
				},
			],
			TrainerName: 'MQ19-1',
			VoteId: 'ab1360ed-f325-4d5b-b0d6-59c25658786e',
		},
	],

	//#endregion

  //#region Leader.svc

  // phaseId: "40cb12af-3db5-ea11-abcb-d8d385fcda38"
  GetTraineesByPhase: [
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T024      ",
      "TraineeId": "8d0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Vincent",
      "TraineeNumber": "2201762780"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T026      ",
      "TraineeId": "8f0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Eric Pangiawan",
      "TraineeNumber": "2201768273"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T031      ",
      "TraineeId": "940c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Lionel Ritchie",
      "TraineeNumber": "2301846212"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T034      ",
      "TraineeId": "970c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Ricky Imanuel",
      "TraineeNumber": "2301848243"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T035      ",
      "TraineeId": "980c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Jonathan Ronald Honggo",
      "TraineeNumber": "2301848956"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T036      ",
      "TraineeId": "990c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Kelvin",
      "TraineeNumber": "2301850696"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T040      ",
      "TraineeId": "9d0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Vincent Benedict",
      "TraineeNumber": "2301855822"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T044      ",
      "TraineeId": "a10c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Erwin",
      "TraineeNumber": "2301856592"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T046      ",
      "TraineeId": "a30c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Vlarancia",
      "TraineeNumber": "2301857443"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T048      ",
      "TraineeId": "a50c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Felix Novando",
      "TraineeNumber": "2301859543"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T057      ",
      "TraineeId": "ae0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Johanes Peter Vincentius",
      "TraineeNumber": "2301864461"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T059      ",
      "TraineeId": "b00c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "David",
      "TraineeNumber": "2301868491"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T080      ",
      "TraineeId": "c50c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Bryan Takari",
      "TraineeNumber": "2301877880"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T082      ",
      "TraineeId": "c70c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Stanley Dave Teherag",
      "TraineeNumber": "2301878012"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T084      ",
      "TraineeId": "c90c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Thaddeus Cleo",
      "TraineeNumber": "2301878403"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T088      ",
      "TraineeId": "cd0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Brandon Julio Thenaro",
      "TraineeNumber": "2301885466"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T089      ",
      "TraineeId": "ce0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Skolastika Gabriella Theresandia Prasetyo",
      "TraineeNumber": "2301886323"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T097      ",
      "TraineeId": "d60c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Muladi Muhamad",
      "TraineeNumber": "2301903084"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T116      ",
      "TraineeId": "e90c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Clarissa Chuardi",
      "TraineeNumber": "2301941366"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T117      ",
      "TraineeId": "ea0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Veronica",
      "TraineeNumber": "2301941611"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T123      ",
      "TraineeId": "af0d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Raka Nurul Fikri",
      "TraineeNumber": "2301938195"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T124      ",
      "TraineeId": "b00d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Yoshua Aron Nainggolan",
      "TraineeNumber": "2301914730"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T125      ",
      "TraineeId": "b10d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Rhenald Saputra",
      "TraineeNumber": "2301936883"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T126      ",
      "TraineeId": "b20d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Denies",
      "TraineeNumber": "2301873314"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T127      ",
      "TraineeId": "b30d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Levina Niolana",
      "TraineeNumber": "2301858515"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T129      ",
      "TraineeId": "b50d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Gianni Fiesta Dewi",
      "TraineeNumber": "2301929272"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T130      ",
      "TraineeId": "b60d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Andi Suryo Laksono",
      "TraineeNumber": "2301940792"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T131      ",
      "TraineeId": "b70d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Stefany Chrisdayanty",
      "TraineeNumber": "2301929266"
    }
  ],

  // scheduleId: "d9aa4b5a-89c1-ea11-abcb-d8d385fcda38"
  GetTraineesBySchedule: [
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T031      ",
      "TraineeId": "940c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Lionel Ritchie",
      "TraineeNumber": "2301846212"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T034      ",
      "TraineeId": "970c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Ricky Imanuel",
      "TraineeNumber": "2301848243"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T035      ",
      "TraineeId": "980c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Jonathan Ronald Honggo",
      "TraineeNumber": "2301848956"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T036      ",
      "TraineeId": "990c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Kelvin",
      "TraineeNumber": "2301850696"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T040      ",
      "TraineeId": "9d0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Vincent Benedict",
      "TraineeNumber": "2301855822"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T044      ",
      "TraineeId": "a10c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Erwin",
      "TraineeNumber": "2301856592"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T048      ",
      "TraineeId": "a50c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Felix Novando",
      "TraineeNumber": "2301859543"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T057      ",
      "TraineeId": "ae0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Johanes Peter Vincentius",
      "TraineeNumber": "2301864461"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T059      ",
      "TraineeId": "b00c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "David",
      "TraineeNumber": "2301868491"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T080      ",
      "TraineeId": "c50c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Bryan Takari",
      "TraineeNumber": "2301877880"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T082      ",
      "TraineeId": "c70c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Stanley Dave Teherag",
      "TraineeNumber": "2301878012"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T084      ",
      "TraineeId": "c90c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Thaddeus Cleo",
      "TraineeNumber": "2301878403"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T088      ",
      "TraineeId": "cd0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Brandon Julio Thenaro",
      "TraineeNumber": "2301885466"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T089      ",
      "TraineeId": "ce0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Skolastika Gabriella Theresandia Prasetyo",
      "TraineeNumber": "2301886323"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T097      ",
      "TraineeId": "d60c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Muladi Muhamad",
      "TraineeNumber": "2301903084"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T116      ",
      "TraineeId": "e90c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Clarissa Chuardi",
      "TraineeNumber": "2301941366"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T117      ",
      "TraineeId": "ea0c2345-e868-ea11-abcb-d8d385fcda38",
      "TraineeName": "Veronica",
      "TraineeNumber": "2301941611"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T124      ",
      "TraineeId": "b00d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Yoshua Aron Nainggolan",
      "TraineeNumber": "2301914730"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T126      ",
      "TraineeId": "b20d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Denies",
      "TraineeNumber": "2301873314"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T130      ",
      "TraineeId": "b60d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Andi Suryo Laksono",
      "TraineeNumber": "2301940792"
    },
    {
      "__type": "ClientTrainee:#BPlusTraining.Logic",
      "IsActive": false,
      "TraineeCode": "T131      ",
      "TraineeId": "b70d28a9-686a-ea11-abcb-d8d385fcda38",
      "TraineeName": "Stefany Chrisdayanty",
      "TraineeNumber": "2301929266"
    }
  ],

	GetGenerations: [
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '20-2',
			GenerationId: '51fb670e-2468-ea11-abcb-d8d385fcda38',
			Semester: 'Even',
			Year: '2020',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '20-1',
			GenerationId: '110b6fb2-48d4-e911-964e-d8d385fcda38',
			Semester: 'Odd',
			Year: '2020',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '19-2',
			GenerationId: 'af3bef20-bf4f-e911-8fab-d8d385fcda38',
			Semester: 'Even',
			Year: '2019',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '19-1',
			GenerationId: '9131f391-a0b0-e811-9c1c-d8d385fcda38',
			Semester: 'Odd',
			Year: '2019',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '18-2',
			GenerationId: '0d5e2c67-0128-e811-a322-d8d385fcda38',
			Semester: 'Even',
			Year: '2018',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '18-1',
			GenerationId: '360cb4d0-08ba-e711-a35c-d8d385fcda38',
			Semester: 'Odd',
			Year: '2018',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '17-2',
			GenerationId: 'ff9b05c2-96fd-e611-9fd6-d8d385fcda38',
			Semester: 'Even',
			Year: '2017',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '17-1',
			GenerationId: 'adf1f817-2498-e611-aa7d-d8d385fcda38',
			Semester: 'Odd',
			Year: '2017',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '16-2',
			GenerationId: 'cd5264b1-31dd-e511-9c93-d8d385fcda38',
			Semester: 'Even',
			Year: '2016',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '16-1',
			GenerationId: 'ccccea8c-da72-e511-a397-d8d385fcda38',
			Semester: 'Odd',
			Year: '2016',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '15-2',
			GenerationId: '405c8061-2dd1-e411-8e96-d8d385fcda38',
			Semester: 'Even',
			Year: '2015',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '15-1',
			GenerationId: 'c504c7d3-5c2e-e411-879f-d8d385fcda38',
			Semester: 'Odd',
			Year: '2015',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '14',
			GenerationId: 'fb097368-fc27-e311-a210-d8d385fcda38',
			Semester: 'Even',
			Year: '2014',
		},
		{
			__type: 'ClientGeneration:#BPlusTraining.Logic',
			Description: '13',
			GenerationId: 'f1b98d8a-7c0f-e211-8e8f-d8d385fcda38',
			Semester: 'Even',
			Year: '2013',
		},
	],

	GetTopBottomVoteSchedules: [
		{
			__type: 'TopBottomVoteSchedule:#BPlusTraining.Logic',
			EndDate: '/Date(1595869200000)/',
			ScheduleId: '195b4281-9256-45c9-8198-914794b5adaf',
			ScheduleName: 'Top Bottom 1',
			StartDate: '/Date(1595782800000)/',
			VoteCount: 3,
			isForTrainer: false,
		},
	],

	// subjectId: "ac349105-3eb5-ea11-abcb-d8d385fcda38"
	GetSchedules: [
		{
			__type: 'ClientSchedule:#BPlusTraining.Logic',
			CanSelfRegister: null,
			End: null,
			IsSpecific: false,
			ScheduleDates: ['/Date(1595782800000+0700)/'],
			ScheduleId: '8998e270-89c1-ea11-abcb-d8d385fcda38',
			ScheduleName: 'OSH1BP',
			Start: null,
		},
		{
			__type: 'ClientSchedule:#BPlusTraining.Logic',
			CanSelfRegister: null,
			End: null,
			IsSpecific: false,
			ScheduleDates: ['/Date(1595782800000+0700)/'],
			ScheduleId: 'e0a5900b-87c1-ea11-abcb-d8d385fcda38',
			ScheduleName: 'OSH1Special',
			Start: null,
		},
		{
			__type: 'ClientSchedule:#BPlusTraining.Logic',
			CanSelfRegister: null,
			End: null,
			IsSpecific: false,
			ScheduleDates: ['/Date(1595869200000+0700)/'],
			ScheduleId: '9982a180-89c1-ea11-abcb-d8d385fcda38',
			ScheduleName: 'OSH2BP',
			Start: null,
		},
		{
			__type: 'ClientSchedule:#BPlusTraining.Logic',
			CanSelfRegister: null,
			End: null,
			IsSpecific: false,
			ScheduleDates: ['/Date(1595869200000+0700)/'],
			ScheduleId: 'e08b8e13-87c1-ea11-abcb-d8d385fcda38',
			ScheduleName: 'OSH2S1',
			Start: null,
		},
		{
			__type: 'ClientSchedule:#BPlusTraining.Logic',
			CanSelfRegister: null,
			End: null,
			IsSpecific: false,
			ScheduleDates: ['/Date(1595869200000+0700)/'],
			ScheduleId: '30c3ec23-87c1-ea11-abcb-d8d385fcda38',
			ScheduleName: 'OSH2S2',
			Start: null,
		},
		{
			__type: 'ClientSchedule:#BPlusTraining.Logic',
			CanSelfRegister: null,
			End: null,
			IsSpecific: false,
			ScheduleDates: ['/Date(1595955600000+0700)/'],
			ScheduleId: '9b82a180-89c1-ea11-abcb-d8d385fcda38',
			ScheduleName: 'OSH3BP',
			Start: null,
		},
		{
			__type: 'ClientSchedule:#BPlusTraining.Logic',
			CanSelfRegister: null,
			End: null,
			IsSpecific: false,
			ScheduleDates: ['/Date(1595955600000+0700)/'],
			ScheduleId: '0045eb19-87c1-ea11-abcb-d8d385fcda38',
			ScheduleName: 'OSH3S1',
			Start: null,
		},
		{
			__type: 'ClientSchedule:#BPlusTraining.Logic',
			CanSelfRegister: null,
			End: null,
			IsSpecific: false,
			ScheduleDates: ['/Date(1595955600000+0700)/'],
			ScheduleId: '0245eb19-87c1-ea11-abcb-d8d385fcda38',
			ScheduleName: 'OSH3S2',
			Start: null,
		},
	],

	// phaseId: "40cb12af-3db5-ea11-abcb-d8d385fcda38"
	GetCurrentSubject: {
		__type: 'ClientSubject:#BPlusTraining.Logic',
		HasPresentation: false,
		Name: 'OSH3S2',
		Phase: null,
		SubjectId: 'ac349105-3eb5-ea11-abcb-d8d385fcda38',
	},

	// scheduleId: "8998e270-89c1-ea11-abcb-d8d385fcda38"
	GetCase: [
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1594573200000+0700)/',
			Description: 'Core Training',
			EndDate: '/Date(1597251600000+0700)/',
			PhaseId: '40cb12af-3db5-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
		{
			__type: 'ClientPhase:#BPlusTraining.Logic',
			BeginDate: '/Date(1589216400000+0700)/',
			Description: 'Presentation',
			EndDate: '/Date(1589734800000+0700)/',
			PhaseId: 'a2196d78-f294-ea11-abcb-d8d385fcda38',
			PhaseType: 'ar',
		},
	],
	// subjectId: "ac349105-3eb5-ea11-abcb-d8d385fcda38"
	GetMaximumFileSize: 50000,

  GetRoles: [
    {
      "__type": "ClientRoles:#BPlusTraining.Logic",
      "Name": "Interviewer",
      "UserRoleId": "50fb8fe2-8c78-e111-8777-d8d385fcda38"
    },
    {
      "__type": "ClientRoles:#BPlusTraining.Logic",
      "Name": "Dummy",
      "UserRoleId": "6dd5a569-cb94-e411-95ce-d8d385fcda38"
    },
    {
      "__type": "ClientRoles:#BPlusTraining.Logic",
      "Name": "SubjectCoordinator",
      "UserRoleId": "cacb28a9-4bdd-e611-96ef-d8d385fcda38"
    },
    {
      "__type": "ClientRoles:#BPlusTraining.Logic",
      "Name": "AssistantSupervisor",
      "UserRoleId": "e93e057f-6ffc-e011-9918-d8d385fcda38"
    },
    {
      "__type": "ClientRoles:#BPlusTraining.Logic",
      "Name": "Trainer",
      "UserRoleId": "ea3e057f-6ffc-e011-9918-d8d385fcda38"
    },
    {
      "__type": "ClientRoles:#BPlusTraining.Logic",
      "Name": "JuniorTrainer",
      "UserRoleId": "19bfdebd-0f2f-e811-a322-d8d385fcda38"
    }
  ],

  GetUserInRoles: [
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "2fdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "AA19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "bf2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "AB20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "35dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "AC19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "SubjectCoordinator",
      "UserInRoleId": "a95bcbc2-93a0-ea11-abcb-d8d385fcda38",
      "UserName": "AE19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "39bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "AH18-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "36dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "AL19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "15dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "AM18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3abbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "AO18-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3bbbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "AP18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "28dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "AS19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "d32ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "AT20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3cbbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "AW18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "0adadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "AY17-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3adadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "BD19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "37dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "BE19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3dbbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "CL18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "29dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "CN19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "11dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "CP18-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "d02ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "CR20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3bdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "CT19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c12ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "CV20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "880bdca9-dccf-ea11-abcb-d8d385fcda38",
      "UserName": "CY19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "c3d6fbed-8f69-ea11-abcb-d8d385fcda38",
      "UserName": "CY19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3ebbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "DA17-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "14dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "DD18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "2bdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "DF19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "d12ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "DJ20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3fbbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "DL18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "40bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "DN17-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c32ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "DP20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "c4d6fbed-8f69-ea11-abcb-d8d385fcda38",
      "UserName": "dr05-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "c5d6fbed-8f69-ea11-abcb-d8d385fcda38",
      "UserName": "ds08-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c22ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "DU20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "be2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "DX20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "d22ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "DY20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "bd2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "DZ20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3fdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "EI19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "c6d6fbed-8f69-ea11-abcb-d8d385fcda38",
      "UserName": "ER15-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "2cdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "EV19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "41bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "EZ17-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c42ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "FG20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "42bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "FN17-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c92ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "FS20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "d62ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "FZ20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "1edadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "GB18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3ddadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "GE19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "1fdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "GN18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "00dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "GU14-0"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "2edadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "HR19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "3edadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "HS19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "c7d6fbed-8f69-ea11-abcb-d8d385fcda38",
      "UserName": "HY18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "c8d6fbed-8f69-ea11-abcb-d8d385fcda38",
      "UserName": "IE17-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "1911a94a-696a-ea11-abcb-d8d385fcda38",
      "UserName": "if11-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "40dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "IR19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "43dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "IX19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "08dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "JA17-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "d42ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "JB20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "41dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "JE19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c52ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "JF20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c62ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "JH20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "20dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "JN18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "30dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "JU19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "SubjectCoordinator",
      "UserInRoleId": "ab5bcbc2-93a0-ea11-abcb-d8d385fcda38",
      "UserName": "JX19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "cc2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "JY20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c72ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "KA20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "21dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "KE18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "44dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "KF18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "43bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "KI14-0"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "19dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "KS18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "31dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "KV19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "1bdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "KY18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "32dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "LD19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "4adadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "LF19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "45dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "LH19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "44bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "LI19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c82ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "LO20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "ca2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "LT20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "45bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "LV18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "46bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "LW18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "0bdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "LX17-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "34dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "LY19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "49dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "MQ19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "SubjectCoordinator",
      "UserInRoleId": "a65bcbc2-93a0-ea11-abcb-d8d385fcda38",
      "UserName": "MR19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "46dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "MV19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "cb2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "MW20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "48dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "MZ19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Dummy",
      "UserInRoleId": "e32ad9bd-9069-ea11-abcb-d8d385fcda38",
      "UserName": "nardummy"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "4bdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "NH19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "47bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "NP17-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "52fb670e-2468-ea11-abcb-d8d385fcda38",
      "UserName": "NS17-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "7dd6619a-d6d0-ea11-abcb-d8d385fcda38",
      "UserName": "NS17-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "4cdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "OS19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "38dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "PB19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "ce2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "PH20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "39dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RJ19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "24dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RL18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "12dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RM18-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "cd2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RR20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "1cdadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RS18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "4ddadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RV19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "4edadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RX19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "25dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RY18-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "0edadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "RZ18-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "d52ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "SA20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "13dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "SF18-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "SubjectCoordinator",
      "UserInRoleId": "a85bcbc2-93a0-ea11-abcb-d8d385fcda38",
      "UserName": "SK19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "50dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "SL19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "c02ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "SO20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "AssistantSupervisor",
      "UserInRoleId": "c9d6fbed-8f69-ea11-abcb-d8d385fcda38",
      "UserName": "ss04-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "54898de1-5ec3-ea11-abcb-d8d385fcda38",
      "UserName": "SW16-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "51dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "TD18-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "SubjectCoordinator",
      "UserInRoleId": "a55bcbc2-93a0-ea11-abcb-d8d385fcda38",
      "UserName": "TJ19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "48bbf9ab-6dc5-ea11-abcb-d8d385fcda38",
      "UserName": "TO16-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "52dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "VC19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "JuniorTrainer",
      "UserInRoleId": "cf2ca725-9169-ea11-abcb-d8d385fcda38",
      "UserName": "WA20-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "SubjectCoordinator",
      "UserInRoleId": "aa5bcbc2-93a0-ea11-abcb-d8d385fcda38",
      "UserName": "WS19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "53dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "WT19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "54dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "WU19-1"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "0ddadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "YS17-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "SubjectCoordinator",
      "UserInRoleId": "a75bcbc2-93a0-ea11-abcb-d8d385fcda38",
      "UserName": "YT19-2"
    },
    {
      "__type": "ClientUserInRoles:#BPlusTraining.Logic",
      "Role": "Trainer",
      "UserInRoleId": "55dadf0b-9169-ea11-abcb-d8d385fcda38",
      "UserName": "ZZ19-2"
    }
  ],
  GetGeneralAssistantRole: false,

  //#endregion

  //#region Interview.svc
  GetInterviewSchedules: {
    "__type": "ClientInterviewReport:#BPlusTraining.Logic",
    "Details": [
      {
        "__type": "ClientInterviewReportDetail:#BPlusTraining.Logic",
        "Status": "Rej",
        "Total": 3
      },
      {
        "__type": "ClientInterviewReportDetail:#BPlusTraining.Logic",
        "Status": "Pos",
        "Total": 10
      },
      {
        "__type": "ClientInterviewReportDetail:#BPlusTraining.Logic",
        "Status": "Acc",
        "Total": 22
      }
    ],
    "Schedules": [
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "DL18-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591549200000+0700)/",
        "InterviewScheduleId": "d839505e-2729-4366-bc7b-3873aecfde70",
        "InterviewScore": 69,
        "Location": "https://binus.zoom.us/j/94274781436?pwd=THcwWWNoRThtMENwTnRyMElHeng1UT09",
        "MainInterviewer": "AO18-1",
        "Result": "Pos",
        "StartTime": "11:20",
        "TraineeCode": "T026",
        "TraineeName": "Eric Pangiawan"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "DN17-1",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591549200000+0700)/",
        "InterviewScheduleId": "7d2b2b5d-c27d-442d-8d33-091c15ca747c",
        "InterviewScore": 61,
        "Location": "https://binus.zoom.us/j/94592904646?pwd=cUVWZWdreC90NGRueDkzQzhreUJZZz09",
        "MainInterviewer": "FN17-1",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T046",
        "TraineeName": "Vlarancia"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "AP18-2",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1591549200000+0700)/",
        "InterviewScheduleId": "cf182dea-b980-4db6-b600-26cb2365307f",
        "InterviewScore": 42,
        "Location": "https://binus.zoom.us/j/98073020154?pwd=aGRXeHU0SUpGQWpYSkdzRnVkSkc4dz09",
        "MainInterviewer": "LV18-2",
        "Result": "Pos",
        "StartTime": "13:20",
        "TraineeCode": "T027",
        "TraineeName": "Andre Antolis"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "NS17-1",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1591549200000+0700)/",
        "InterviewScheduleId": "f88703bd-55a4-4c5d-8abb-4374fc9a243f",
        "InterviewScore": 90,
        "Location": "https://binus.zoom.us/j/94163065601?pwd=MWFjbFc4OUNKTVNvWVQyZmMvWnlLQT09",
        "MainInterviewer": "if11-2",
        "Result": "Acc",
        "StartTime": "13:20",
        "TraineeCode": "T127",
        "TraineeName": "Levina Niolana"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "CY19-1",
        "EndTime": "17:00",
        "InterviewDate": "/Date(1591549200000+0700)/",
        "InterviewScheduleId": "40efd63d-6070-42f8-859f-206534abe1b1",
        "InterviewScore": 74,
        "Location": "https://binus.zoom.us/j/93578131438?pwd=ZFJxMDQ4alRpOW50QmoxbmtnNDFGQT09",
        "MainInterviewer": "EZ17-1",
        "Result": "Pos",
        "StartTime": "15:20",
        "TraineeCode": "T030",
        "TraineeName": "Wilton Pangestu"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "LW18-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591635600000+0700)/",
        "InterviewScheduleId": "cc168ab6-fb6d-4250-b15f-590938c1c2ff",
        "InterviewScore": 75,
        "Location": "https://binus.zoom.us/j/92408957761?pwd=ZXVoalc0R0lnRG52cDU0ZFFId1ZZZz09",
        "MainInterviewer": "KI14-0",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T024",
        "TraineeName": "Vincent"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "HY18-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591635600000+0700)/",
        "InterviewScheduleId": "ecc5c06f-e6b5-4a19-9c2d-dab0180a59e1",
        "InterviewScore": 48,
        "Location": "https://binus.zoom.us/j/93420808484?pwd=RndKd2tVVFgrbHJCZkVsS0JWUkVZUT09",
        "MainInterviewer": "if11-2",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T126",
        "TraineeName": "Denies"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "LW18-2",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1591635600000+0700)/",
        "InterviewScheduleId": "02f7cf17-55ca-4661-9b75-c884ad470a35",
        "InterviewScore": 57,
        "Location": "https://binus.zoom.us/j/98654679628?pwd=ckJGYTBUUldDcnFNZEh0cldzN1FvZz09",
        "MainInterviewer": "ss04-2",
        "Result": "Acc",
        "StartTime": "13:20",
        "TraineeCode": "T044",
        "TraineeName": "Erwin"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "DA17-1",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1591635600000+0700)/",
        "InterviewScheduleId": "b8ebcee2-32ec-44dc-89e1-6983755b6455",
        "InterviewScore": 55,
        "Location": "https://binus.zoom.us/j/99918379775?pwd=SjV2YWUyVHprSjlZSjkwMUNYTkRFUT09",
        "MainInterviewer": "NS17-1",
        "Result": "Pos",
        "StartTime": "13:20",
        "TraineeCode": "T052",
        "TraineeName": "Bestyvincen Kartika"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "CL18-2",
        "EndTime": "11:00",
        "InterviewDate": "/Date(1591722000000+0700)/",
        "InterviewScheduleId": "e8480b73-d9fc-4ef8-ac2a-ae1823ad73b8",
        "InterviewScore": 54,
        "Location": "https://binus.zoom.us/j/93477840268?pwd=VUZNcEUzTVdoQ2JGQUxIQUV6cklWdz09",
        "MainInterviewer": "NP17-2",
        "Result": "Acc",
        "StartTime": "09:20",
        "TraineeCode": "T048",
        "TraineeName": "Felix Novando"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "HY18-2",
        "EndTime": "11:00",
        "InterviewDate": "/Date(1591722000000+0700)/",
        "InterviewScheduleId": "7e2706b2-d6e3-4e24-b4ec-9c9d19ce4eda",
        "InterviewScore": 44,
        "Location": "https://binus.zoom.us/j/94532543202?pwd=WFJvN3VyVzBWVy8rZTE5clBldEZkUT09",
        "MainInterviewer": "if11-2",
        "Result": "Pos",
        "StartTime": "09:20",
        "TraineeCode": "T129",
        "TraineeName": "Gianni Fiesta Dewi"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "LW18-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591722000000+0700)/",
        "InterviewScheduleId": "4950a6a5-1af4-4810-9f54-b9426e47e0fc",
        "InterviewScore": 73,
        "Location": "https://binus.zoom.us/j/91393743410?pwd=RXlTNlFmU2VPQVdnTGRoTTFhRmVnZz09",
        "MainInterviewer": "KI14-0",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T035",
        "TraineeName": "Jonathan Ronald Honggo"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "DL18-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591722000000+0700)/",
        "InterviewScheduleId": "9ad4c594-c9ad-4f72-85cc-7976dd5a61b7",
        "InterviewScore": 66,
        "Location": "https://binus.zoom.us/j/99194078381?pwd=V1lML1BoeE1Qa0xxY0Nid1M3SWFoZz09",
        "MainInterviewer": "TO16-2",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T117",
        "TraineeName": "Veronica"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "AP18-2",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1591722000000+0700)/",
        "InterviewScheduleId": "88993962-616b-4575-99d6-2839cedf0a8f",
        "InterviewScore": 70,
        "Location": "https://binus.zoom.us/j/92587052961?pwd=ZHh0MzNHUnhMTE5PWlI1VmVjTld0Zz09",
        "MainInterviewer": "dr05-2",
        "Result": "Pos",
        "StartTime": "13:20",
        "TraineeCode": "T057",
        "TraineeName": "Johanes Peter Vincentius"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "LI19-1",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591808400000+0700)/",
        "InterviewScheduleId": "08c13b02-1357-4b18-97a6-a80287e7713f",
        "InterviewScore": 59,
        "Location": "https://binus.zoom.us/j/91517168059?pwd=WnBqQ0FRS282NnBSeDJUMWJiU2w1QT09",
        "MainInterviewer": "LV18-2",
        "Result": "Pos",
        "StartTime": "11:20",
        "TraineeCode": "T116",
        "TraineeName": "Clarissa Chuardi"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "EZ17-1",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591808400000+0700)/",
        "InterviewScheduleId": "94e768e7-efd7-4bce-91ae-432e15ef4ffb",
        "InterviewScore": 72,
        "Location": "https://binus.zoom.us/j/91936224990?pwd=WFlXRWNkdk43b2tkeVlHKzdqVWJvUT09",
        "MainInterviewer": "NP17-2",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T124",
        "TraineeName": "Yoshua Aron Nainggolan"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "CY19-1",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1591808400000+0700)/",
        "InterviewScheduleId": "0187f2e4-9c60-4764-a35d-54cb91c05958",
        "InterviewScore": 74,
        "Location": "https://binus.zoom.us/j/91047285120?pwd=eHk4a1M3TmcvRFp5L2ZLaHA1T1lzUT09",
        "MainInterviewer": "DA17-1",
        "Result": "Acc",
        "StartTime": "13:20",
        "TraineeCode": "T031",
        "TraineeName": "Lionel Ritchie"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "DN17-1",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1591808400000+0700)/",
        "InterviewScheduleId": "73c71a63-e38c-4d7c-b5ed-f2d04044a263",
        "InterviewScore": 45,
        "Location": "https://binus.zoom.us/j/91700499809?pwd=NVY4ZGFzSWFDVEh2c1ZjY1FTeDZHdz09",
        "MainInterviewer": "TO16-2",
        "Result": "Acc",
        "StartTime": "13:20",
        "TraineeCode": "T036",
        "TraineeName": "Kelvin"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "AW18-2",
        "EndTime": "17:00",
        "InterviewDate": "/Date(1591808400000+0700)/",
        "InterviewScheduleId": "c3132879-019b-4c54-b311-d4a803d88387",
        "InterviewScore": 76,
        "Location": "https://binus.zoom.us/j/95471061964?pwd=UjBTeXVMYmVmOVV3RE0rejBrMGpOZz09",
        "MainInterviewer": "ss04-2",
        "Result": "Acc",
        "StartTime": "15:20",
        "TraineeCode": "T097",
        "TraineeName": "Muladi Muhamad"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "CL18-2",
        "EndTime": "11:00",
        "InterviewDate": "/Date(1591894800000+0700)/",
        "InterviewScheduleId": "fb642eea-e231-47d1-a625-96a0f6e06242",
        "InterviewScore": 34,
        "Location": "https://binus.zoom.us/j/91892323694?pwd=QjNJbFpNYWRPbmU0K2NrQW9vakhIUT09",
        "MainInterviewer": "DN17-1",
        "Result": "Acc",
        "StartTime": "09:20",
        "TraineeCode": "T101",
        "TraineeName": "Lius Aprian Hartono"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "AW18-2",
        "EndTime": "17:00",
        "InterviewDate": "/Date(1591894800000+0700)/",
        "InterviewScheduleId": "fe23c323-6cdb-41da-b100-a85bb1756651",
        "InterviewScore": 76,
        "Location": "https://binus.zoom.us/j/97029617514?pwd=NUNUL1drRGpOOWNQdkoySmd5ZmJ1QT09",
        "MainInterviewer": "FN17-1",
        "Result": "Rej",
        "StartTime": "15:20",
        "TraineeCode": "T121",
        "TraineeName": "Clarence Matthew Satria"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "CY19-1",
        "EndTime": "17:00",
        "InterviewDate": "/Date(1591894800000+0700)/",
        "InterviewScheduleId": "882a4093-b477-4f09-8ae1-fb6cb8ce1b15",
        "InterviewScore": 81,
        "Location": "https://binus.zoom.us/j/97167096533?pwd=TTlmS2tyakVja04zbERqM2Q1elNzQT09",
        "MainInterviewer": "dr05-2",
        "Result": "Acc",
        "StartTime": "15:20",
        "TraineeCode": "T123",
        "TraineeName": "Raka Nurul Fikri"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "CY19-1",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1591981200000+0700)/",
        "InterviewScheduleId": "f9fafabd-0c73-4597-a5ff-e6706c0c0914",
        "InterviewScore": 68,
        "Location": "https://binus.zoom.us/j/99127222658?pwd=cDZ4OUp5bnlUMFA5bXhWZ1BNNFlSZz09",
        "MainInterviewer": "AH18-1",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T089",
        "TraineeName": "Skolastika Gabriella Theresandia Prasetyo"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "DL18-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1592154000000+0700)/",
        "InterviewScheduleId": "5d9b2b44-a781-4e2f-a3cb-1307c31af1c3",
        "InterviewScore": 56,
        "Location": "https://binus.zoom.us/j/99991030293?pwd=T2xNd2U1Y1RaZ3J4NGdiMDQxRm1IUT09",
        "MainInterviewer": "AO18-1",
        "Result": "Pos",
        "StartTime": "11:20",
        "TraineeCode": "T080",
        "TraineeName": "Bryan Takari"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "NP17-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1592154000000+0700)/",
        "InterviewScheduleId": "fd369fb7-ef57-46ed-891c-eee344d61709",
        "InterviewScore": 91,
        "Location": "https://binus.zoom.us/j/97022677379?pwd=VksySG9OVDgrYk43dWNna0xsQjZmUT09",
        "MainInterviewer": "FN17-1",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T130",
        "TraineeName": "Andi Suryo Laksono"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "AW18-2",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1592154000000+0700)/",
        "InterviewScheduleId": "463ec89b-7c62-40cc-91dc-d43c34c867f9",
        "InterviewScore": 98,
        "Location": "https://binus.zoom.us/j/99394787720?pwd=d2JTcG44SWtzYk9nSm9BeHZjZkNCUT09",
        "MainInterviewer": "NS17-1",
        "Result": "Acc",
        "StartTime": "13:20",
        "TraineeCode": "T131",
        "TraineeName": "Stefany Chrisdayanty"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "AO18-1",
        "EndTime": "17:00",
        "InterviewDate": "/Date(1592154000000+0700)/",
        "InterviewScheduleId": "55b7f646-0516-48f1-9f10-5d09441feea8",
        "InterviewScore": 58,
        "Location": "https://binus.zoom.us/j/94719768097?pwd=TGNIQXEwWDZIZTRQeHpjS2xrRUZ2QT09",
        "MainInterviewer": "NS17-1",
        "Result": "Rej",
        "StartTime": "15:20",
        "TraineeCode": "T113",
        "TraineeName": "Muhammad Kharisma Azhari"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "HY18-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1592240400000+0700)/",
        "InterviewScheduleId": "382afde2-3581-40f7-9c2b-92298a1619ab",
        "InterviewScore": 57,
        "Location": "https://binus.zoom.us/j/91867857952?pwd=ZXBNdkRGN2F0S2F4RmdRcVhIMmwxUT09",
        "MainInterviewer": "LI19-1",
        "Result": "Pos",
        "StartTime": "11:20",
        "TraineeCode": "T034",
        "TraineeName": "Ricky Imanuel"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "AP18-2",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1592240400000+0700)/",
        "InterviewScheduleId": "1e6f147c-3893-4fd2-b3d2-42bfd3811939",
        "InterviewScore": 70,
        "Location": "https://binus.zoom.us/j/94448353397?pwd=OTRSME9hOEVxYktRZjU5cjdVVzA2dz09",
        "MainInterviewer": "AH18-1",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T059",
        "TraineeName": "David"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "LI19-1",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1592240400000+0700)/",
        "InterviewScheduleId": "7fdd619c-3005-4e5c-8b41-427dcbc8a17f",
        "InterviewScore": 83,
        "Location": "https://binus.zoom.us/j/94321123461?pwd=M3VLTWFveVpSNVBYNm5FRVVrRjNGUT09",
        "MainInterviewer": "SW16-2",
        "Result": "Acc",
        "StartTime": "13:20",
        "TraineeCode": "T082",
        "TraineeName": "Stanley Dave Teherag"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "CL18-2",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1592240400000+0700)/",
        "InterviewScheduleId": "5239f583-d241-4847-9363-bf46260b2265",
        "InterviewScore": 79,
        "Location": "https://binus.zoom.us/j/95806712380?pwd=d2tZRGd4WVJwcXBYVzFFYjhrNkZkdz09",
        "MainInterviewer": "ds08-1",
        "Result": "Acc",
        "StartTime": "13:20",
        "TraineeCode": "T125",
        "TraineeName": "Rhenald Saputra"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "DA17-1",
        "EndTime": "17:00",
        "InterviewDate": "/Date(1592240400000+0700)/",
        "InterviewScheduleId": "e2765b11-3845-44ec-90b7-ec819fe669ec",
        "InterviewScore": 49,
        "Location": "https://binus.zoom.us/j/95889961552?pwd=elM0UUlOZ2dGZXFGdVpDN1NaY0gvQT09",
        "MainInterviewer": "AH18-1",
        "Result": "Pos",
        "StartTime": "15:20",
        "TraineeCode": "T040",
        "TraineeName": "Vincent Benedict"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "ds08-1",
        "EndTime": "13:00",
        "InterviewDate": "/Date(1592326800000+0700)/",
        "InterviewScheduleId": "ce4c5fc6-e21b-40df-b854-451b361b329c",
        "InterviewScore": 78,
        "Location": "https://binus.zoom.us/j/92617090116?pwd=TVU1cjltZ3NISWVGcUw1MndwU20ydz09",
        "MainInterviewer": "SW16-2",
        "Result": "Acc",
        "StartTime": "11:20",
        "TraineeCode": "T088",
        "TraineeName": "Brandon Julio Thenaro"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "EZ17-1",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1592326800000+0700)/",
        "InterviewScheduleId": "13be00b9-f48c-4f4d-93bd-ff174c7de455",
        "InterviewScore": 79,
        "Location": "https://binus.zoom.us/j/97200781454?pwd=T1hKS3JwRnF2aTZ0N1FhbHBqTVovZz09",
        "MainInterviewer": "SW16-2",
        "Result": "Acc",
        "StartTime": "13:20",
        "TraineeCode": "T084",
        "TraineeName": "Thaddeus Cleo"
      },
      {
        "__type": "ClientInterviewSchedule:#BPlusTraining.Logic",
        "CoInterviewer": "HY18-2",
        "EndTime": "15:00",
        "InterviewDate": "/Date(1592326800000+0700)/",
        "InterviewScheduleId": "be331658-af3c-4822-acc3-c5e4715519b8",
        "InterviewScore": 54,
        "Location": "https://binus.zoom.us/j/94817252391?pwd=aE5KZWNxYy92R2pRWDVURDBLYTNZQT09",
        "MainInterviewer": "LV18-2",
        "Result": "Rej",
        "StartTime": "13:20",
        "TraineeCode": "T091",
        "TraineeName": "Fernando Chai"
      }
    ]
  },
  
  GetInterviewQuestions: [
    {
      "__type": "ClientInterviewQuestion:#BPlusTraining.Logic",
      "InterviewQuestionId": "9942d71e-93d7-40d6-974b-85e7a2702549",
      "InterviewQuestionName": "Interview Question Even 19/20"
    },
    {
      "__type": "ClientInterviewQuestion:#BPlusTraining.Logic",
      "InterviewQuestionId": "e4da0532-8322-4979-a1dd-02ff041f526f",
      "InterviewQuestionName": "Interview Question Odd 19/20"
    },
    {
      "__type": "ClientInterviewQuestion:#BPlusTraining.Logic",
      "InterviewQuestionId": "a1602145-c0a9-4cd0-98ce-8128dd307c1b",
      "InterviewQuestionName": "Interview Question Even 13/14"
    },
    {
      "__type": "ClientInterviewQuestion:#BPlusTraining.Logic",
      "InterviewQuestionId": "eb603638-a69b-4def-8ca0-e4bd38d401ab",
      "InterviewQuestionName": "Interview Question Even 11/12"
    }
  ],

  // interviewQuestionId: "9942d71e-93d7-40d6-974b-85e7a2702549"
  GetInterviewQuestionDetails: [
    {
      "__type": "InterviewQuestionDetail:#BPlusTraining.Logic",
      "DescriptionEnglish": "Knowledge and awareness about job description",
      "DescriptionIndonesia": "Pengetahuan tentang pekerjaan yang akan dihadapi",
      "Number": 1,
      "Weight": 4
    },
    {
      "__type": "InterviewQuestionDetail:#BPlusTraining.Logic",
      "DescriptionEnglish": "Intelligence and mental readiness",
      "DescriptionIndonesia": "Intelegensi dan kesiagaan mental",
      "Number": 2,
      "Weight": 4
    },
    {
      "__type": "InterviewQuestionDetail:#BPlusTraining.Logic",
      "DescriptionEnglish": "Motivation and ambition",
      "DescriptionIndonesia": "Motivasi dan ambisi",
      "Number": 3,
      "Weight": 3
    },
    {
      "__type": "InterviewQuestionDetail:#BPlusTraining.Logic",
      "DescriptionEnglish": "Maturity and self confidence",
      "DescriptionIndonesia": "Kematangan pribadi dan kepercayaan diri",
      "Number": 4,
      "Weight": 4
    },
    {
      "__type": "InterviewQuestionDetail:#BPlusTraining.Logic",
      "DescriptionEnglish": "Ability to deliver an idea",
      "DescriptionIndonesia": "Kemampuan menyampaikan gagasan",
      "Number": 5,
      "Weight": 4
    },
    {
      "__type": "InterviewQuestionDetail:#BPlusTraining.Logic",
      "DescriptionEnglish": "Ability to communicate with others",
      "DescriptionIndonesia": "Kemampuan bergaul baik dengan orang lain",
      "Number": 6,
      "Weight": 3
    },
    {
      "__type": "InterviewQuestionDetail:#BPlusTraining.Logic",
      "DescriptionEnglish": "Attitude and manners",
      "DescriptionIndonesia": "Tatakrama dan sikap",
      "Number": 7,
      "Weight": 3
    },
    {
      "__type": "InterviewQuestionDetail:#BPlusTraining.Logic",
      "DescriptionEnglish": "Perseverance and self discipline",
      "DescriptionIndonesia": "Ketekunan dan kedisiplinan",
      "Number": 8,
      "Weight": 3
    }
  ],
  //#endregion

  //#region Announcement.svc
  GetMessage: [
    {
      "__type": "Message:#BPlusTraining.Logic",
      "FileId": "00000000-0000-0000-0000-000000000000",
      "FileName": "",
      "Generation": "20-2",
      "GenerationId": "51fb670e-2468-ea11-abcb-d8d385fcda38",
      "HasFile": false,
      "InsertBy": {
        "__type": "Binusian:#BPlusTraining.Logic",
        "Name": "NS17-1",
        "UserId": "0f6c96b3-6fe4-e611-9a56-d8d385fce79e"
      },
      "InsertOn": "/Date(1594697184702+0700)/",
      "MemberType": "ar",
      "MessageId": "11845d60-1c60-4578-ae9c-7ff4b99eb60e",
      "Note": "Trainee Book & Acquaintance Form\nhttp://tiny.cc/list-link-nar20-2\n<br><br>\nTraining Room\nhttps://binus.zoom.us/j/98468227452?pwd=Z2FiRTJ6MkNzUVFpNVRWUkZoSXM0Zz09",
      "Title": "List Link"
    }
  ],
  //#endregion
};

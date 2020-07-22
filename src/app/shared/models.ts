import { RoleFlags } from './constants/role.constant';
import { isNumber, map } from 'lodash';
import { DateHelper } from './utilities/date-helper';

export class Pair<T, U> {
	constructor(val1: T, val2: U) {
		this[0] = val1;
		this[1] = val2;
	}
}

export class Toast {
	constructor(
		public messageType: 'info' | 'warning' | 'success' | 'danger' = 'info',
		public message = ''
	) {}
}

export class BaseModel {}

export class Role {
	public static readonly allRoles = map(
		RoleFlags,
		(val: number, key) => new Role(key, val)
	);

	constructor(public roleName = '', public roleNumber = 0) {}

	static fromName(input: string | number): Role {
		// name/flag to Role
		return this.allRoles.find(
			(r) => r.roleName === input || r.roleNumber === input
		);
	}

	is(...roleFlags: number[] | Role[]): boolean {
		if (isNumber(roleFlags[0]))
			return roleFlags.some((num) => (num & this.roleNumber) !== 0);
		else
			return roleFlags.some(
				(role) => (role.roleNumber & this.roleNumber) !== 0
			);
	}
}

export class User extends BaseModel {
	public Role: Role = Role.fromName('Dummy');
	constructor(
		public UserId = '',
		public UserName = '',
		public Name = '',
		public ActiveRole = '',
		public TraineeId = ''
	) {
		super();
	}
	static fromJson(input: any): User {
		return Object.assign(new User(), input, {
			Role: Role.fromName(input.Role),
		});
	}
}
export class ClientGeneration extends BaseModel {
	constructor(
		public GenerationId = '',
		public Description = '',
		public Semester = '',
		public Year = 0
	) {
		super();
	}
	static fromJson(data: any): ClientGeneration {
		return Object.assign(new ClientGeneration(), data);
	}
}

export class ClientTraineeReputation extends BaseModel {
	constructor(
		public TraineeId = '',
		public TraineeName = '',
		public TraineeCode = '',
		public TraineeNumber = '',
		public Gender = 'Asex',
		public PictureId = '',
		public Minus = 0,
		public Neutral = 0,
		public Plus = 0,
		public IsActive = 0,
		public IsVeteran = 0,
		public Major = 'Com suki'
	) {
		super();
	}

	static fromJson(data: any): ClientTraineeReputation {
		return Object.assign(new ClientTraineeReputation(), data);
	}
}

export class ClientTraineeReputationPaging extends BaseModel {
	constructor(
		public CurrentPage = 0,
		public TotalActive = 0,
		public TotalInActive = 0,
		public TraineeCount = 0,
		public TraineeReputation: ClientTraineeReputation[] = []
	) {
		super();
	}
	static fromJson(data: any): ClientTraineeReputationPaging {
		return Object.assign(new ClientTraineeReputationPaging(), data, {
			TraineeReputation:
				data.TraineeReputation?.map(ClientTraineeReputation.fromJson) ?? [],
		});
	}
}

export class ClientPhase extends BaseModel {
	constructor(
		public BeginDate: Date = null,
		public EndDate: Date = null,
		public Description = '',
		public PhaseId = '',
		public PhaseType = ''
	) {
		super();
	}
	static fromJson(data: any): ClientPhase {
		return Object.assign(new ClientPhase(), data, {
			BeginDate: DateHelper.fromCSharpDate(data.BeginDate),
			EndDate: DateHelper.fromCSharpDate(data.EndDate),
		});
	}
}

export class ClientSchedule extends BaseModel {
	constructor(
		public CanSelfRegister = null,
		public Start: Date = null,
		public End: Date = null,
		public IsSpecific = false,
		public ScheduleId = '',
		public ScheduleName = '',
		public ScheduleDates: Date[] = []
	) {
		super();
	}
	static fromJson(data: any): ClientSchedule {
		return Object.assign(new ClientSchedule(), data, {
			Start: DateHelper.fromCSharpDate(data.Start),
			End: DateHelper.fromCSharpDate(data.End),
			ScheduleDates: map(data.ScheduleDates, DateHelper.fromCSharpDate),
		});
	}
}

export class ClientSubject extends BaseModel {
	constructor(
		public HasPresentation = false,
		public Name = '',
		public Phase: ClientPhase = null,
		public SubjectId = ''
	) {
		super();
	}
	static fromJson(data: any): ClientSubject {
		return Object.assign(new ClientSubject(), data, {
			Phase: ClientPhase.fromJson(data.Phase),
		});
	}
}

export class Binusian extends BaseModel {
	constructor(public Name = '', public UserId = '') {
		super();
	}
	static fromJson(data: any): Binusian {
		return Object.assign(new Binusian(), data);
	}
}

export class Case extends BaseModel {
	constructor(
		public CaseId = '',
		public CaseName = '',
		public Corrector: Binusian[] = [],
		public FileId = '',
		public FIleName = '',
		public ScheduleDate: Date = null,
		public ScheduleName = '',
		public TraineeDeadline: Date = null,
		public TrainerDeadline: Date = null
	) {
		super();
	}
	static fromJson(data: any): Case {
		return Object.assign(new Case(), data, {
			Corrector: map(data.Corrector, Binusian.fromJson),
			ScheduleDate: DateHelper.fromCSharpDate(data.ScheduleDate),
			TraineeDeadline: DateHelper.fromCSharpDate(data.TraineeDeadline),
			TrainerDeadline: DateHelper.fromCSharpDate(data.TrainerDeadline),
		});
	}
}

export class SubcoCandidateQuestionModel extends BaseModel {
	constructor(
		public GenerationId = '',
		public Id = '',
		public Questions: string[] = []
	) {
		super();
	}
	static fromJson(data: any): SubcoCandidateQuestionModel {
		return Object.assign(new SubcoCandidateQuestionModel(), data);
	}
}

export class SubcoCandidateAnswerModel extends BaseModel {
	constructor(
		public Id = '',
		public SubcoCandidateQuestionId = '',
		public TrainerName = '',
		public Answers: string[] = [],
		public StartDate: Date = null,
		public EndDate: Date = null
	) {
		super();
	}
	static fromJson(data: any): SubcoCandidateAnswerModel {
		return Object.assign(new SubcoCandidateAnswerModel(), data, {
			StartDate: DateHelper.fromCSharpDate(data.StartDate),
			EndDate: DateHelper.fromCSharpDate(data.EndDate),
		});
	}
}

export class ClientStatisticDetail extends BaseModel {
	constructor(public Count = 0, public Description = '') {
		super();
	}
	static fromJson(data: any): ClientStatisticDetail {
		return Object.assign(new ClientStatisticDetail(), data);
	}
}

export class ClientStatistic extends BaseModel {
	constructor(
		public Type = '',
		public Total = 0,
		public Detail: ClientStatisticDetail[] = []
	) {
		super();
	}

	static fromJson(data: any): ClientStatistic {
		return Object.assign(new ClientStatistic(), data, {
			Detail: data.Detail.map(ClientStatisticDetail.fromJson),
		});
	}
}

export class Message extends BaseModel {
	constructor(
		public FileId = '',
		public FileName = '',
		public Generation = '',
		public GenerationId = '',
		public HasFile = '',
		public InsertBy: Binusian = null,
		public InsertOn: Date = null,
		public MemberType = '',
		public MessageId = '',
		public Note = '',
		public Title = ''
	) {
		super();
	}
	static fromJson(data: any): Message {
		return Object.assign(new Message(), data, {
			InsertBy: Binusian.fromJson(data.InsertBy),
			InsertOn: DateHelper.fromCSharpDate(data.InsertOn),
		});
	}
}

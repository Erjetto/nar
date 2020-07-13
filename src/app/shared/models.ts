export class Pair<T, U> {
	constructor(val1: T, val2: U) {
		this[0] = val1;
		this[1] = val2;
	}
}

export class BaseModel {}

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
}

export class ClientSubject extends BaseModel {
	constructor(
		public HasPresentation = false,
		public Name = '',
		public Phase = null,
		public SubjectId = ''
	) {
		super();
	}
}

export class Binusian extends BaseModel {
	constructor(public Name = '', public UserId = '') {
		super();
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
}

import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
} from '@angular/core';
import { ClientGeneration } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { Observable } from 'rxjs';
import { Store, ActionsSubject, select } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { MasterStateAction, fromMasterState } from 'src/app/shared/store-modules';
import { DashboardContentBase } from '../../dashboard-content-base.component';
import { NgForm } from '@angular/forms';
import { LeaderService } from 'src/app/shared/services/new/leader.service';

@Component({
	selector: 'rd-manage-generation',
	templateUrl: './manage-generation.component.html',
	styleUrls: ['./manage-generation.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageGenerationComponent extends DashboardContentBase
	implements OnInit, OnDestroy {
	public generations: ClientGeneration[];

	public editForm: ClientGeneration;

	constructor(
		private leaderService: LeaderService,
		protected store: Store<IAppState>,
	) {
		super(store);
	}

	ngOnInit(): void {
		this.generations = MockData.GetGenerations.map(ClientGeneration.fromJson);
	}

	reloadView() {
		super.reloadView();
	}

	onSelectGeneration(gen) {
		this.editForm = gen;
	}

	createGen(form: NgForm) {
		const { genName, semesterRadio, lastYear } = form.controls;
		this.leaderService.SaveGeneration({
			generationName: genName.value,
			semester: semesterRadio.value,
			year: lastYear.value,
		});

  }

	editGen(form: NgForm) {
		const { genId, genName, semesterRadio, lastYear } = form.controls;
		this.leaderService.UpdateGeneration({
			GenerationId: genId.value,
			Description: genName.value,
			Semester: semesterRadio.value,
			Year: lastYear.value,
		});
	}

	onCancelEdit() {
		this.editForm = null;
	}
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { ClientTraineeData, ClientNote } from 'src/app/shared/models';
import { MockData } from 'src/app/shared/mock-data';
import { DashboardContentBase } from '../../dashboard-content-base.component';
// import { MockData } from 'src/app/shared/mock-data-old';

@Component({
  selector: 'rd-view-trainee-detail',
  templateUrl: './view-trainee-detail.component.html',
  styleUrls: ['./view-trainee-detail.component.scss']
})
export class ViewTraineeDetailComponent extends DashboardContentBase implements OnInit, OnDestroy {

  viewDateFormat = 'dd MMM yyyy, HH:mm:ss'

  traineeDetail: ClientTraineeData;

  constructor(protected store: Store<IAppState>,) {
    super(store);
    this.traineeDetail = ClientTraineeData.fromJson(MockData.GetTraineeDataForTrainer);
  }

  ngOnInit(): void {
  }

  deleteNote(note: ClientNote){
    console.log(note);
    
  }

}

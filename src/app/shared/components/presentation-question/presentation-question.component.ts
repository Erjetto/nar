import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { CoreTrainingPresentationQuestion, CoreTrainingPresentation, ClientGeneration } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'rd-presentation-question',
  templateUrl: './presentation-question.component.html',
  styleUrls: ['./presentation-question.component.scss']
})
export class PresentationQuestionComponent implements OnInit {
  @HostBinding('class') hostClass;

  @Input() presentation: CoreTrainingPresentation;
  @Input() question: CoreTrainingPresentationQuestion;
  @Input() currentGenId: string;
  

  ngOnInit(): void {
    this.hostClass = 'row question-item question-' + this.question.Status;
  }

}

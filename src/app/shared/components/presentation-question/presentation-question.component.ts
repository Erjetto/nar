import { Component, OnInit, Input } from '@angular/core';
import { CoreTrainingPresentationQuestion, CoreTrainingPresentation } from '../../models';

@Component({
  selector: 'rd-presentation-question',
  templateUrl: './presentation-question.component.html',
  styleUrls: ['./presentation-question.component.scss']
})
export class PresentationQuestionComponent implements OnInit {

  @Input() presentation: CoreTrainingPresentation;
  @Input() question: CoreTrainingPresentationQuestion;

  constructor() { }


  ngOnInit(): void {
    
  }

}

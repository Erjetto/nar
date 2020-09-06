import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import {
	FontAwesomeModule,
	FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { farIcons, fasIcons } from './icons';
import { ClockComponent } from './components/clock/clock.component';
import { CardComponent } from './components/card/card.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilterByInputComponent } from './components/filter-by-input/filter-by-input.component';

import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { ConfirmableButtonComponent } from './components/confirmable-button/confirmable-button.component';
import { ContrastTextColorDirective } from './directives/contrast-text-color.directive';
import { EasyHorizontalSrollDirective } from './directives/easy-horizontal-sroll.directive';
import { PresentationQuestionComponent } from './components/presentation-question/presentation-question.component';
import { VarDirective } from './directives/var.directive';

const SHARED_DECLARATIONS = [
	// Shared components, pipes, and directives, ex: SearchComponent, CurrencyPipe
	ClockComponent,
	CardComponent,
  ToasterComponent,
  ModalComponent, 
  ConfirmableButtonComponent,
  PresentationQuestionComponent,
  FilterByInputComponent,
  
  ClickStopPropagationDirective,
  ContrastTextColorDirective,
  EasyHorizontalSrollDirective,
  VarDirective,
];

@NgModule({
	declarations: [...SHARED_DECLARATIONS,   ],
	imports: [
		FontAwesomeModule,
		CommonModule,
    FormsModule,
    ReactiveFormsModule,
		HttpClientModule,
    RouterModule,
    NgSelectModule,
		NgbModule,
	],
	exports: [
		FontAwesomeModule,
		CommonModule,
		FormsModule,
    ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
    NgSelectModule,
		NgbModule,
		...SHARED_DECLARATIONS,
	],
})
export class SharedModule {
	constructor(library: FaIconLibrary) {
		library.addIcons(...farIcons, ...fasIcons);
	}
}

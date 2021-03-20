import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { farIcons, fasIcons } from './icons';
import { ClockComponent } from './components/clock/clock.component';
import { CardComponent } from './components/card/card.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilterByInputComponent } from './components/filter-by-input/filter-by-input.component';

import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { ConfirmablePopUpComponent } from './components/confirmable-pop-up/confirmable-pop-up.component';
import { ContrastTextColorDirective } from './directives/contrast-text-color.directive';
import { EasyHorizontalSrollDirective } from './directives/easy-horizontal-sroll.directive';
import { PresentationQuestionComponent } from './components/presentation-question/presentation-question.component';
import { VarDirective } from './directives/var.directive';
import { UploadInputComponent } from './components/upload-input/upload-input.component';
import { TraineeDetailOnHoverComponent } from './components/trainee-detail-on-hover/trainee-detail-on-hover.component';
import { ExternalUrlDirective } from './directives/external-url.directive';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableModule } from './components/data-table/data-table.module';
import { NotificationComponent } from './components/notification/notification.component';

const quillModuleSettings = {
	modules: {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'], // toggled buttons
			['code-block'],

			[{ script: 'sub' }, { script: 'super' }], // superscript/subscript

			[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

			['clean'], // remove formatting button

			['link', 'image', 'video'],
		],
	},
};

const SHARED_DECLARATIONS = [
	// Shared components, pipes, and directives, ex: SearchComponent,
	ClockComponent,
	CardComponent,
	ToasterComponent,
	ModalComponent,
	ConfirmablePopUpComponent,
	PresentationQuestionComponent,
	FilterByInputComponent, // Not used yet
	UploadInputComponent,
	TraineeDetailOnHoverComponent,
	NotificationComponent,

	ClickStopPropagationDirective,
	ContrastTextColorDirective, // Not used yet
	EasyHorizontalSrollDirective, // Not used yet
	VarDirective, // Not used yet
	ExternalUrlDirective,
];

@NgModule({
	imports: [
		FontAwesomeModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		NgSelectModule,
		NgbModule,
		QuillModule.forRoot(quillModuleSettings),
		DataTableModule,
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
		QuillModule,
		DataTableModule,
		...SHARED_DECLARATIONS,
	],
	declarations: [...SHARED_DECLARATIONS],
})
export class SharedModule {
	constructor(library: FaIconLibrary) {
		library.addIcons(...farIcons, ...fasIcons);
	}
}

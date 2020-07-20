import { NgModule } from '@angular/core';

import {
	FontAwesomeModule,
	FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { farIcons, fasIcons } from './icons';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ClockComponent } from './components/clock/clock.component';
import { CardComponent } from './components/card/card.component';

const SHARED_DECLARATIONS = [
	// Shared components, pipes, and directives, ex: SearchComponent, CurrencyPipe
  ClockComponent,
  CardComponent,
];

@NgModule({
	declarations: [...SHARED_DECLARATIONS],
	imports: [
		FontAwesomeModule,
		CommonModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
	],
	exports: [
		HttpClientModule,
		RouterModule,
		FontAwesomeModule,
		CommonModule,
		FormsModule,
		...SHARED_DECLARATIONS,
	],
})
export class SharedModule {
	constructor(library: FaIconLibrary) {
		library.addIcons(...farIcons, ...fasIcons);
	}
}

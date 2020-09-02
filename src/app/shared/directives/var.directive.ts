import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
	selector: '[rdVar]',
})
export class VarDirective {
	@Input()
	set rdVar(context: any) {
		this.context.$implicit = this.context.ngVar = context;
		this.updateView();
	}

	context: any = {};

	constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}

	updateView() {
		this.vcRef.clear();
		this.vcRef.createEmbeddedView(this.templateRef, this.context);
	}
}

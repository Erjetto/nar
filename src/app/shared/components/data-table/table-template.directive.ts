import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rdTableTemplate]',
})
export class TableTemplateDirective {
  @Input('rdTableTemplate') name: 'body' | 'header';

  constructor(public template: TemplateRef<any>) {}
  
}

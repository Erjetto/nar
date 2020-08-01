import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[rdClickStopPropagation]'
})
export class ClickStopPropagationDirective {

  @HostListener('click', ['$event'])
  public onClick($event: Event){
    $event.stopPropagation();
  }

  constructor() { }

}

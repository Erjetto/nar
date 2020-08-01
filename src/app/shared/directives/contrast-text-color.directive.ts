import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { ColorHelper } from '../utilities/color-helper';

@Directive({
	selector: '[rdContrastTextColor]',
})
export class ContrastTextColorDirective implements AfterViewInit{

  // Requirement: the element must have the background-color element
  // Not working on inherited css color
	constructor(private el: ElementRef, private renderer: Renderer2) {
		
  }
  
  ngAfterViewInit(): void {
    // let bgColor = this.el.nativeElement.style.backgroundColor;
    let bgColor = getComputedStyle(this.el.nativeElement).backgroundColor;
    // console.log(bgColor);
    if(bgColor === '') {
      bgColor = '#ffffff'
      console.log('Getting no bgColor, default to white');
    }
    
    if(ColorHelper.isHexContrastToWhite(bgColor))
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white')
      // this.el.nativeElement.style.color = 'white'
      else 
      this.renderer.setStyle(this.el.nativeElement, 'color', 'black')
      // this.el.nativeElement.style.color = 'black'
  }
}

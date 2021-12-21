import { Directive, ElementRef, OnInit } from '@angular/core';
import { CoreAnimationDirective } from './core-animation.directive';

@Directive({
  selector: '[SlideAnimation]'
})
export class SlideDirective extends CoreAnimationDirective implements OnInit {

  constructor(protected override  element:ElementRef) { 
    super(element);
  }

  ngOnInit() {
    this.animateIn();
  }

  protected override animateIn() {
    this.timeline.from(this.element.nativeElement,this.duration,{opacity:'0', x:-600,ease:"power.inOut"}, this.delay);
    super.animateIn();
  }

}

import { Directive, ElementRef, OnInit } from '@angular/core';
import { CoreAnimationDirective } from './core-animation.directive';

@Directive({
  selector: '[fadeInAnimation]'
})
export class FadeInDirective extends CoreAnimationDirective implements OnInit {

  constructor(protected override  element:ElementRef) { 
    super(element);
  }

  ngOnInit() {
    this.animateIn();
  }

  protected override animateIn() {
    this.timeline.from(this.element.nativeElement,this.duration,{opacity:'0', ease:"Expo.easeIn"}, this.delay);
    super.animateIn();
  }

}

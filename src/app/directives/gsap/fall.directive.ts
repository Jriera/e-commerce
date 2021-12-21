import { Directive, ElementRef, OnInit } from '@angular/core';
import { CoreAnimationDirective } from './core-animation.directive';

@Directive({
  selector: '[FallAnimation]'
})
export class FallDirective extends CoreAnimationDirective implements OnInit {

  constructor(protected override  element:ElementRef) { 
    super(element);
  }

  ngOnInit() {
    this.animateIn();
  }

  protected override animateIn() {
    this.timeline.from(this.element.nativeElement,this.duration,{opacity:'0', y:-600,ease:"back.inOut(1)"}, this.delay);
    super.animateIn();
  }

}

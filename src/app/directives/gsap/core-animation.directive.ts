import { Directive,ElementRef,Input,Output,EventEmitter } from '@angular/core';
import {TimelineMax,gsap} from 'gsap';

@Directive({ //This directive is used to create a GSAP basic bolerplate
  selector: '[CoreAnimation]'
})
export class CoreAnimationDirective {
  @Input() duration:number = 1; //duration of the animation in seconds
  @Input() delay:number = 0; //delay of the animation in seconds

  @Output() complete:EventEmitter<any> = new EventEmitter(); //EventEmitter to emit when the animation ends
  @Output() reverseComplete:EventEmitter<any> = new EventEmitter(); //EventEmitter to emit when the reverse animation ends
  
  constructor(protected element:ElementRef) { }
  //elemet is the element that the directive is attached to in the DOM
  timeline:GSAPTimeline = gsap.timeline({ //GSAPTimeline is a GSAP class that is used to create a timeline
    onComplete:_ => this.complete.emit(), //will emit when animation completes
    onReverseComplete:_ => this.reverseComplete.emit(), //will emit when reverse animation completes
    paused:true, //will start paused
    reversed:false //will start in normal direction
  });

  protected animateIn() { //method to start the animation or stop it if it is already running
    if(this.timeline.isActive()) {
      this.timeline.kill();
    }
    this.timeline.play();
  }

}

import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  st: globalThis.ScrollTrigger | null = null;

  constructor() {}

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.scrollAnims();
    this.st?.enable();
    
  }

  ngAfterViewChecked() {
    ScrollTrigger.refresh(); // since we're using ScrollTrigger, we need to refresh it due to the way angular handles routing without page refresh
  }

  scrollAnims() {
    gsap.fromTo(
      //animation for ring highlight
      '.highlight-narrow',
      {
        scrollTrigger: '.highlight-narrow',
        x: '-1000',
        opacity: 0,
        duration: 1.5,
      },
      {
        scrollTrigger: '.highlight-narrow',
        x: '0',
        opacity: 1,
        duration: 1.5,
      }
    );

    gsap.fromTo(
      //animation for hard drive highlight
      '.HD',
      {
        scrollTrigger: {
          trigger: '.HD',
        },
        y: '200',
        opacity: 0.7,
        duration: 1.5,
      },
      {
        scrollTrigger: {
          trigger: '.HD',
        },
        y: '0',
        opacity: 1,
        duration: 1.5,
      }
    );

    gsap.fromTo(
      //animation for backpack highlight
      '.image-pill',
      {
        scrollTrigger: {
          trigger: '.image-pill',
        },
        rotateY: '-90deg',
        duration: 1.2,
      },
      {
        scrollTrigger: {
          trigger: '.image-pill',
        },
        rotateY: '0deg',
        duration: 1.2,
      }
    );

    gsap.fromTo(
      // animation for department sections
      '.container',
      {
        scrollTrigger: {
          trigger: 'app-department',
        },
        rotateY: '-90deg',
        duration: 1,
        stagger: 0.2,
      },
      {
        scrollTrigger: {
          trigger: 'app-department',
        },
        rotateY: '0deg',
        duration: 1,
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      // animation for department sections
      '.shopping-image',
      {
        scrollTrigger: {
          trigger: '.info-trigger',
        },
        rotateY: '-90deg',
        duration: 2,
        stagger: 0.2,
      },
      {
        scrollTrigger: {
          trigger: '.info-trigger',
        },
        rotateY: '0deg',
        duration: 2,
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      // animation for department sections
      '.info-title',
      {
        scrollTrigger: {
          trigger: '.info-trigger',
        },
        x: '-500',
        opacity: 0,
        duration: 2,
        stagger: 0.2,
      },
      {
        scrollTrigger: {
          trigger: '.info-trigger',
        },
        x: '0',
        duration: 2,
        opacity: 1,
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      // animation for department sections
      '.info-description',
      {
        scrollTrigger: {
          trigger: '.info-trigger',
        },
        
        opacity: 0,
        duration: 2,
        delay:2
        
      },
      {
        scrollTrigger: {
          trigger: '.info-trigger',
        },
        
        duration: 2,
        opacity: 1,
        delay:2
        
      }
    );

    
  }

  ngOnDestroy() {}
}

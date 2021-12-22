import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  bounce(id: string) {
    gsap.fromTo(
      `#${id}`,
      { duration: 1.3, scaleX: 1.2, scaleY: 0.6, ease: 'elastic' },
      { duration: 1.3, scaleX: 1, scaleY: 1, ease: 'elastic' }
    );
  }
}
